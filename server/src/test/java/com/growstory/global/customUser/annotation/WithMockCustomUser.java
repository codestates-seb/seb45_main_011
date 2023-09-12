package com.growstory.global.customUser.annotation;

import com.growstory.global.customUser.factory.WithMockCustomUserSecurityContextFactory;
import org.springframework.security.test.context.support.WithSecurityContext;

import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;

@Retention(RetentionPolicy.RUNTIME)
@WithSecurityContext(factory = WithMockCustomUserSecurityContextFactory.class)
public @interface WithMockCustomUser {
    long accountId() default 1L;
    String email() default "admin@gmail.com";
    String displayName() default "관리자";
    String password();
    String profileImageUrl();
    String[] roles() default {"USER", "ADMIN"};
}