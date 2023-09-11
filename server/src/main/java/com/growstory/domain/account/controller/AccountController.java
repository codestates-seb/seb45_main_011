package com.growstory.domain.account.controller;

import com.growstory.domain.account.dto.AccountDto;
import com.growstory.domain.account.service.AccountService;
import com.growstory.global.constants.HttpStatusCode;
import com.growstory.global.response.SingleResponseDto;
import com.growstory.global.utils.UriCreator;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
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
//@Tag(name = "Sample", description = "Test Controller")
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
    @Operation(summary = "Request Post test", description = "Response name, email, phone")
    @PatchMapping(value = "/profileimage", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<HttpStatus> patchProfileImage(@Parameter(description = "multipart/form-data 형식의 이미지 리스트를 input으로 받습니다. 이때 key 값은 multipartFile 입니다.")
                                                        @RequestPart MultipartFile profileImage) {
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
