package com.growstory.domain.board.controller;

import com.growstory.domain.board.dto.RequestBoardDto;
import com.growstory.domain.board.dto.ResponseBoardDto;
import com.growstory.domain.board.dto.ResponseBoardPageDto;
import com.growstory.domain.board.service.BoardService;
import com.growstory.domain.rank.board_likes.dto.BoardLikesRankDto;
import com.growstory.domain.rank.board_likes.service.BoardLikesRankService;
import com.growstory.global.constants.HttpStatusCode;
import com.growstory.global.response.MultiResponseDto2;
import com.growstory.global.response.SingleResponseDto;
import com.growstory.global.utils.UriCreator;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.net.URI;
import java.util.List;

@Tag(name = "Boards API", description = "게시판 API")
@Validated
@RequiredArgsConstructor
@RequestMapping("/v1/boards")
@RestController
public class BoardController {

    private final BoardService boardService;
    private final BoardLikesRankService boardLikesRankService;
    private final static String BOARD_DEFAULT_URL = "/v1/boards";


    @Operation(summary = "Create Board API", description = "게시판 추가 기능")
    @PostMapping(consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<HttpStatus> postBoard(
            @Valid @RequestPart RequestBoardDto.Post requestBoardDto,
            @RequestPart(value = "image", required = false) MultipartFile image) {
        Long boardId = boardService.createBoard(requestBoardDto, image);

        // location(response header): https://{host}:8888/v1/boards/{boardId}
        URI location = UriCreator.createUri(BOARD_DEFAULT_URL, boardId);

        return ResponseEntity.created(location).build();
    }

    @Operation(summary = "Get Board API", description = "게시판 상세 조회 기능")
    @GetMapping("/{boardId}")
    public ResponseEntity<SingleResponseDto<ResponseBoardDto>> getBoard(@Positive @PathVariable("boardId") Long boardId) {
        ResponseBoardDto responseBoardDto = boardService.getBoard(boardId);

        return ResponseEntity.ok(SingleResponseDto.<ResponseBoardDto>builder()
                .status(HttpStatusCode.OK.getStatusCode())
                .message(HttpStatusCode.OK.getMessage())
                .data(responseBoardDto).build());
    }


    @Operation(summary = "Get Boards API", description = "전체 게시판 조회 기능")
    @GetMapping
    public ResponseEntity<MultiResponseDto2<ResponseBoardPageDto, BoardLikesRankDto.Response>> getBoards(@Positive @RequestParam(defaultValue = "1") int page,
                                                                            @Positive @RequestParam(defaultValue = "12") int size) {
        Page<ResponseBoardPageDto> responseBoardDtos = boardService.findBoards(page - 1, size);
        List<BoardLikesRankDto.Response> responseBoardRankList = boardLikesRankService.findCurrentBoardLikesRanks();


        return ResponseEntity.ok(MultiResponseDto2.<ResponseBoardPageDto, BoardLikesRankDto.Response>builder()
                .status(HttpStatusCode.OK.getStatusCode())
                .message(HttpStatusCode.OK.getMessage())
                .data(responseBoardDtos.getContent())
                .data2(responseBoardRankList)
                .page(responseBoardDtos).build());
    }

    @Operation(summary = "Get Boards by keyword API", description = "키워드를 기준으로 전체 게시판 조회")
    @GetMapping("/keyword")
    public ResponseEntity<MultiResponseDto2<ResponseBoardPageDto, BoardLikesRankDto.Response>> getBoardsByKeyword(@Positive @RequestParam(defaultValue = "1") int page,
                                                                   @Positive @RequestParam(defaultValue = "12") int size,
                                                                   @RequestParam("keyword") String keyword) {
        Page<ResponseBoardPageDto> responseBoardDtos = boardService.findBoardsByKeyword(page - 1, size, keyword);
        List<BoardLikesRankDto.Response> responseBoardRankList = boardLikesRankService.findCurrentBoardLikesRanks();

        return ResponseEntity.ok(MultiResponseDto2.<ResponseBoardPageDto, BoardLikesRankDto.Response>builder()
                .status(HttpStatusCode.OK.getStatusCode())
                .message(HttpStatusCode.OK.getMessage())
                .data(responseBoardDtos.getContent())
                .data2(responseBoardRankList)
                .page(responseBoardDtos).build());
    }

    //TODO: 게시글 작성자 이름으로 검색하는 기능


    @Operation(summary = "Update Board API", description = "게시판 수정 기능")
    @PatchMapping(value = "/{boardId}", consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<HttpStatus> patchBoard(@Positive @PathVariable("boardId") Long boardId,
                                                 @Valid @RequestPart RequestBoardDto.Patch requestBoardDto,
                                                 @RequestPart(value = "image", required = false) MultipartFile image) {

        boardService.modifyBoard(boardId, requestBoardDto, image);

        return ResponseEntity.noContent().build();
    }


    @Operation(summary = "Delete Board API", description = "게시판 삭제 기능")
    @DeleteMapping("/{boardId}")
    public ResponseEntity<HttpStatus> deleteBoard(@Positive @PathVariable("boardId") Long boardId) {
        boardService.removeBoard(boardId);

        return ResponseEntity.noContent().build();
    }

    @GetMapping("/top-likes")
    public ResponseEntity<SingleResponseDto> getTop3LikedBoardsOfWeek() {
        List<BoardLikesRankDto.Response> response = boardService.findTop3LikedBoards();

        return ResponseEntity.ok(SingleResponseDto.builder()
                        .status(HttpStatusCode.OK.getStatusCode())
                        .message(HttpStatusCode.OK.getMessage())
                        .data(response)
                        .build());
    }
}
