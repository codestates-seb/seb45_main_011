package com.growstory.domain.account.service;

import com.growstory.domain.account.dto.AccountDto;
import com.growstory.domain.account.repository.AccountRepository;
import com.growstory.domain.point.service.PointService;
import com.growstory.domain.stubdata.TestStubData;
import com.growstory.global.auth.utils.AuthUserUtils;
import com.growstory.global.auth.utils.CustomAuthorityUtils;
import com.growstory.global.aws.service.S3Uploader;
import com.growstory.global.exception.BusinessLogicException;
import org.junit.jupiter.api.*;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.HashMap;
import java.util.Map;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.is;
import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.BDDMockito.*;

@ExtendWith(MockitoExtension.class)
public class AccountServiceTest {
    private static final String ACCOUNT_IMAGE_PROCESS_TYPE = "profiles";

    @InjectMocks // @Mock으로 만들어진 객체를 의존성 주입받는 객체
    private AccountService accountService;
    @Mock
    private PasswordEncoder passwordEncoder;
    @Mock
    private CustomAuthorityUtils authorityUtils;
    @Mock
    private PointService pointService;
    @Mock
    private S3Uploader s3Uploader;
    @Mock
    private AuthUserUtils authUserUtils;
    @Mock
    private Authentication authentication;
    private AutoCloseable autoCloseable;
    @Mock
    private AccountRepository accountRepository;

    @BeforeEach
    void init() {
        //테스트 클래스 내의 @Mock 어노테이션을 사용하여 선언한 Mock 객체 초기화 및 주입
        autoCloseable = MockitoAnnotations.openMocks(this);

        // 모킹된 Authentication 객체를 SecurityContext에 설정
        SecurityContext securityContext = mock(SecurityContext.class);
        SecurityContextHolder.setContext(securityContext);
        when(securityContext.getAuthentication()).thenReturn(authentication);
    }

    @AfterEach
    void tearDown() throws Exception {
        autoCloseable.close();
    }

    @Test
    @DisplayName("회원가입")
    public void createAccountTest() {
        // given
        AccountDto.Post requestDto = AccountDto.Post.builder()
                .email("user@gmail.com")
                .displayName("user1")
                .password("user1234")
                .build();

        // when


        // then
    }

    @DisplayName("isAuthIdMatching 테스트 : 인증되지 않은 사용자")
    @Test
    public void testIsAuthIdMatchingWhenNotAuthenticated() {
        //given
//        Map<String, Object> claims = new HashMap<>();
        //when
        given(authentication.getName()).willReturn(null);
//        given(authentication.getPrincipal()).willReturn(claims);
        Throwable actualException = assertThrows(BusinessLogicException.class,
                () -> accountService.isAuthIdMatching(1L));
        BusinessLogicException exception = assertThrows(BusinessLogicException.class,
                () -> accountService.isAuthIdMatching(1L));
        int httpStatusCode = exception.getExceptionCode().getStatus();

        //then
        assertThat(actualException.getClass(), is(BusinessLogicException.class));
        assertThat(httpStatusCode, is(401));
    }

    @DisplayName("isAuthIdMatching 테스트 : 익명 객체 사용자")
    @Test
    public void testIsAuthIdMatchingWithAnonymousUser() {
        //when
        given(authentication.getName()).willReturn("anonymousUser");
        BusinessLogicException exception = assertThrows(BusinessLogicException.class,
                () -> accountService.isAuthIdMatching(1L));
        int httpStatusCode = exception.getExceptionCode().getStatus();

        //then
        assertThat(exception.getClass(), is(BusinessLogicException.class));
        assertThat(httpStatusCode, is(401));
    }

    @DisplayName("isAuthIdMatching 테스트 : 사용자가 다를 경우")
    @Test
    public void testIsAuthIdMatchingWithDifferentUser() {
        //given
        Map<String, Object> claims = new HashMap<>();
        claims.put("accountId", 999);
        //when
        given(authentication.getName()).willReturn("SeungTaeLee");
        given(authentication.getPrincipal()).willReturn(claims);

        BusinessLogicException exception = assertThrows(BusinessLogicException.class,
                () -> accountService.isAuthIdMatching(1L));
        int httpStatusCode = exception.getExceptionCode().getStatus();

        //then
        assertThat(exception.getClass(), is(BusinessLogicException.class));
        assertThat(httpStatusCode, is(405));
    }
}
