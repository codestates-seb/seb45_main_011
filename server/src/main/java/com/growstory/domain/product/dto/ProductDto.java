package com.growstory.domain.product.dto;

import lombok.Builder;
import lombok.Getter;

import java.util.List;

public class ProductDto {

    @Getter
    @Builder
    public static class Post {
        private String name;
        private String korName;
        private String imageUrl;
        private int price;
    }

    @Getter
    @Builder
    public static class Posts {
        List<ProductDto.Post> products;
    }

    @Getter
    @Builder
    public static class Response {
        private String name;
        private String korName;
        private String imageUrl;
        private int price;
    }
}
