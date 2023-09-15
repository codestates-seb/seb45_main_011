package com.growstory.domain.product.mapper;

import com.growstory.domain.product.dto.ProductDto;
import com.growstory.domain.product.entity.Product;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ProductMapper {

    default ProductDto.Response toResponseFrom(Product product) {
        if(product == null) return null;
        ProductDto.ImageUrlTable imageUrlTable
                = ProductDto.ImageUrlTable.builder()
                        .sm(product.getImageUrlSmall())
                        .lg(product.getImageUrlLarge())
                        .build();

        return ProductDto.Response.builder()
                .productId(product.getProductId())
                .name(product.getName())
                .korName(product.getKorName())
                .imageUrlTable(imageUrlTable)
                .price(product.getPrice())
                .build();
    }

}
