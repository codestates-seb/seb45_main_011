package com.growstory.domain.comment.dto;

import com.growstory.domain.account.entity.Account;
import com.growstory.domain.board.entity.Board;
import com.growstory.domain.comment.entity.Comment;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;

public class CommentDto {

    @Getter
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    public static class Post {
        @NotBlank
        private String content;

        public Comment toEntity(Account account, Board board) {
            return Comment.builder()
                    .content(content)
                    .account(account)
                    .board(board)
                    .build();
        }
    }

    @Getter
    public static class Patch {
        @NotBlank
        private String content;
    }
}
