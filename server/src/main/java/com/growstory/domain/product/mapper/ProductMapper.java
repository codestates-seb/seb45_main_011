package com.growstory.domain.product.mapper;

import com.growstory.domain.product.dto.ProductDto;
import com.growstory.domain.product.entity.Product;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ProductMapper {
    default ProductDto.Response toResponseFrom(Product product) {
        return ProductDto.Response.builder()
                .name(product.getName())
                .korName(product.getKorName())
                .imageUrl(product.getImageUrl())
                .price(product.getPrice())
                .build();
    }
}
