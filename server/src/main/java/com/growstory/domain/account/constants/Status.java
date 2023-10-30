package com.growstory.domain.account.constants;

import lombok.Getter;

    @Getter
    public enum Status {
        ADMIN(1, "관리자"),
        USER(2, "일반 유저"),
        SOCIAL_USER(3, "소셜 로그인 유저"),
        BANNED_USER(4, "정지 유저"),
        GUEST_USER(5, "게스트 유저");

        private int stepNumber;

        private String stepDescription;

        Status(int stepNumber, String stepDescription) {
            this.stepNumber = stepNumber;
            this.stepDescription = stepDescription;
        }
}
