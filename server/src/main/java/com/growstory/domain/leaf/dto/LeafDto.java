package com.growstory.domain.leaf.dto;

import lombok.Builder;
import lombok.Getter;

public class LeafDto {

    @Getter
    @Builder
    public static class LeafResponseForGardenInfo {
        private long id;
        private String name;
        private String imageUrl;
    }
}
