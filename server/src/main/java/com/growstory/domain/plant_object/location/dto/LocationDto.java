package com.growstory.domain.plant_object.location.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

public class LocationDto {

    @Getter
    public static class Post {
        private int x;
        private int y;
    }

    @Getter
    @Builder
    public static class Patch {
        private Long locationId;
        private int x;
        private int y;
        boolean isInstalled;
    }

    @Getter
    @Builder
    public static class Response {
        private Long locationId;
        private int x;
        private int y;
        Boolean isInstalled;
    }
}
