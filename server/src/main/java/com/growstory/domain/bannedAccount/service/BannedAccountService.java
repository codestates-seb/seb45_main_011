package com.growstory.domain.bannedAccount.service;

import com.growstory.domain.account.constants.Status;
import com.growstory.domain.account.entity.Account;
import com.growstory.domain.bannedAccount.dto.BannedAccountDto;
import com.growstory.domain.bannedAccount.entity.BannedAccount;
import com.growstory.domain.bannedAccount.repository.BannedAccountRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Transactional
@RequiredArgsConstructor
@Service
public class BannedAccountService {
    private final BannedAccountRepository bannedAccountRepository;

    public void createBannedAccount(Account account, int suspendedDays) {
        account.updateStatus(Status.BANNED_USER);

        BannedAccount bannedAccount = bannedAccountRepository.save(BannedAccount.builder()
                .reportNums(account.getReportNums())
                .suspendedDate(LocalDateTime.now().plusDays(suspendedDays))
                .accountId(account.getAccountId())
                .build());
    }

    @Transactional(readOnly = true)
    public Page<BannedAccountDto.Response> getBannedAccounts(int page, int size) {
        List<BannedAccount> bannedAccounts = bannedAccountRepository.findAll();
        List<BannedAccountDto.Response> responses = bannedAccounts.stream()
                .map(bannedAccount -> BannedAccountDto.Response.builder()
                        .bannedAccountId(bannedAccount.getBannedAccountId())
                        .reportNums(bannedAccount.getReportNums())
                        .suspendedDate(bannedAccount.getSuspendedDate())
                        .createdAt(bannedAccount.getCreatedAt())
                        .accountId(bannedAccount.getAccountId())
                        .build())
                .collect(Collectors.toList());

        int startIdx = page * size;
        int endIdx = Math.min(responses.size(), (page + 1) * size);
        return new PageImpl<>(responses.subList(startIdx, endIdx), PageRequest.of(page, size), responses.size());
    }
}
