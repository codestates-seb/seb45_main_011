package com.growstory.domain.leaf.dto;

import com.growstory.global.badwords.dto.TextContainer;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Positive;
import java.time.LocalDateTime;

public class LeafDto {
    @Getter
    @Schema(name = "LeafPostDto")
    public static class Post implements TextContainer {
        @NotBlank
        private String leafName;

        @NotBlank
        private String content;

        @Builder
        public Post(String leafName, String content) {
            this.leafName = leafName;
            this.content = content;
        }

        @Override
        public String combineText() {
            StringBuilder sb = new StringBuilder();
            return sb.append(this.leafName).append(" ").append(this.content).toString();
        }
    }

    @Getter
    @Schema(name = "LeafPatchDto")
    public static class Patch implements TextContainer {
        @Positive
        private Long leafId;

        @NotBlank
        private String leafName;

        @NotBlank
        private String content;

        private Boolean isImageUpdated;

        @Builder
        public Patch(Long leafId, String leafName, String content, Boolean isImageUpdated) {
            this.leafId = leafId;
            this.leafName = leafName;
            this.content = content;
            this.isImageUpdated = isImageUpdated;
        }

        @Override
        public String combineText() {
            StringBuilder sb = new StringBuilder();
            return sb.append(this.leafName).append(" ").append(this.content).toString();
        }
    }

    @Getter
    @Builder
    @Schema(name = "LeafResponseDto")
    public static class Response {
        private String displayName;
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
