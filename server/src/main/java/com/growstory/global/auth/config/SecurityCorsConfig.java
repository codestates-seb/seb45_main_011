package com.growstory.global.auth.config;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

@Configuration
@RequiredArgsConstructor
public class SecurityCorsConfig {
    @Bean
    public CorsFilter corsFilter() {
        //URL 기반의 CORS 설정을 관리
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration config = new CorsConfiguration();
        //요청에서 자격증명(쿠키, 인증 헤더 등)을 허용
        config.setAllowCredentials(true);

//        config.addAllowedOriginPattern("*");

        config.addAllowedOriginPattern("http://localhost:80"); // 로컬 아파치 환경에서 접근하는 CORS 허용
        config.addAllowedOriginPattern("http://localhost:3000"); // 로컬 프론트 환경에서 접근하는 CORS 허용
        config.addAllowedOriginPattern("https://growstory.vercel.app"); // 배포 환경

//        //응답 헤더에 Authorization 헤더를 노출하도록 설정
        config.addExposedHeader("Authorization");
        config.addExposedHeader("Refresh");
        config.addExposedHeader("DisplayName");
        config.addExposedHeader("AccountId");
        config.addExposedHeader("ProfileImageUrl");
        config.addExposedHeader("Location");

        config.addAllowedHeader("*"); //모든 header 허용

        config.addAllowedMethod("OPTIONS");
        config.addAllowedMethod("GET"); //특정 메소드만 허용
        config.addAllowedMethod("POST"); //특정 메소드만 허용
        config.addAllowedMethod("DELETE"); //특정 메소드만 허용
        config.addAllowedMethod("PATCH"); //특정 메소드만 허용

        source.registerCorsConfiguration("/**", config); //corsConfiguration으로 등록

        return new CorsFilter(source);
    }
}
