package com.growstory.domain.account.service;

import com.growstory.domain.account.dto.AccountDto;
import com.growstory.domain.account.entity.Account;
import com.growstory.domain.account.repository.AccountRepository;
import com.growstory.domain.point.entity.Point;
import com.growstory.domain.point.service.PointService;
import com.growstory.global.auth.utils.AuthUserUtils;
import com.growstory.global.auth.utils.CustomAuthorityUtils;
import com.growstory.global.aws.service.S3Uploader;
import com.growstory.global.exception.BusinessLogicException;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.io.FileInputStream;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

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
    private CustomAuthorityUtils customAuthorityUtils;
    @Mock
    private PointService pointService;
    @Mock
    private S3Uploader s3Uploader;
    @Mock
    private AuthUserUtils authUserUtils;
    @Mock
    private static Authentication authentication;
    private AutoCloseable autoCloseable;
    @Mock
    private AccountRepository accountRepository;
    @Mock
    private static SecurityContext securityContext = mock(SecurityContext.class);
    @Mock
    private Point point = mock(Point.class);

    @Nested
    class 회원가입 {
        AccountDto.Post requestDto = AccountDto.Post.builder()
                .email("user@gmail.com")
                .displayName("user1")
                .password("user1234")
                .build();
        List<String> roles = List.of("USER");

        @Test
        public void 중복된_이메일이_아니라면_회원가입_성공() {
            // given
            given(accountRepository.findByEmail(Mockito.anyString()))
                    .willReturn(Optional.empty());

            given(passwordEncoder.encode(Mockito.anyString()))
                    .willReturn(requestDto.getPassword());
            given(customAuthorityUtils.createRoles(Mockito.anyString()))
                    .willReturn(roles);
            given(pointService.createPoint(Mockito.anyString()))
                    .willReturn(point);

            Account savedAccount = getAccount(1L, requestDto.getEmail(), requestDto.getDisplayName(),
                    requestDto.getPassword(), "path", point, roles, Account.AccountGrade.GRADE_BRONZE);

            given(accountRepository.save(Mockito.any(Account.class)))
                    .willReturn(savedAccount);

            willDoNothing().given(point).updateAccount(Mockito.any(Account.class));

            // when
            AccountDto.Response responseDto = accountService.createAccount(requestDto);

            // then
            assertThat(responseDto.getAccountId(), is(savedAccount.getAccountId()));
        }

        @Test
        public void 중복된_이메일이라면_회원가입_실패() {
            // given
            given(accountRepository.findByEmail(Mockito.anyString()))
                    .willReturn(Optional.of(Account.builder().build()));

            // when, then
            BusinessLogicException exception = assertThrows(BusinessLogicException.class,
                    () -> accountService.createAccount(requestDto));
            assertThat(exception.getExceptionCode().getStatus(), is(409));
            assertThat(exception.getExceptionCode().getMessage(), is("Account already exists"));
        }
    }

    @Nested
    class 이미지_수정 {
        MockMultipartFile testImage = new MockMultipartFile("profileImage",
                "testImage.jpg",
                "jpg",
                new FileInputStream("src/test/resources/images/testImage.jpg"));

        Account account = getAccount(1L, "user1@gmail.com", "user1",
                "user1234", "image/path", Point.builder().build(),
                List.of("USER"), Account.AccountGrade.GRADE_BRONZE);
        String s3ImageUrl = "s3/path";

        이미지_수정() throws IOException {
        }

        private void uploadImage() {
            given(s3Uploader.uploadImageToS3(Mockito.any(MockMultipartFile.class), Mockito.anyString()))
                    .willReturn(s3ImageUrl);
            given(accountRepository.save(Mockito.any(Account.class)))
                    .willReturn(account.toBuilder().profileImageUrl(s3ImageUrl).build());
        }

        @Test
        public void 기존_이미지가_존재할_때() {
            given(authUserUtils.getAuthUser()).willReturn(account);

            willDoNothing().given(s3Uploader).deleteImageFromS3(Mockito.anyString(), Mockito.anyString());

            uploadImage();

            // when
            accountService.updateProfileImage(testImage);

            // then
            verify(s3Uploader, times(1)).deleteImageFromS3(Mockito.anyString(), Mockito.anyString());
        }

        @Test
        public void 기존_이미지가_없을_때() {
            given(authUserUtils.getAuthUser())
                    .willReturn(account.toBuilder().profileImageUrl(null).build());

            uploadImage();

            // when
            accountService.updateProfileImage(testImage);

            // then
            verify(s3Uploader, times(0)).deleteImageFromS3(Mockito.anyString(), Mockito.anyString());
        }
    }


    @Nested
    class 사용자_검증 {

        @Test
        public void 로그인된_사용자가_입력과_동일할_때() {

        }
    }

    @DisplayName("isAuthIdMatching 테스트 : 입력과 동일한 사용자")
    @Test
    public void testIsAuthIdMatchingWithSameUser() {
        //given
        securityInit();
        Map<String, Object> claims = new HashMap<>();
        Long accountId = 1L;
        claims.put("accountId", 1);

        given(SecurityContextHolder.getContext().getAuthentication())
                .willReturn(authentication);
        given(authentication.getPrincipal())
                .willReturn(claims);

        given(authentication.getName())
                .willReturn("SeungTaeLee");

        //when, then
        assertDoesNotThrow(() -> accountService.isAuthIdMatching(accountId));
    }

    @DisplayName("isAuthIdMatching 테스트 : 인증되지 않은 사용자")
    @Test
    public void testIsAuthIdMatchingWhenNotAuthenticated() {
        //given
        securityInit();
        given(SecurityContextHolder.getContext().getAuthentication())
                .willReturn(authentication);
        given(authentication.getPrincipal())
                .willReturn(new HashMap<String, Object>());

        given(authentication.getName())
                .willReturn(null);

        //when, then
        Throwable exception = assertThrows(BusinessLogicException.class,
                () -> accountService.isAuthIdMatching(1L));
        assertThat(exception.getMessage(), is("Account unauthorized"));
    }

    @DisplayName("isAuthIdMatching 테스트 : 익명 객체 사용자")
    @Test
    public void testIsAuthIdMatchingWithAnonymousUser() {
        //given
        securityInit();
        given(SecurityContextHolder.getContext().getAuthentication())
                .willReturn(authentication);
        given(authentication.getPrincipal())
                .willReturn(new HashMap<String, Object>());

        given(authentication.getName())
                .willReturn("anonymousUser");

        //when, then
        Throwable exception = assertThrows(BusinessLogicException.class,
                () -> accountService.isAuthIdMatching(1L));
        assertThat(exception.getMessage(), is("Account unauthorized"));
    }

    @DisplayName("isAuthIdMatching 테스트 : 사용자가 다를 경우")
    @Test
    public void testIsAuthIdMatchingWithDifferentUser() {
        //given
        securityInit();
        Map<String, Object> claims = new HashMap<>();
        claims.put("accountId", 999);

        given(SecurityContextHolder.getContext().getAuthentication())
                .willReturn(authentication);
        given(authentication.getPrincipal())
                .willReturn(claims);

        given(authentication.getName())
                .willReturn("SeungTaeLee");

        //when, then
        Throwable exception = assertThrows(BusinessLogicException.class,
                () -> accountService.isAuthIdMatching(1L));
        assertThat(exception.getMessage(), is("That Account doesn't have authority"));
    }

    private static void securityInit() {
        SecurityContextHolder.setContext(securityContext);
        securityContext.setAuthentication(authentication);
    }

    private static Account getAccount(Long accountId, String email, String displayName, String password,
                                      String profileImageUrl, Point point, List<String> roles, Account.AccountGrade accountGrade) {
        return Account.builder()
                .accountId(accountId)
                .email(email)
                .displayName(displayName)
                .password(password)
                .profileImageUrl(profileImageUrl)
                .point(point)
                .roles(roles)
                .accountGrade(accountGrade)
                .build();
    }
}
