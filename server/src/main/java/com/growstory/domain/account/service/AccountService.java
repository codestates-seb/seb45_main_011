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
import com.growstory.global.exception.ExceptionCode;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@Transactional
@Service
@RequiredArgsConstructor
public class AccountService {
    private final AccountRepository accountRepository;
    private final PasswordEncoder passwordEncoder;
    private final CustomAuthorityUtils authorityUtils;
    private final PointService pointService;
    private final S3Uploader s3Uploader;
    private final AuthUserUtils authUserUtils;

    public AccountDto.Response createAccount(AccountDto.Post requestDto, MultipartFile profileImage) {
        verifyExistsEmail(requestDto.getEmail());

        String encryptedPassword = passwordEncoder.encode(requestDto.getPassword());
        String profileImageUrl = s3Uploader.uploadImageToS3(profileImage);
        List<String> roles = authorityUtils.createRoles(requestDto.getEmail());

        Account savedAccount = accountRepository.save(Account.builder()
                .displayName(requestDto.getDisplayName())
                .email(requestDto.getEmail())
                .password(encryptedPassword)
                .profileImageUrl(profileImageUrl)
                .point(pointService.createPoint("register"))
                .roles(roles)
                .build()
        );

        return AccountDto.Response.builder()
                .accountId(savedAccount.getAccountId())
                .displayName(savedAccount.getDisplayName())
                .profileImageUrl(savedAccount.getProfileImageUrl())
                .point(savedAccount.getPoint())
                .build();
    }

    public void updateProfileImage(MultipartFile profileImage) {
        Account findAccount = findVerifiedAccount();

        String profileImageUrl = s3Uploader.uploadImageToS3(profileImage);

        accountRepository.save(findAccount.toBuilder()
                .profileImageUrl(profileImageUrl)
                .build());
    }

    public void updateDisplayName(AccountDto.DisplayNamePatch displayNamePatchDto) {
        Account findAccount = findVerifiedAccount();

        accountRepository.save(findAccount.toBuilder()
                .displayName(displayNamePatchDto.getDisplayName())
                .build());
    }

    public void updatePassword(AccountDto.PasswordPatch passwordPatchDto) {
        Account findAccount = findVerifiedAccount();

        String encryptedPresentPassword = passwordEncoder.encode(passwordPatchDto.getPresentPassword());
        String encryptedChangedPassword = passwordEncoder.encode(passwordPatchDto.getChangedPassword());

        if (!findAccount.getPassword().equals(encryptedPresentPassword)) throw new BadCredentialsException("현재 비밀번호가 일치하지 않습니다.");
        if (!findAccount.getPassword().equals(encryptedChangedPassword)) throw new BadCredentialsException("새로운 비밀번호와 현재 비밀번호가 일치합니다.");

        accountRepository.save(findAccount.toBuilder()
                .password(encryptedChangedPassword)
                .build());
    }

    @Transactional(readOnly = true)
    public AccountDto.Response getAccount() {
        Account findAccount = findVerifiedAccount();

        return AccountDto.Response.builder()
                .accountId(findAccount.getAccountId())
                .displayName(findVerifiedAccount().getDisplayName())
                .profileImageUrl(findAccount.getProfileImageUrl())
                .point(findAccount.getPoint())
                .build();
    }

    public void deleteAccount() {
        Account findAccount = findVerifiedAccount();
        accountRepository.delete(findAccount);
    }

    @Transactional(readOnly = true)
    public Account findVerifiedAccount() {
        Map<String, Object> principal = (Map<String, Object>) authUserUtils.getAuthUser();

        return accountRepository.findById((Long) principal.get("accountId")).orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.ACCOUNT_NOT_FOUND));
    }

    private void verifyExistsEmail(String email) {
        Optional<Account> findAccount = accountRepository.findByEmail(email);
        if(findAccount.isPresent())
            throw new BusinessLogicException(ExceptionCode.ACCOUNT_ALREADY_EXISTS);
    }

    public void isAccountIdMatching(Long accountId) {
        Map<String, Object> claims = (Map<String, Object>) authUserUtils.getAuthUser();
        if ((Long) claims.get("accountId") != accountId)
            throw new BusinessLogicException(ExceptionCode.ACCOUNT_NOT_ALLOW);
    }

    public void buy(Account account, int price) {
        Point accountPoint = account.getPoint();
        int userPointScore = account.getPoint().getScore();
        if(price > userPointScore) {
            return;
        } else { // price <= this.point.getScore()
            int updatedScore = accountPoint.getScore()-price;
//            point.toBuilder().score(updatedScore).build(); //🔥 [refact] 더티체킹 여부 체크
//            account.toBuilder().point(point); //🔥 [refact] 필요?
            accountPoint.updateScore(updatedScore);
            account.updatePoint(accountPoint);
        }
    }
}
