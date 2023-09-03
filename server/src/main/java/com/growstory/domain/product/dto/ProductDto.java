package com.growstory.domain.product.dto;

import lombok.Builder;
import lombok.Getter;

public class ProductDto {
    @Getter
    @Builder
    public static class Response {
        private String name;
        private String korName;
        private String imageUrl;
        private int price;
    }
}
