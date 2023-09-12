package com.growstory.domain.hashTag.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
public class ResponseHashTagDto {
    private Long hashTagId;
    private String tag;

    @Builder
    public ResponseHashTagDto(Long hashTagId, String tag) {
        this.hashTagId = hashTagId;
        this.tag = tag;
    }
}
