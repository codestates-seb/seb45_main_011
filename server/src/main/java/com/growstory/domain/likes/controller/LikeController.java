package com.growstory.domain.likes.controller;

import com.growstory.domain.likes.service.LikeService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.constraints.Positive;

@RestController
@Validated
@RequiredArgsConstructor
@RequestMapping("/v1/likes")
public class LikeController {
    private final LikeService likeService;

    @Operation(summary = "게시글 좋아요", description = "입력받은 게시글에 로그인된 사용자가 좋아요/취소")
    @PostMapping("/boards/{board-id}") // 좋아요를 받을 게시글
    public ResponseEntity<HttpStatus> postBoardLike(@PathVariable("board-id") @Positive Long boardId) {
        likeService.pressBoardLike(boardId);

        return ResponseEntity.noContent().build();
    }

    @Operation(summary = "댓글 좋아요", description = "입력받은 댓글에 로그인된 사용자가 좋아요/취소")
    @PostMapping("/comments/{comment-id}") // 좋아요를 받을 댓글
    public ResponseEntity<HttpStatus> postCommentLike(@PathVariable("comment-id") @Positive Long commentId) {
        likeService.pressCommentLike(commentId);

        return ResponseEntity.noContent().build();
    }

    @Operation(summary = "정원(계정) 좋아요", description = "입력받은 계정의 정원에 로그인된 사용자가 좋아요/취소")
    @PostMapping("/gardens/{account-id}") // 좋아요를 받을 계정
    public ResponseEntity<HttpStatus> postAccountLike(@PathVariable("account-id") @Positive Long ownerAccountId) {
        likeService.pressAccountLike(ownerAccountId);

        return ResponseEntity.noContent().build();
    }
}
