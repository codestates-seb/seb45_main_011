package com.growstory.global.exception;

import com.growstory.global.badwordsfilter.dto.ProfanityResponse;
import lombok.Getter;

@Getter
public class BusinessLogicException extends RuntimeException {
    private ExceptionCode exceptionCode;
    private ProfanityResponse profanityResponse;

    public BusinessLogicException(ExceptionCode exceptionCode) {
        super(exceptionCode.getMessage());
        this.exceptionCode = exceptionCode;
    }

    //비속어 필터링 관련 BLE
    public BusinessLogicException(ExceptionCode exceptionCode, ProfanityResponse profanityResponse) {
        super(exceptionCode.getMessage());
        this.exceptionCode = exceptionCode;
        this.profanityResponse = profanityResponse;
    }
}
