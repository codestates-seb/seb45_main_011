package com.growstory.domain.account.controller;

import com.growstory.domain.account.dto.AccountDto;
import com.growstory.domain.account.service.AccountService;
import com.growstory.global.constants.HttpStatusCode;
import com.growstory.global.response.MultiResponseDto;
import com.growstory.global.response.SingleResponseDto;
import com.growstory.global.utils.UriCreator;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.net.URI;
import java.util.List;

@RestController
@Validated
@RequiredArgsConstructor
@Tag(name = "Account", description = "Account Controller")
@RequestMapping("/v1/accounts")
public class AccountController {
    private static final String ACCOUNT_DEFAULT_URL = "/v1/accounts";

    private final AccountService accountService;

    @Operation(summary = "회원가입", description = "사용자 정보를 입력받아 계정 생성")
    @PostMapping("/signup")
    public ResponseEntity<HttpStatus> postAccount(@Valid @RequestBody AccountDto.Post accountPostDto) {
        AccountDto.Response responseDto = accountService.createAccount(accountPostDto);
        URI location = UriCreator.createUri(ACCOUNT_DEFAULT_URL, responseDto.getAccountId());


        return ResponseEntity.created(location).build();
    }

    @Operation(summary = "회원가입", description = "게스트 계정 생성")
    @PostMapping("/guest")
    public ResponseEntity<?> postAccount() {
        List<String> token = accountService.createAccount();
        URI location = UriCreator.createUri(ACCOUNT_DEFAULT_URL, Long.parseLong(token.get(2)));

        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", token.get(0));
        headers.add("Refresh", token.get(1));

        return ResponseEntity.created(location).headers(headers).build();
    }

    @Operation(summary = "프로필 사진 수정", description = "입력받은 프로필 사진으로 정보 수정")
    @PatchMapping(value = "/profileimage", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<HttpStatus> patchProfileImage(@RequestPart MultipartFile profileImage) {
        accountService.updateProfileImage(profileImage);

        return ResponseEntity.noContent().build();
    }

    @Operation(summary = "닉네임 수정", description = "입력받은 닉네임으로 정보 수정")
    @PatchMapping("/displayname")
    public ResponseEntity<HttpStatus> patchDisplayName(@Valid @RequestBody AccountDto.DisplayNamePatch displayNamePatchDto) {
        accountService.updateDisplayName(displayNamePatchDto);

        return ResponseEntity.noContent().build();
    }

    @Operation(summary = "비밀번호 수정", description = "입력받은 비밀번호로 정보 수정")
    @PatchMapping("/password")
    public ResponseEntity<HttpStatus> patchDisplayName(@Valid @RequestBody AccountDto.PasswordPatch passwordPatchDto) {
        accountService.updatePassword(passwordPatchDto);

        return ResponseEntity.noContent().build();
    }

    @Operation(summary = "단일 계정 조회", description = "입력받은 사용자의 정보 조회")
    @GetMapping("/{account-id}")
    public ResponseEntity<SingleResponseDto<AccountDto.Response>> getAccount(@Positive @PathVariable("account-id") Long accountId) {
        AccountDto.Response responseDto = accountService.getAccount(accountId);

        return ResponseEntity.ok(SingleResponseDto.<AccountDto.Response>builder()
                .status(HttpStatusCode.OK.getStatusCode())
                .message(HttpStatusCode.OK.getMessage())
                .data(responseDto)
                .build()
        );
    }

    @Operation(summary = "전체 계정 조회", description = "전체 계정 정보 조회")
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

    @Operation(summary = "사용자 계정이 쓴 게시글 조회", description = "입력받은 사용자가 작성한 게시글 조회")
    @GetMapping("/boardWritten/{account-id}")
    public ResponseEntity<MultiResponseDto<AccountDto.BoardResponse>> getBoardWritten(@Positive @RequestParam(defaultValue = "1") int page,
                                                                                      @Positive @RequestParam(defaultValue = "12") int size,
                                                                                      @Positive @PathVariable("account-id") Long accountId) {
        Page<AccountDto.BoardResponse> responseDto = accountService.getAccountBoardWritten(page - 1, size, accountId);

        return ResponseEntity.ok(MultiResponseDto.<AccountDto.BoardResponse>builder()
                .status(HttpStatusCode.OK.getStatusCode())
                .message(HttpStatusCode.OK.getMessage())
                .data(responseDto.getContent())
                .page(responseDto)
                .build());
    }

    @Operation(summary = "사용자 계정이 좋아요 누른 게시글 조회", description = "입력받은 사용자가 좋아요 누른 게시글 조회")
    @GetMapping("/boardLiked/{account-id}")
    public ResponseEntity<MultiResponseDto<AccountDto.BoardResponse>> getBoardLiked(@Positive @RequestParam(defaultValue = "1") int page,
                                                                                    @Positive @RequestParam(defaultValue = "12") int size,
                                                                                    @Positive @PathVariable("account-id") Long accountId) {
        Page<AccountDto.BoardResponse> responseDto = accountService.getAccountBoardLiked(page - 1, size, accountId);

        return ResponseEntity.ok(MultiResponseDto.<AccountDto.BoardResponse>builder()
                .status(HttpStatusCode.OK.getStatusCode())
                .message(HttpStatusCode.OK.getMessage())
                .data(responseDto.getContent())
                .page(responseDto)
                .build());
    }

    @Operation(summary = "사용자 계정이 댓글 쓴 게시글 조회", description = "입력받은 사용자가 댓글 작성한 게시글 조회")
    @GetMapping("/commentWritten/{account-id}")
    public ResponseEntity<MultiResponseDto<AccountDto.BoardResponse>> getCommentWrittenBoard(@Positive @RequestParam(defaultValue = "1") int page,
                                                                                             @Positive @RequestParam(defaultValue = "12") int size,
                                                                                             @Positive @PathVariable("account-id") Long accountId) {
        Page<AccountDto.BoardResponse> responseDto = accountService.getAccountCommentWrittenBoard(page - 1, size, accountId);

        return ResponseEntity.ok(MultiResponseDto.<AccountDto.BoardResponse>builder()
                .status(HttpStatusCode.OK.getStatusCode())
                .message(HttpStatusCode.OK.getMessage())
                .data(responseDto.getContent())
                .page(responseDto)
                .build());
    }

    @Operation(summary = "비밀번호 검증", description = "회원탈퇴시 비밀번호 검증")
    @PostMapping("/password/verification")
    public ResponseEntity<SingleResponseDto<Boolean>> verifyPassword(@Valid @RequestBody AccountDto.PasswordVerify passwordVerifyDto) {
        Boolean isMatched = accountService.verifyPassword(passwordVerifyDto);

        return ResponseEntity.ok(SingleResponseDto.<Boolean>builder()
                .status(HttpStatusCode.OK.getStatusCode())
                .message(HttpStatusCode.OK.getMessage())
                .data(isMatched)
                .build());
    }

    @Operation(summary = "회원탈퇴", description = "로그인된 사용자 계정 탈퇴")
    @DeleteMapping
    public ResponseEntity<HttpStatus> deleteAccount() {
        accountService.deleteAccount();

        return ResponseEntity.noContent().build();
    }

    @Operation(summary = "게스트 회원 탈퇴", description = "게스트 사용자 계정 삭제")
    @DeleteMapping("/guest/{account-id}")
    public ResponseEntity<HttpStatus> deleteAccount(@Positive @PathVariable("account-id") Long accountId){
        accountService.deleteAccount(accountId);

        return ResponseEntity.noContent().build();
    }
}
