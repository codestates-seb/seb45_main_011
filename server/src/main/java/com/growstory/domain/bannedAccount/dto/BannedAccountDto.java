package com.growstory.domain.bannedAccount.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

public class BannedAccountDto {
    @Getter
    @Builder
    @Schema(name = "BannedAccountResponseDto")
    public static class Response {
        private Long bannedAccountId;
        // 신고 받은 횟수
        private int reportNums;
        // 정지 날짜
        private LocalDateTime createdAt;
        // 정지 풀리는 날짜
        private LocalDateTime suspendedDate;

        private Long accountId;
    }
}
