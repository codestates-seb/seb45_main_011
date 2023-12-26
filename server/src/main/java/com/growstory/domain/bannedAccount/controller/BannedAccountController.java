package com.growstory.domain.bannedAccount.controller;

import com.growstory.domain.account.dto.AccountDto;
import com.growstory.domain.bannedAccount.dto.BannedAccountDto;
import com.growstory.domain.bannedAccount.service.BannedAccountService;
import com.growstory.global.constants.HttpStatusCode;
import com.growstory.global.response.MultiResponseDto;
import com.growstory.global.response.SingleResponseDto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.constraints.Positive;
import java.util.List;

@RestController
@Validated
@RequiredArgsConstructor
@Tag(name = "BannedAccount", description = "Banned Account Controller")
@RequestMapping("/v1/bannedAccounts")
public class BannedAccountController {
    private final BannedAccountService bannedAccountService;

    // 페이지네이션 필요한지 물어보기
    @Operation(summary = "전체 정지 계정 조회", description = "전체 정지 계정 정보 조회")
    @GetMapping("/all")
    public ResponseEntity<MultiResponseDto<BannedAccountDto.Response>> getAccounts(@Positive @RequestParam(defaultValue = "1") int page,
                                                                                   @Positive @RequestParam(defaultValue = "10") int size) {
        Page<BannedAccountDto.Response> responseDto = bannedAccountService.getBannedAccounts(page - 1, size);

        return ResponseEntity.ok(MultiResponseDto.<BannedAccountDto.Response>builder()
                .status(HttpStatusCode.OK.getStatusCode())
                .message(HttpStatusCode.OK.getMessage())
                .data(responseDto.getContent())
                .page(responseDto)
                .build()
        );
    }
}
