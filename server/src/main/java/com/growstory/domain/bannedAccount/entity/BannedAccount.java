package com.growstory.domain.bannedAccount.entity;

import com.growstory.global.audit.BaseTimeEntity;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.time.LocalDateTime;


@Getter
@NoArgsConstructor
@Entity
public class BannedAccount extends BaseTimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long bannedAccountId;

    // 신고 받은 횟수
    private int reportNums;

    // 정지 풀리는 날짜
    private LocalDateTime suspendedDate;

    private Long accountId;

    @Builder
    public BannedAccount(Long bannedAccountId, int reportNums, LocalDateTime suspendedDate, Long accountId) {
        this.bannedAccountId = bannedAccountId;
        this.reportNums = reportNums;
        this.suspendedDate = suspendedDate;
        this.accountId = accountId;
    }
}
