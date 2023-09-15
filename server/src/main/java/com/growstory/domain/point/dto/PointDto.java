package com.growstory.domain.point.dto;

import lombok.Builder;
import lombok.Getter;

public class PointDto {
    @Getter
    @Builder
    public static class Response {
        private int score;
    }
}
