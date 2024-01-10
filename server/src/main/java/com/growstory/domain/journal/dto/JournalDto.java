package com.growstory.domain.journal.dto;

import com.growstory.global.badwordsfilter.dto.TextContainer;
import lombok.*;
import org.springframework.lang.Nullable;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;

public class JournalDto {
    @Getter
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Post implements TextContainer {
        @NotBlank
        String title;
        @NotBlank
        String content;
        @NotNull
        long leafAuthorId;

        @Override
        public String combineText() {
            StringBuilder sb = new StringBuilder();
            return sb.append(title+ " ").append(content).toString();
        }
    }

    @Getter
    public static class Patch implements TextContainer {
        @Nullable
        String title;
        @Nullable
        String content;
        @NotNull
        long leafAuthorId;

        @Override
        public String combineText() {
            StringBuilder sb = new StringBuilder();
            return sb.append(title+ " ").append(content).toString();
        }
    }

    @Getter
    @Builder
    public static class Response {
        long journalId;
        String title;
        String content;
        String imageUrl;
        LocalDateTime createdAt;
    }

//    @Getter
//    @Builder
//    @NoArgsConstructor
//    @AllArgsConstructor
//    public static class LeafAuthor {
//        long accountId;
//    }
}
