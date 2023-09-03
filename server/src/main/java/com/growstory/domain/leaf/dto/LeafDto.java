package com.growstory.domain.leaf.dto;

import lombok.Builder;
import lombok.Getter;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Positive;


public class LeafDto {
    @Getter
    public static class Post {
        @NotBlank
        private String leafName;

        @NotBlank
        private String leafNickName;

        @NotBlank
        private String place;

        @NotBlank
        private String content;
    }

    @Getter
    public static class Patch {
        @Positive
        private Long leafId;

        @NotBlank
        private String leafName;

        @NotBlank
        private String leafNickName;

        @NotBlank
        private String place;

        @NotBlank
        private String content;
    }

    @Getter
    @Builder
    public static class Response {
        private Long leafId;
        private String leafNickName;
        private String leafImageUrl;
        private String place;
        private String content;
    }

    @Getter
    @Builder
    public static class ResponseForGardenInfo {
        private Long id;
        private String name;
        private String imageUrl;
        private int journalCount;
    }
}
