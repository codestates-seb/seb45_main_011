package com.growstory.global.auth.config;

import com.growstory.domain.account.repository.AccountRepository;
import com.growstory.domain.account.service.AccountService;
import com.growstory.domain.bannedAccount.repository.BannedAccountRepository;
import com.growstory.domain.point.repository.PointRepository;
import com.growstory.domain.point.service.PointService;
import com.growstory.global.auth.filter.JwtAuthenticationFilter;
import com.growstory.global.auth.filter.JwtVerificationFilter;
import com.growstory.global.auth.handler.*;
import com.growstory.global.auth.jwt.JwtTokenizer;
import com.growstory.global.auth.utils.CustomAuthorityUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.oauth2.client.web.OAuth2LoginAuthenticationFilter;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity // WebSecurityConfiguration, SpringWebMvcImportSelector, OAuth2ImportSelector, HttpSecurityConfiguration 클래스 import 해주는 역할
@RequiredArgsConstructor
public class SecurityConfiguration {
    private final JwtTokenizer jwtTokenizer;
    private final AccountService accountService;
    private final AccountRepository accountRepository;
    private final BannedAccountRepository bannedAccountRepository;
    private final CustomAuthorityUtils authorityUtils;
    private final SecurityCorsConfig corsConfig;
    private final PointService pointService;
    private final PointRepository pointRepository;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity httpSecurity) throws Exception {
        return httpSecurity
                .headers().frameOptions().sameOrigin() // 동일 도메인에서는 iframe(현재 페이지에 다른 페이지를 포함시키는 역할) 접근이 가능하도록
                .and()
                .csrf().disable() // Rest API는 stateless하기 때문에 인증정보를 세션에 보관하지 않아 csrf에 대해 안전
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS) // 세션 사용 X
                .and()
                .formLogin().disable() // formLogin 사용 X
                .httpBasic().disable() // httpBasic(request header에 id와 password를 직접 날리는 방식) 사용 X
                .exceptionHandling()
                .authenticationEntryPoint(new AccountAuthticationEntryPoint())
                .accessDeniedHandler(new AccountAccessDeniedHandler())
                .and()
                .apply(new CustomFilterConfigurer())
                .and()
                .authorizeHttpRequests(authrize -> authrize
                        .antMatchers(HttpMethod.POST, "/v1/accounts/**").permitAll()
                        .antMatchers(HttpMethod.GET, "/v1/**").permitAll()
                        .antMatchers(HttpMethod.PATCH, "/v1/**").permitAll()
                        .antMatchers(HttpMethod.DELETE, "/v1/**").permitAll()
                        .anyRequest().permitAll())
                .oauth2Login(oauth2 -> {
                    oauth2.failureHandler(new OAuth2AccountFailureHandler());
                    oauth2.successHandler(new OAuth2AccountSuccessHandler(jwtTokenizer, authorityUtils, accountService, accountRepository, bannedAccountRepository, pointService, pointRepository));
                })
                .build();
    }

    // securityConfiguration 내부에서 passwordEncoder를 Bean으로 등록하기 때문에
    // accountService와 순환참조 발생
    // 따라서 PasswordEncoderConfig파일을 따로 만들어
    // 외부에서 passwordEncoder를 Bean으로 등록
//    @Bean
//    public PasswordEncoder passwordEncoder() {
//        return PasswordEncoderFactories.createDelegatingPasswordEncoder();
//    }

    public class CustomFilterConfigurer extends AbstractHttpConfigurer<CustomFilterConfigurer, HttpSecurity> {
        @Override
        public void configure(HttpSecurity builder) throws Exception {
            // authenticationManager : 사용자가 로그인 요청시 입력한 아이디와 패스워드를 해당 객체로 전달하여 인증 수행하며, 결과에 따라 로직 처리
            AuthenticationManager authenticationManager = builder.getSharedObject(AuthenticationManager.class); // AuthenticationManager 객체얻기

            JwtAuthenticationFilter jwtAuthenticationFilter = new JwtAuthenticationFilter(authenticationManager, jwtTokenizer); // JwtAuthenticationFilter 객체 생성하며 DI하기
            // AbstractAuthenticationProcessingFilter에서 상속받은 filterProcessurl을 설정 (설정하지 않으면 default 값인 /Login)
            jwtAuthenticationFilter.setFilterProcessesUrl("/v1/accounts/authentication");
            jwtAuthenticationFilter.setAuthenticationSuccessHandler(new AccountAuthenticationSuccessHandler(accountRepository, accountService, bannedAccountRepository));
            jwtAuthenticationFilter.setAuthenticationFailureHandler(new AccountAuthenticationFailureHandler());

            JwtVerificationFilter jwtVerificationFilter = new JwtVerificationFilter(jwtTokenizer, authorityUtils);

            // Spring Security FilterChain에 추가
            builder
                    .addFilter(corsConfig.corsFilter())
                    .addFilter(jwtAuthenticationFilter)
                    // OAuth2LoginAuthenticationFilter : OAuth2.0 권한 부여 응답 처리 클래스 뒤에 jwtVerificationFilter 추가 (Oauth)
                    .addFilterAfter(jwtVerificationFilter, OAuth2LoginAuthenticationFilter.class);
        }
    }
}
