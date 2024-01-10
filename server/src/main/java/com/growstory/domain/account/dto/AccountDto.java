package com.growstory.domain.account.dto;

import com.growstory.domain.point.entity.Point;
import com.growstory.global.badwordsfilter.dto.TextContainer;
import io.swagger.v3.oas.annotations.media.Schema;
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
    @Schema(name = "AccountPostDto")
    public static class Post implements TextContainer {
        @NotBlank(message = "닉네임은 필수입니다.")
        private String displayName;

        @NotBlank(message = "이메일은 필수입니다.")
        @Email(message = "이메일 형식으로 입력되어야 합니다.")
        private String email;

        @NotBlank(message = "비밀번호는 필수입니다.")
        @Pattern(regexp = "^(?=.*[a-zA-Z])(?=.*\\d).{6,}$" , message = "영문, 숫자 포함 6글자 이상의 패스워드만 허용합니다.")
        private String password;

        @Override
        public String combineText() {
            return displayName;
        }
    }


    @Getter
    @NoArgsConstructor
    public static class DisplayNamePatch implements TextContainer {
        @NotBlank(message = "닉네임은 필수입니다.")
        private String displayName;

        @Builder
        public DisplayNamePatch(String displayName) {
            this.displayName = displayName;
        }

        @Override
        public String combineText() {
            return this.displayName;
        }
    }

    @Getter
    @Builder
    public static class PasswordPatch {
        @NotBlank(message = "현재 비밀번호는 필수입니다.")
        @Pattern(regexp = "^(?=.*[a-zA-Z])(?=.*\\d).{6,}$" , message = "영문, 숫자 포함 6글자 이상의 패스워드만 허용합니다.")
        private String presentPassword;

        @NotBlank(message = "변경할 비밀번호는 필수입니다.")
        @Pattern(regexp = "^(?=.*[a-zA-Z])(?=.*\\d).{6,}$" , message = "영문, 숫자 포함 6글자 이상의 패스워드만 허용합니다.")
        private String changedPassword;
    }

    @Getter
    @Builder(toBuilder = true)
    @NoArgsConstructor
    @AllArgsConstructor
    public static class PasswordVerify {
        @NotBlank(message = "비밀번호는 필수입니다.")
        @Pattern(regexp = "^(?=.*[a-zA-Z])(?=.*\\d).{6,}$" , message = "영문, 숫자 포함 6글자 이상의 패스워드만 허용합니다.")
        private String password;
    }

    @Getter
    @Builder
    @Schema(name = "AccountResponseDto")
    public static class Response {
        private Long accountId;
        private String email;
        private String displayName;
        private String status;
        private String profileImageUrl;
        private String grade;
        private Point point;

        public int getPoint() {
            return point.getScore();
        }
    }

    @Getter
    @Builder
    @Schema(name = "AccountBoardResponseDto")
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
