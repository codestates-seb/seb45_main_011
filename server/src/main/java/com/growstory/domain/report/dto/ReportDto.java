package com.growstory.domain.report.dto;

import com.growstory.domain.point.entity.Point;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;

import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;

public class ReportDto {
    @Getter
    @Builder
    @Schema(name = "ReportPostDto")
    public static class Post {
        @NotBlank
        private Long accountId;

        @NotBlank
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
        private String content;
        private LocalDateTime createdAt;
    }
}
