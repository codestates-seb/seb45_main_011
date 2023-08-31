package com.growstory.domain.account.service;

import com.growstory.domain.account.dto.AccountDto;
import com.growstory.domain.account.entity.Account;
import com.growstory.domain.account.repository.AccountRepository;
import com.growstory.domain.point.service.PointService;
import com.growstory.global.auth.utils.CustomAuthorityUtils;
import com.growstory.global.exception.BusinessLogicException;
import com.growstory.global.exception.ExceptionCode;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Transactional
@Service
@RequiredArgsConstructor
public class AccountService {
    private final AccountRepository accountRepository;
    private final PasswordEncoder passwordEncoder;
    private final CustomAuthorityUtils authorityUtils;
    private final PointService pointService;

    public AccountDto.Response createAccount(AccountDto.Post requestDto) {
        verifyExistsEmail(requestDto.getEmail());

        String encryptedPassword = passwordEncoder.encode(requestDto.getPassword());
        List<String> roles = authorityUtils.createRoles(requestDto.getEmail());

        Account savedAccount = accountRepository.save(Account.builder()
                .displayName(requestDto.getDisplayName())
                .email(requestDto.getEmail())
                .password(encryptedPassword)
                .profileImageUrl(requestDto.getProfileImageUrl())
                .point(pointService.createPoint("register"))
                .roles(roles)
                .build()
        );

        return AccountDto.Response.builder()
                .displayName(savedAccount.getDisplayName())
                .profileImageUrl(savedAccount.getProfileImageUrl())
                .point(savedAccount.getPoint())
                .build();
    }

    private void verifyExistsEmail(String email) {
        Optional<Account> findAccount = accountRepository.findByEmail(email);
        if(findAccount.isPresent())
            throw new BusinessLogicException(ExceptionCode.ACCOUNT_ALREADY_EXISTS);
    }
}
