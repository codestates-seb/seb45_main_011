package com.growstory.global.customUser.factory;

import com.growstory.global.auth.utils.CustomAuthorityUtils;
import com.growstory.global.customUser.annotation.WithMockCustomUser;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.test.context.support.WithSecurityContextFactory;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

public class WithMockCustomUserSecurityContextFactory implements WithSecurityContextFactory<WithMockCustomUser> {
    private static CustomAuthorityUtils authorityUtils;
    private static PasswordEncoder passwordEncoder;

    public WithMockCustomUserSecurityContextFactory(CustomAuthorityUtils authorityUtils, PasswordEncoder passwordEncoder) {
        this.authorityUtils = authorityUtils;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public SecurityContext createSecurityContext(WithMockCustomUser customUser) {
        SecurityContext context = SecurityContextHolder.createEmptyContext();

        Map<String, Object> claims = new HashMap<>();
        claims.put("accountId", customUser.accountId());
        claims.put("username", customUser.email());
        claims.put("displayName", customUser.displayName());
        claims.put("profileImageUrl", customUser.profileImageUrl());
        claims.put("roles", customUser.roles());
        System.out.println(Arrays.asList((String[]) claims.get("roles")));
        List<GrantedAuthority> authorities = authorityUtils.createAuthorities(Arrays.asList((String[]) claims.get("roles")));
        // 인증 토큰을 만들어 authentication으로 어퍼 캐스팅하여 SecurityContextHolder에 저장한다.
        Authentication authentication = new UsernamePasswordAuthenticationToken(claims, passwordEncoder.encode(customUser.password()), authorities);
        context.setAuthentication(authentication);

        return context;
    }
}
