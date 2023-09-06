package com.growstory.domain.product.controller;

import com.growstory.domain.product.dto.ProductDto;
import com.growstory.domain.product.service.ProductService;
import com.growstory.global.utils.UriCreator;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/v1/products")
public class ProductController {

    private final ProductService productService;

    private static final String DEFAULT_URL = "/v1/products";
    @PostMapping
    public ResponseEntity<HttpStatus> postProducts(@RequestBody List<ProductDto.Post> products) {
        productService.createProducts(products);

        URI location = UriComponentsBuilder.newInstance()
                .path(DEFAULT_URL)
                .build()
                .toUri();

        return ResponseEntity.created(location).build();
    }
}
