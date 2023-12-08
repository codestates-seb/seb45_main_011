package com.growstory.domain.bannedAccount.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;


@Getter
@NoArgsConstructor
@Entity
public class BannedAccount {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long bannedAccountId;

    // 신고 받은 횟수
    private int reportNums;

    // 남은 정지 일수
    private int suspendedDays;

    private Long accountId;
}
