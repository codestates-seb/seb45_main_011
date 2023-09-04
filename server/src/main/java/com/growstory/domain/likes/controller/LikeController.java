package com.growstory.domain.likes.controller;

import com.growstory.domain.likes.service.LikeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.constraints.Positive;

@RestController
@Validated
@RequiredArgsConstructor
@RequestMapping("/v1/likes")
public class LikeController {
    private final LikeService likeService;

    @PostMapping("/{account-id}")
    public ResponseEntity<HttpStatus> postAccountLike(@PathVariable("account-id") @Positive Long ownerAccountId) {
        likeService.pressAccountLike(ownerAccountId);

        return ResponseEntity.noContent().build();
    }
}
