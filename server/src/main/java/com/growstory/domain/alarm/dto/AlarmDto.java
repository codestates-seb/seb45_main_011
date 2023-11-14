package com.growstory.domain.alarm.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

public class AlarmDto {
    @Getter
    @Builder
    @Schema(name = "AlarmResponseDto")
    public static class Response {
        private Long id;
        private String type;
        private int num;
        private Boolean isShow;
    }
}
