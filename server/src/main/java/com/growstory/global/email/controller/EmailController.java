package com.growstory.global.email.controller;

import com.growstory.domain.account.service.AccountService;
import com.growstory.global.constants.HttpStatusCode;
import com.growstory.global.email.dto.EmailDto;
import com.growstory.global.email.service.EmailService;
import com.growstory.global.response.SingleResponseDto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
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
@Tag(name = "Email", description = "Email Controller")
@RequestMapping("/v1/emails")
public class EmailController {
    private final EmailService emailService;
    private final AccountService accountService;

    @Operation(summary = "회원가입 시 메일 인증", description = "회원가입 시 입력받은 이메일로 메일 전송")
    @PostMapping("/signup")
    public ResponseEntity<SingleResponseDto<EmailDto.SignUpResponse>> postAuthCodeMail(@Valid @RequestBody EmailDto.Post requestDto) {
        // 인증시 메일 확인 하기
        accountService.verifyExistsEmail(requestDto.getEmail());
        EmailDto.SignUpResponse responseDto = emailService.sendAuthCodeMail(requestDto);

        return ResponseEntity.ok(SingleResponseDto.<EmailDto.SignUpResponse>builder()
                .status(HttpStatusCode.OK.getStatusCode())
                .message(HttpStatusCode.OK.getMessage())
                .data(responseDto)
                .build());
    }

    @Operation(summary = "비밀번호 찾기 시 임시 비밀번호 전송", description = "비밀번호 찾기 시 입력받은 이메일로 임시 비밀번호 전송")
    @PostMapping("/password")
    public ResponseEntity<SingleResponseDto<EmailDto.PasswordResponse>> postPasswordMail(@Valid @RequestBody EmailDto.Post requestDto) {
        EmailDto.PasswordResponse responseDto = emailService.sendPasswordMail(requestDto);

        return ResponseEntity.ok(SingleResponseDto.<EmailDto.PasswordResponse>builder()
                .status(HttpStatusCode.OK.getStatusCode())
                .message(HttpStatusCode.OK.getMessage())
                .data(responseDto)
                .build());
    }
}
