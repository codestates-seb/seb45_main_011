package com.growstory.domain.comment.dto;

import com.growstory.domain.account.entity.Account;
import com.growstory.domain.board.entity.Board;
import com.growstory.domain.comment.entity.Comment;
import com.growstory.global.badwordsfilter.dto.TextContainer;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;

public class CommentDto {

    @Getter
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    public static class Post implements TextContainer {

        @NotBlank
        private String content;

        public Comment toEntity(Account account, Board board) {
            return Comment.builder()
                    .content(content)
                    .account(account)
                    .board(board)
                    .build();
        }

        public Post(String content) {
            this.content = content;
        }

        @Override
        public String combineText() {
            return content;
        }
    }

    @Getter
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    public static class Patch implements TextContainer {
        @NotBlank
        private String content;

        public Patch(String content) {
            this.content = content;
        }

        @Override
        public String combineText() {
            return content;
        }
    }


    @Getter
    public static class Response {
        private Long commentId;
        private Long accountId;
        private String profileUrl;
        private String comment;
        private LocalDateTime createdAt;
        private LocalDateTime modifiedAt;

        @Builder
        public Response(Long commentId, Long accountId, String profileUrl, String comment, LocalDateTime createdAt, LocalDateTime modifiedAt) {
            this.commentId = commentId;
            this.accountId = accountId;
            this.profileUrl = profileUrl;
            this.comment = comment;
            this.createdAt = createdAt;
            this.modifiedAt = modifiedAt;
        }
    }
}
