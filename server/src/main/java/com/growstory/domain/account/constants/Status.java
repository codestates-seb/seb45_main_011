package com.growstory.domain.account.constants;

import lombok.Getter;

public enum Status {
    ADMIN(1, "ADMIN"),
    USER(2, "USER"),
    SOCIAL_USER(3, "SOCIAL_USER"),
    BANNED_USER(4, "BANNED_USER"),
    GUEST_USER(5, "GUEST_USER");

    @Getter
    private int stepNumber;

    @Getter
    private String stepDescription;

    Status(int stepNumber, String stepDescription) {
        this.stepNumber = stepNumber;
        this.stepDescription = stepDescription;
    }
}
