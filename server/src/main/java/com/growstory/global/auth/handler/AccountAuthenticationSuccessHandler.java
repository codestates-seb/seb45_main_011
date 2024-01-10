package com.growstory.global.auth.handler;

import com.growstory.domain.account.constants.Status;
import com.growstory.domain.account.entity.Account;
import com.growstory.domain.account.repository.AccountRepository;
import com.growstory.domain.account.service.AccountService;
import com.growstory.domain.bannedAccount.entity.BannedAccount;
import com.growstory.domain.bannedAccount.repository.BannedAccountRepository;
import com.growstory.global.exception.BusinessLogicException;
import com.growstory.global.exception.ExceptionCode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Map;
import java.util.Objects;
import java.util.stream.Collectors;

@Slf4j
@RequiredArgsConstructor
public class AccountAuthenticationSuccessHandler implements AuthenticationSuccessHandler {
    private final AccountRepository accountRepository;
    private final AccountService accountService;
    private final BannedAccountRepository bannedAccountRepository;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
                                        Authentication authentication) throws IOException, ServletException {
        log.info("# Authenticated successfully !");

        Account account = accountRepository.findById(((Account) authentication.getPrincipal()).getAccountId()).orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.ACCOUNT_NOT_FOUND));

        if (account.getStatus().getStepDescription().equals("BANNED_USER")) {
            chkSuspendedDays(account);
        }
        accountService.attendanceCheck(account);
    }

    private void chkSuspendedDays(Account account) {
        BannedAccount findBannedAccount = bannedAccountRepository.findAll().stream()
                .filter(bannedAccount -> Objects.equals(bannedAccount.getAccountId(), account.getAccountId()))
                .collect(Collectors.toList())
                .get(0);

        LocalDateTime now = LocalDateTime.now(ZoneId.of("Asia/Seoul"));

        // 정지가 끝났다면
        if (now.isAfter(findBannedAccount.getSuspendedDate())) {
            account.updateStatus(Status.USER);
            bannedAccountRepository.delete(findBannedAccount);
        }
    }
}
