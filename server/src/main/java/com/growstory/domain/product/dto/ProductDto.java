package com.growstory.domain.product.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import javax.validation.constraints.NotNull;
import java.util.List;

public class ProductDto {

    @Builder
    @Getter
    public static class Post {
        @NotNull
        private String name;
        @NotNull
        private String korName;
        @NotNull
        private int price;
        private ImageUrlTable imageUrlTable;
    }

    @Builder
    @Getter
    public static class Posts {
        List<ProductDto.Post> products;
    }

    @Builder
    @AllArgsConstructor
    @Getter
    public static class Response {
        private long productId;
        private String name;
        private String korName;
        private int price;
        private ImageUrlTable imageUrlTable;
    }

    @Builder
    @AllArgsConstructor
    @Getter
    public static class ImageUrlTable {
        private String sm;
        private String lg;
    }
}
