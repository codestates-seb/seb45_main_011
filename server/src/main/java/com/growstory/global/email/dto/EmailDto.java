package com.growstory.global.email.dto;


import lombok.Builder;
import lombok.Getter;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

public class EmailDto {
    @Getter
    public static class Post {
        @NotBlank
        @Email
        private String email;
    }

    @Getter
    @Builder
    public static class SignUpResponse {
        private String authCode;
    }

    @Getter
    @Builder(toBuilder = true)
    public static class PasswordResponse {
        private Boolean isMatched;
    }
}
