package com.growstory.domain.account.controller;

import com.growstory.domain.account.dto.AccountDto;
import com.growstory.domain.account.service.AccountService;
import com.growstory.global.constants.HttpStatusCode;
import com.growstory.global.response.SingleResponseDto;
import com.growstory.global.utils.UriCreator;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.net.URI;
import java.util.List;

@RestController
@Validated
@RequiredArgsConstructor
@RequestMapping("/v1/accounts")
public class AccountController {
    private static final String ACCOUNT_DEFAULT_URL = "/v1/accounts";

    private final AccountService accountService;

    // 회원가입
    @PostMapping("/signup")
    public ResponseEntity<HttpStatus> postAccount(@Valid @RequestBody AccountDto.Post accountPostDto) {
        AccountDto.Response accountResponseDto = accountService.createAccount(accountPostDto);
        URI location = UriCreator.createUri(ACCOUNT_DEFAULT_URL, accountResponseDto.getAccountId());

        return ResponseEntity.created(location).build();
    }

    // 나의 정보 수정(프로필 사진)
    @PatchMapping("/profileimage")
    public ResponseEntity<HttpStatus> patchProfileImage(@RequestPart MultipartFile profileImage) {
        accountService.updateProfileImage(profileImage);

        return ResponseEntity.noContent().build();
    }

    // 나의 정보 수정(닉네임)
    @PatchMapping("/displayname")
    public ResponseEntity<HttpStatus> patchDisplayName(@Valid @RequestBody AccountDto.DisplayNamePatch displayNamePatchDto) {
        accountService.updateDisplayName(displayNamePatchDto);

        return ResponseEntity.noContent().build();
    }

    // 나의 정보 수정(비밀번호)
    @PatchMapping("/password")
    public ResponseEntity<HttpStatus> patchDisplayName(@Valid @RequestBody AccountDto.PasswordPatch passwordPatchDto) {
        accountService.updatePassword(passwordPatchDto);

        return ResponseEntity.noContent().build();
    }

    // 마이페이지 조회
    @GetMapping
    public ResponseEntity<SingleResponseDto<AccountDto.Response>> getAccount() {
        AccountDto.Response responseDto = accountService.getAccount();

        return ResponseEntity.ok(SingleResponseDto.<AccountDto.Response>builder()
                .status(HttpStatusCode.OK.getStatusCode())
                .message(HttpStatusCode.OK.getMessage())
                .data(responseDto)
                .build()
        );
    }

//     유저 전체 조회
    @GetMapping("/all")
    public ResponseEntity<SingleResponseDto<List<AccountDto.Response>>> getAccounts() {
        List<AccountDto.Response> responseDtos = accountService.getAccounts();

        return ResponseEntity.ok(SingleResponseDto.<List<AccountDto.Response>>builder()
                .status(HttpStatusCode.OK.getStatusCode())
                .message(HttpStatusCode.OK.getMessage())
                .data(responseDtos)
                .build()
        );
    }

    // 회원 탈퇴 전 비밀번호 검증
    @PostMapping("/password/verification")
    public ResponseEntity<SingleResponseDto<Boolean>> verifyPassword(@Valid @RequestBody AccountDto.PasswordVerify passwordVerifyDto) {
        Boolean isMatched = accountService.verifyPassword(passwordVerifyDto);

        return ResponseEntity.ok(SingleResponseDto.<Boolean>builder()
                .status(HttpStatusCode.OK.getStatusCode())
                .message(HttpStatusCode.OK.getMessage())
                .data(isMatched)
                .build());
    }

    // 회원 탈퇴
    @DeleteMapping
    public ResponseEntity<HttpStatus> deleteAccount() {
        accountService.deleteAccount();

        return ResponseEntity.noContent().build();
    }
}
