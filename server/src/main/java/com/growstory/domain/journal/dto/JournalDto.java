package com.growstory.domain.journal.dto;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

public class JournalDto {
    @Getter
    public static class Post {
        @NotBlank
        String title;
        @NotBlank
        String content;
    }

    @Getter
    public static class Patch {
        String title;
        String content;
    }

    @Getter
    @Builder
    public static class Response {
        long journalId;
        String title;
        String content;
        String imageUrl;
    }
}
