package com.growstory.domain.account.controller;

import com.growstory.domain.account.dto.AccountDto;
import com.growstory.domain.account.service.AccountService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;

@RestController
@Validated
@RequiredArgsConstructor
@RequestMapping("/v1/accounts")
public class AccountController {
    private final AccountService accountService;

//    @PostMapping("/signup")
//    public ResponseEntity postAccount(@Valid @RequestPart AccountDto.Post requestDto,
//                                      @RequestPart MultipartFile profileImage) {
//        AccountDto.Response accountResponseDto = accountService.createAccount();
//    }
}
