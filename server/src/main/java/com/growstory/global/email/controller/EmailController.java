package com.growstory.global.email.controller;

import com.growstory.global.constants.HttpStatusCode;
import com.growstory.global.email.dto.EmailDto;
import com.growstory.global.email.service.EmailService;
import com.growstory.global.response.SingleResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@RequiredArgsConstructor
@RequestMapping("/v1/emails")
public class EmailController {
    private final EmailService emailService;

    // 회원가입 시 메일 인증
    @PostMapping("/signup")
    public ResponseEntity<SingleResponseDto<Object>> postAuthCodeMail(@Valid @RequestBody EmailDto.Post emailPostDto) {
        EmailDto.Response responseDto = emailService.sendAuthCodeMail(emailPostDto);

        return ResponseEntity.ok(SingleResponseDto.builder()
                .status(HttpStatusCode.OK.getStatusCode())
                .message(HttpStatusCode.OK.getMessage())
                .data(responseDto)
                .build()
        );
    }

    // 비밀번호 찾기 시 임시 비밀번호 전송
    @PostMapping("/password")
    public ResponseEntity<HttpStatus> postPasswordMail(@Valid @RequestBody EmailDto.Post emailPostDto) {
        emailService.sendPasswordMail(emailPostDto);

        return ResponseEntity.noContent().build();
    }
}
