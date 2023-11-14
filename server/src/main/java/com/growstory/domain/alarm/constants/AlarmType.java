package com.growstory.domain.alarm.constants;

import lombok.Getter;

@Getter
public enum AlarmType {
    REPORT_COMMENT(1, "reportComment"),
    REPORT_POST(2, "reportPost"),
    SIGN_UP(500, "signUp"),
    DAILY_LOGIN(10, "dailyLogin"),
    DAILY_QUIZ(10, "dailyQuiz"),
    WRITE_POST(30, "writePost"),
    WRITE_DIARY(10, "writeDiary");

    private int point;

    private String stepDescription;

    AlarmType(int point, String stepDescription) {
        this.point = point;
        this.stepDescription = stepDescription;
    }
}
