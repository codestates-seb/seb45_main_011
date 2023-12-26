package com.growstory.domain.report.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Positive;
import java.time.LocalDateTime;

public class ReportDto {
    @Getter
    @Builder
    @Schema(name = "ReportPostDto")
    public static class Post {
        @Positive
        private Long reportedAccountId;

        @NotBlank
        private String title;

        @NotBlank
        private String content;
    }

    @Getter
    @Builder
    @Schema(name = "ReportResponseDto")
    public static class Response {
        private Long reportId;
        private String displayName;
        private String reportedDisplayName;
        private String title;
        private String content;
        private LocalDateTime createdAt;
    }
}
