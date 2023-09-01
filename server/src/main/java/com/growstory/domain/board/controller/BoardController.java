package com.growstory.domain.board.controller;

import com.growstory.domain.board.dto.RequestBoardDto;
import com.growstory.domain.board.dto.ResponseBoardDto;
import com.growstory.domain.board.service.BoardService;
import com.growstory.global.util.UriCreator;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.util.UriComponentsBuilder;

import javax.validation.Valid;
import javax.validation.constraints.Min;
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
    public ResponseEntity<HttpStatus> postBoard(@Min(1) @PathVariable("leafId") Long leafId,
                                                @Valid @RequestBody RequestBoardDto.Post requestBoardDto,
                                                @RequestPart(value = "image", required = false) MultipartFile image) {
        Object principal = null;

        ResponseBoardDto responseBoardDto = boardService.createBoard(leafId, requestBoardDto, principal, image);

        URI location = UriCreator.createUri(BOARD_DEFAULT_URL, responseBoardDto.getBoardId(), ANOTHERRESOURCENAME, leafId);

        return ResponseEntity.created(location).build();
    }
}
