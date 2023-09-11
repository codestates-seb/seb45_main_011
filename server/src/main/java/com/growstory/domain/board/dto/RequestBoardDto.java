package com.growstory.domain.board.dto;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.lang.Nullable;

import javax.validation.constraints.NotBlank;
import java.util.List;


public class RequestBoardDto {

    @Getter
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    public static class Post {
        @NotBlank
        private String title;

        @NotBlank
        private String content;

        @Nullable
        private List<String> hashTags;


        @Builder
        public Post(String title, String content) {
            this.title = title;
            this.content = content;
        }

        @Builder
        public Post(String title, String content, @Nullable List<String> hashTags) {
            this.title = title;
            this.content = content;
            this.hashTags = hashTags;
        }
    }

    @Getter
    public static class Patch {

        private Long boardId;

        @Nullable
        private String title;

        @Nullable
        private String content;

        @Nullable
        private String imageUrl;

        @Nullable
        private String hashTag;
    }
}
