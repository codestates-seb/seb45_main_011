package com.growstory.global.auth.dto;

import lombok.Builder;
import lombok.Getter;

public class LoginDto {
    @Getter
    public static class Post {
        private String email;
        private String password;
    }

    @Getter
    @Builder
    public static class Response {
        private Long accountId;
        private String email;
        private String displayName;
        private String profileImageUrl;
        private String status;
    }
}
