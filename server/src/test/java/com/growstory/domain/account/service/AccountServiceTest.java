package com.growstory.domain.account.service;

import com.growstory.domain.account.dto.AccountDto;
import com.growstory.domain.account.entity.Account;
import com.growstory.domain.account.repository.AccountRepository;
import com.growstory.domain.point.entity.Point;
import com.growstory.domain.point.service.PointService;
import com.growstory.global.auth.utils.CustomAuthorityUtils;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.List;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.*;
import static org.mockito.BDDMockito.given;
import static org.mockito.BDDMockito.willDoNothing;


@ExtendWith(MockitoExtension.class)
public class AccountServiceTest {
    @Mock
    private AccountRepository accountRepository;

    @Mock
    private static PasswordEncoder passwordEncoder;

    @Mock
    private static CustomAuthorityUtils authorityUtils;

    @Mock
    private static PointService pointService;

    @InjectMocks // @Mock으로 만들어진 객체를 의존성 주입받는 객체
    private AccountService accountService;

    @BeforeEach
    public void init() {

    }

    @Test
    @DisplayName("회원가입")
    public void createAccountTest() {
        // given
        AccountDto.Post requestDto = AccountDto.Post.builder()
                .email("user1@gmail.com")
                .displayName("user1")
                .password("user1234")
                .build();

        List<String> roles = List.of("USER");
        Point point = Point.builder().score(500).build();

        given(passwordEncoder.encode(Mockito.anyString()))
                .willReturn(requestDto.getPassword());

        given(authorityUtils.createRoles(Mockito.anyString()))
                .willReturn(roles);

        given(pointService.createPoint(Mockito.anyString()))
                .willReturn(point);

        Account savedAccount = getAccount(1L, requestDto.getEmail(), requestDto.getDisplayName(),
                requestDto.getPassword(), point, roles, Account.AccountGrade.GRADE_BRONZE);

        given(accountRepository.save(Mockito.any(Account.class)))
                .willReturn(savedAccount);

        // when
        AccountDto.Response responseDto = accountService.createAccount(requestDto);

        // then
//        assertThat(re);

    }

    private static Account getAccount(Long accountId, String email, String displayName, String password, Point point, List<String> roles, Account.AccountGrade accountGrade) {
        return Account.builder()
                .accountId(accountId)
                .email(email)
                .displayName(displayName)
                .password(passwordEncoder.encode(password))
                .point(point)
                .roles(roles)
                .accountGrade(accountGrade)
                .build();
    }
}
