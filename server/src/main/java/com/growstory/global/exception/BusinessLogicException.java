package com.growstory.global.exception;

import com.growstory.global.badwords.dto.ProfanityDto;
import lombok.Getter;

import java.util.List;

@Getter
public class BusinessLogicException extends RuntimeException {
    private ExceptionCode exceptionCode;
    private ProfanityDto profanityDto;

    public BusinessLogicException(ExceptionCode exceptionCode) {
        super(exceptionCode.getMessage());
        this.exceptionCode = exceptionCode;
    }

    //비속어 필터링 관련 BLE
    public BusinessLogicException(ExceptionCode exceptionCode, ProfanityDto profanityDto) {
        super(exceptionCode.getMessage());
        this.exceptionCode = exceptionCode;
        this.profanityDto = profanityDto;
    }
}
