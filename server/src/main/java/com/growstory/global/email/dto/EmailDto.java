package com.growstory.global.email.dto;


import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

public class EmailDto {
    @Getter
    @Schema(name = "EmailPostDto")
    public static class Post {
        @NotBlank
        @Email
        private String email;
    }

    @Getter
    @Builder
    public static class SignUpResponse {
        private Boolean isDuplicated;
        private String authCode;
    }

    @Getter
    @Builder(toBuilder = true)
    public static class PasswordResponse {
        private Boolean isMatched;
        private Boolean isSocial;
    }
}
