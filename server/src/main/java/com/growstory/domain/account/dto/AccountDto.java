package com.growstory.domain.account.dto;

import com.growstory.domain.board.entity.Board;
import com.growstory.domain.comment.entity.Comment;
import com.growstory.domain.point.entity.Point;
import lombok.Builder;
import lombok.Getter;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import java.util.List;

public class AccountDto {
    @Getter
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
    public static class Response {
        private Long accountId;
        private String email;
        private String displayName;
        private String profileImageUrl;
        private Point point;
        private List<Board> boardWritten;
        private List<Board> boardLiked;
        private List<Comment> commentWritten;

        public int getPoint() {
            return point.getScore();
        }
    }
}
