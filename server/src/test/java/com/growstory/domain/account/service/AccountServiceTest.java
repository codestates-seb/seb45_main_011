package com.growstory.domain.account.service;

import com.growstory.domain.account.dto.AccountDto;
import com.growstory.domain.account.repository.AccountRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

@ExtendWith(MockitoExtension.class)
public class AccountServiceTest {
    @Mock
    private AccountRepository accountRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

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
                .email("user@gmail.com")
                .displayName("user1")
                .password("user1234")
                .build();

        // when


        // then

    }
}
