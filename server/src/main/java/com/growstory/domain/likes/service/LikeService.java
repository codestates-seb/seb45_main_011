package com.growstory.domain.likes.service;

import com.growstory.domain.account.entity.Account;
import com.growstory.domain.account.repository.AccountRepository;
import com.growstory.domain.likes.entity.AccountLike;
import com.growstory.domain.likes.repository.AccountLikeRepository;
import com.growstory.global.auth.utils.AuthUserUtils;
import com.growstory.global.exception.BusinessLogicException;
import com.growstory.global.exception.ExceptionCode;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Transactional
@Service
@RequiredArgsConstructor
public class LikeService {
    private final AccountLikeRepository accountLikeRepository;
    private final AccountRepository accountRepository;
    private final AuthUserUtils authUserUtils;

    public void pressAccountLike(Long ownerAccountId) {
        Account findAccount = authUserUtils.getAuthUser(); // 좋아요 누른 사용자
        Account ownerAccount = accountRepository.findById(ownerAccountId).orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.ACCOUNT_NOT_FOUND));

        Optional<AccountLike> optionalAccountLike = ownerAccount.getAccountLikes().stream()
                .filter(accountLike -> accountLike.getAccount().getAccountId() == findAccount.getAccountId())
                .findAny();

        optionalAccountLike.ifPresentOrElse(accountLike -> {
            ownerAccount.getAccountLikes().remove(accountLike);
            ownerAccount.updateLikeNum(-1);
        }, () -> {
            ownerAccount.addAccountLike(AccountLike.builder()
                    .account(ownerAccount)
                    .build());
            ownerAccount.updateLikeNum(1);
        });


    }
}
