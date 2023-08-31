package com.growstory.global.auth.utils;

import com.growstory.global.exception.BusinessLogicException;
import com.growstory.global.exception.ExceptionCode;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

public class AuthUserUtils {
    /**
     * 로그인한 사용자의 인증 객체 가져오는 메서드
     *
     * @return Object principal 객체
     */
    public static Object getAuthUser() {
        // Spring Security 컨텍스트에서 인증 객체를 가져 온다.
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        // 사용자가 인증되지 않거나 익명인지 확인하고 그렇다면 예외 던지기
        if (authentication.getName() == null || authentication.getName().equals("anonymousUser")) {
            throw new BusinessLogicException(ExceptionCode.ACCOUNT_UNAUTHORIZED);   // 🚨 예외처리
        }

        // 인증된 사용자를 나타내는 인증 객체 반환
        return authentication.getPrincipal();
    }
}
