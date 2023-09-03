package com.growstory.domain.board.controller;

import com.growstory.domain.board.dto.RequestBoardDto;
import com.growstory.domain.board.dto.ResponseBoardDto;
import com.growstory.domain.board.service.BoardService;
import com.growstory.global.constants.HttpStatusCode;
import com.growstory.global.response.MultiResponseDto;
import com.growstory.global.util.UriCreator;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.net.URI;

@RestController
@Validated
@RequestMapping("/v1/boards")
@RequiredArgsConstructor
public class BoardController {

    private final BoardService boardService;
    private final static String BOARD_DEFAULT_URL = "/v1/boards";
    private final static String ANOTHERRESOURCENAME = "/leaf";


    @Operation(summary = "Create Board API", description = "게시판 추가 기능")
    @PostMapping("/leaf/{leafId}")
    public ResponseEntity<HttpStatus> postBoard(@Positive @PathVariable("leafId") Long leafId,
                                                @Valid @RequestBody RequestBoardDto.Post requestBoardDto,
                                                @RequestPart(value = "image", required = false) MultipartFile image) {
        Object principal = null;

        ResponseBoardDto responseBoardDto = boardService.createBoard(leafId, requestBoardDto, principal, image);

        URI location = UriCreator.createUri(BOARD_DEFAULT_URL, responseBoardDto.getBoardId(), ANOTHERRESOURCENAME, leafId);

        return ResponseEntity.created(location).build();
    }


    @Operation(summary = "Get Boards API", description = "전체 게시판 조회 기능")
    @GetMapping
    public ResponseEntity<MultiResponseDto<ResponseBoardDto>> getBoards(@Positive @RequestParam(defaultValue = "1") int page,
                                                                        @Positive @RequestParam(defaultValue = "10") int size) {
        Page<ResponseBoardDto> pageResponseBoardDtos = boardService.findBoards(page - 1, size);

        return ResponseEntity.ok(MultiResponseDto
                .<ResponseBoardDto>builder()
                .status(HttpStatusCode.OK.getStatusCode())
                .message(HttpStatusCode.OK.getMessage())
                .data(pageResponseBoardDtos.getContent()).page(pageResponseBoardDtos).build());
    }


    @Operation(summary = "Update Board API", description = "게시판 수정 기능")
    @PatchMapping("/{boardId}")
    public ResponseEntity<HttpStatus> patchBoard(@Positive @PathVariable("boardId") Long boardId,
                                                 @Valid @RequestBody RequestBoardDto.Patch requestBoardDto,
                                                 @RequestPart(value = "image", required = false) MultipartFile image) {
        Object principal = null;

        boardService.modifyBoard(boardId, requestBoardDto, principal,image);

        return ResponseEntity.noContent().build();
    }


    @Operation(summary = "Delete Board API", description = "게시판 삭제 기능")
    @DeleteMapping("/{boardId}")
    public ResponseEntity<HttpStatus> deleteBoard(@Positive @PathVariable("boardId") Long boardId) {
        boardService.removeBoard(boardId);

        return ResponseEntity.noContent().build();
    }


}
