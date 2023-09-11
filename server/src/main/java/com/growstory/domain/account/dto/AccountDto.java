package com.growstory.domain.account.dto;

import com.growstory.domain.board.entity.Board;
import com.growstory.domain.comment.entity.Comment;
import com.growstory.domain.likes.entity.AccountLike;
import com.growstory.domain.point.entity.Point;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import java.util.List;

public class AccountDto {
    @Getter
    @Builder
    public static class Post {
        @NotBlank
        private String displayName;

        @NotBlank
        @Email
        private String email;

        @NotBlank
        @Pattern(regexp = "^(?=.*[a-zA-Z])(?=.*\\d).{6,}$" , message = "영문, 숫자 포함 6글자 이상의 패스워드만 허용합니다.")
        private String password;
    }

    @Getter
    public static class DisplayNamePatch {
        @NotBlank
        private String displayName;
    }

    @Getter
    @Builder
    public static class PasswordPatch {
        @NotBlank
        @Pattern(regexp = "^(?=.*[a-zA-Z])(?=.*\\d).{6,}$" , message = "영문, 숫자 포함 6글자 이상의 패스워드만 허용합니다.")
        private String presentPassword;

        @NotBlank
        @Pattern(regexp = "^(?=.*[a-zA-Z])(?=.*\\d).{6,}$" , message = "영문, 숫자 포함 6글자 이상의 패스워드만 허용합니다.")
        private String changedPassword;
    }

    @Getter
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class PasswordVerify {
        @NotBlank
        @Pattern(regexp = "^(?=.*[a-zA-Z])(?=.*\\d).{6,}$" , message = "영문, 숫자 포함 6글자 이상의 패스워드만 허용합니다.")
        private String password;
    }

    @Getter
    @Builder
    public static class Response {
        private Long accountId;
        private String email;
        private String displayName;
        private String profileImageUrl;
        private Point point;
        private List<BoardResponse> boardWritten; // 자신이 쓴 게시글
        private List<BoardResponse> boardLiked; // 좋아요 누른 게시글
        private List<BoardResponse> commentWritten; // 댓글을 쓴 게시글

        public int getPoint() {
            return point.getScore();
        }
    }

    @Getter
    @Builder
    public static class BoardResponse {
        private Long boardId;
        private String title;
        private List<String> imageUrls;
        private List<Long> likes; // 게시글을 좋아요 누른 계정 id
        private int commentNums;

        @Override
        public int hashCode() {
            return boardId.hashCode();
        }

        @Override
        public boolean equals(Object boardResponse) {
            return boardId.equals(((AccountDto.BoardResponse) boardResponse).getBoardId());
        }
    }
}
