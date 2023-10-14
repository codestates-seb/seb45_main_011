package com.growstory.domain.journal.dto;

import lombok.*;
import org.springframework.lang.Nullable;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Null;
import java.time.LocalDate;
import java.time.LocalDateTime;

public class JournalDto {
    @Getter
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Post {
        @NotBlank
        String title;
        @NotBlank
        String content;
    }

    @Getter
    public static class Patch {
        @Nullable
        String title;
        @Nullable
        String content;
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

    @Getter
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class LeafAuthor {
        long accountId;
    }
}
