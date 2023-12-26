package com.growstory.domain.comment.controller;


import com.growstory.domain.comment.dto.CommentDto;
import com.growstory.domain.comment.service.CommentService;
import com.growstory.global.utils.UriCreator;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.net.URI;

@Tag(name = "Comments API", description = "댓글 기능")
@Validated
@RequiredArgsConstructor
@RequestMapping("/v1/comments")
@RestController
public class CommentController {

    private final static String COMMENT_DEFAULT_URL = "/v1/comments";

    private final CommentService commentService;


    @Operation(summary = "Create Comment API", description = "댓글 작성 기능")
    @PostMapping("/boards/{boardId}")
    public ResponseEntity<?> postComment(@Positive @PathVariable("boardId") Long boardId,
                                         @Valid @RequestBody CommentDto.Post commentDto) {
        Long commentId = commentService.saveComment(boardId, commentDto);

        // Location(response header): https://{host}/v1/comments/boards/{boardId}
        URI location = UriCreator.createUri(COMMENT_DEFAULT_URL,commentId);

        return ResponseEntity.created(location).build();
    }

    @Operation(summary = "Modify Comment API", description = "댓글 수정 기능")
    @PatchMapping("/{commentId}")
    public ResponseEntity<?> patchComment(@Positive @PathVariable("commentId") Long commentId,
                                          @RequestBody CommentDto.Patch commentDto) {
        commentService.updateComment(commentId, commentDto);

        return ResponseEntity.noContent().build();
    }

    @Operation(summary = "Delete Comment API", description = "댓글 삭제 기능")
    @DeleteMapping("/{commentId}")
    public ResponseEntity<?> deleteComment(@Positive @PathVariable("commentId") Long commentId) {
        commentService.deleteComment(commentId);

        return ResponseEntity.noContent().build();
    }

}


