package com.growstory.domain.leaf.dto;

import lombok.Builder;
import lombok.Getter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Positive;
import java.time.LocalDateTime;

public class LeafDto {
    @Getter
    public static class Post {
        @NotBlank
        private String leafName;

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
        private String content;

        private Boolean isImageUpdated;
    }

    @Getter
    @Builder
    public static class Response {
        private Long leafId;
        private String leafName;
        private String leafImageUrl;
        private String content;
        private LocalDateTime createdAt;
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
