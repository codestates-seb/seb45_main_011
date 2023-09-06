package com.growstory.domain.product.service;

import com.growstory.domain.product.dto.ProductDto;
import com.growstory.domain.product.entity.Product;
import com.growstory.domain.product.mapper.ProductMapper;
import com.growstory.domain.product.repository.ProductRepository;
import com.growstory.global.exception.BusinessLogicException;
import com.growstory.global.exception.ExceptionCode;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Transactional
@RequiredArgsConstructor
@Service
public class ProductService {
    private final ProductRepository productRepository;
    private final ProductMapper productMapper;

    @Transactional(readOnly = true)
    public Product findVerifiedProduct(Long productId) {
        return productRepository.findById(productId).orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.PRODUCT_NOT_FOUND));
    }

    @Transactional(readOnly = true)
    public List<ProductDto.Response> findAllProducts() {
        List<ProductDto.Response> products =
                productRepository.findAll().stream()
                        .map(productMapper::toResponseFrom)
                        .collect(Collectors.toList());
        return products;
    }

    public void createProducts(List<ProductDto.Post> products) {
        products.stream()
                .map(productDto -> {
                    Product product = Product.builder()
                            .name(productDto.getName())
                            .korName(productDto.getKorName())
                            .imageUrlLarge(productDto.getImageUrlTable().getLg())
                            .imageUrlSmall(productDto.getImageUrlTable().getSm())
                            .price(productDto.getPrice())
                            .build();
                   return productRepository.save(product);
                }).collect(Collectors.toList());
    }
}
