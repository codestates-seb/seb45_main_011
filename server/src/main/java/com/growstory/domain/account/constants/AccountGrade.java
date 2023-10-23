package com.growstory.domain.account.constants;

import lombok.Getter;

//    식물카드개수에 의한 등급 제도
//    50개 미만 - 브론즈 가드너
//    50개 이상 - 실버 가드너
//    100개 이상 - 골드 가드너
public enum AccountGrade {
    GRADE_BRONZE(1, "브론즈 가드너"),
    GRADE_SILVER(2, "실버 가드너"),
    GRADE_GOLD(3, "골드 가드너");

    @Getter
    private int stepNumber;

    @Getter
    private String stepDescription;

    AccountGrade(int stepNumber, String stepDescription) {
        this.stepNumber = stepNumber;
        this.stepDescription = stepDescription;
    }
}
