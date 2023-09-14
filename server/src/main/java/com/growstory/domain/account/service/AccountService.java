package com.growstory.domain.account.service;

import com.growstory.domain.account.dto.AccountDto;
import com.growstory.domain.account.entity.Account;
import com.growstory.domain.account.repository.AccountRepository;
import com.growstory.domain.board.entity.Board;
import com.growstory.domain.images.entity.BoardImage;
import com.growstory.domain.point.entity.Point;
import com.growstory.domain.point.service.PointService;
import com.growstory.global.auth.utils.AuthUserUtils;
import com.growstory.global.auth.utils.CustomAuthorityUtils;
import com.growstory.global.aws.service.S3Uploader;
import com.growstory.global.exception.BusinessLogicException;
import com.growstory.global.exception.ExceptionCode;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Transactional
@Service
@RequiredArgsConstructor
public class AccountService {
    private static final String ACCOUNT_IMAGE_PROCESS_TYPE = "profiles";

    private final AccountRepository accountRepository;
    private final PasswordEncoder passwordEncoder;
    private final CustomAuthorityUtils authorityUtils;
    private final PointService pointService;
    private final S3Uploader s3Uploader;
    private final AuthUserUtils authUserUtils;

    public AccountDto.Response createAccount(AccountDto.Post accountPostDto) {
        verifyExistsEmail(accountPostDto.getEmail());

        String encryptedPassword = passwordEncoder.encode(accountPostDto.getPassword());
        List<String> roles = authorityUtils.createRoles(accountPostDto.getEmail());
        Point point = pointService.createPoint(accountPostDto.getEmail());

        Account savedAccount = accountRepository.save(Account.builder()
                .displayName(accountPostDto.getDisplayName())
                .email(accountPostDto.getEmail())
                .password(encryptedPassword)
                .point(point)
                .roles(roles)
                .accountGrade(Account.AccountGrade.GRADE_BRONZE)
                .build());

        point.updateAccount(savedAccount);

        return AccountDto.Response.builder()
                .accountId(savedAccount.getAccountId())
                .build();
    }

    public void updateProfileImage(MultipartFile profileImage) {
        Account findAccount = authUserUtils.getAuthUser();

        Optional.ofNullable(findAccount.getProfileImageUrl()).ifPresent(profileImageUrl ->
                s3Uploader.deleteImageFromS3(profileImageUrl, ACCOUNT_IMAGE_PROCESS_TYPE));

        accountRepository.save(findAccount.toBuilder()
                .profileImageUrl(s3Uploader.uploadImageToS3(profileImage, ACCOUNT_IMAGE_PROCESS_TYPE))
                .build());
    }

    public void updateDisplayName(AccountDto.DisplayNamePatch displayNamePatchDto) {
        Account findAccount = authUserUtils.getAuthUser();

        accountRepository.save(findAccount.toBuilder()
                .displayName(displayNamePatchDto.getDisplayName())
                .build());
    }

    public void updatePassword(AccountDto.PasswordPatch passwordPatchDto) {
        Account findAccount = authUserUtils.getAuthUser();

        String encryptedChangedPassword = passwordEncoder.encode(passwordPatchDto.getChangedPassword());

        if (!passwordEncoder.matches(passwordPatchDto.getPresentPassword(), findAccount.getPassword()))
            throw new BadCredentialsException("현재 비밀번호가 일치하지 않습니다.");

        if (findAccount.getPassword().equals(encryptedChangedPassword))
            throw new BadCredentialsException("새로운 비밀번호와 현재 비밀번호가 일치합니다.");

        accountRepository.save(findAccount.toBuilder()
                .password(encryptedChangedPassword)
                .build());
    }

    @Transactional(readOnly = true)
    public AccountDto.Response getAccount(Long accountId) {
        Account findAccount = findVerifiedAccount(accountId);

        return getAccountResponse(findAccount);
    }

    @Transactional(readOnly = true)
    public List<AccountDto.Response> getAccounts() {
        List<Account> accounts = accountRepository.findAll();

        return accounts.stream()
                .map(AccountService::getAccountResponse)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public Page<AccountDto.BoardResponse> getAccountBoardWritten(int page, int size, Long accountId) {
        Account findAccount = findVerifiedAccount(accountId);
        List<AccountDto.BoardResponse> boardWrittenList = findAccount.getBoards().stream()
                                                .map(AccountService::getBoardResponse)
                                                .collect(Collectors.toList());
        int startIdx = page * size;
        int endIdx = Math.min(boardWrittenList.size(), (page + 1) * size);
        return new PageImpl<>(boardWrittenList.subList(startIdx, endIdx), PageRequest.of(page, size), boardWrittenList.size());
    }

    @Transactional(readOnly = true)
    public Page<AccountDto.BoardResponse> getAccountBoardLiked(int page, int size, Long accountId) {
        Account findAccount = findVerifiedAccount(accountId);
        List<AccountDto.BoardResponse> boardLikedList = findAccount.getBoardLikes().stream()
                .map(boardLike -> getBoardResponse(boardLike.getBoard()))
                .collect(Collectors.toList());

        int startIdx = page * size;
        int endIdx = Math.min(boardLikedList.size(), (page + 1) * size);
        return new PageImpl<>(boardLikedList.subList(startIdx, endIdx), PageRequest.of(page, size), boardLikedList.size());
    }

    @Transactional(readOnly = true)
    public Page<AccountDto.BoardResponse> getAccountCommentWrittenBoard(int page, int size, Long accountId) {
        Account findAccount = findVerifiedAccount(accountId);
        List<AccountDto.BoardResponse> commentWrittenBoardList = findAccount.getComments().stream()
                .map(comment -> getBoardResponse(comment.getBoard()))
                .distinct()
                .collect(Collectors.toList());

        int startIdx = page * size;
        int endIdx = Math.min(commentWrittenBoardList.size(), (page + 1) * size);
        return new PageImpl<>(commentWrittenBoardList.subList(startIdx, endIdx), PageRequest.of(page, size), commentWrittenBoardList.size());
    }

    public void deleteAccount() {
        Account findAccount = authUserUtils.getAuthUser();

        Optional.ofNullable(findAccount.getProfileImageUrl()).ifPresent(profileImageUrl ->
                s3Uploader.deleteImageFromS3(profileImageUrl, ACCOUNT_IMAGE_PROCESS_TYPE));

        accountRepository.delete(findAccount);
    }

    public Boolean verifyPassword(AccountDto.PasswordVerify passwordVerifyDto) {
        Account findAccount = authUserUtils.getAuthUser();

        return passwordEncoder.matches(passwordVerifyDto.getPassword(), findAccount.getPassword());
    }

    private void verifyExistsEmail(String email) {
        Optional<Account> findAccount = accountRepository.findByEmail(email);

        if(findAccount.isPresent())
            throw new BusinessLogicException(ExceptionCode.ACCOUNT_ALREADY_EXISTS);
    }

    @Transactional(readOnly = true)
    public Account findVerifiedAccount(Long accountId) {
        return accountRepository.findById(accountId).orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.ACCOUNT_NOT_FOUND));
    }

    public void isAuthIdMatching(Long accountId) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Map<String, Object> claims = (Map<String, Object>) authentication.getPrincipal();

        // 사용자가 인증되지 않거나 익명인지 확인하고 그렇다면 401 예외 던지기
        if (authentication.getName() == null || authentication.getName().equals("anonymousUser")) {
            throw new BusinessLogicException(ExceptionCode.ACCOUNT_UNAUTHORIZED);
        }

        // 사용자가 일치하지 않으면 405 예외 던지기
        if (Long.valueOf((Integer) claims.get("accountId")) != accountId)
            throw new BusinessLogicException(ExceptionCode.ACCOUNT_NOT_ALLOW);
    }

    private static AccountDto.Response getAccountResponse(Account findAccount) {
        return AccountDto.Response.builder()
                .accountId(findAccount.getAccountId())
                .email(findAccount.getEmail())
                .displayName(findAccount.getDisplayName())
                .profileImageUrl(findAccount.getProfileImageUrl())
                .grade(findAccount.getAccountGrade().getStepDescription())
                .point(findAccount.getPoint())
                .build();
    }

    private static AccountDto.BoardResponse getBoardResponse(Board board) {
        return AccountDto.BoardResponse.builder()
                .boardId(board.getBoardId())
                .title(board.getTitle())
                .imageUrls(board.getBoardImages().stream()
                        .map(BoardImage::getStoredImagePath)
                        .collect(Collectors.toList()))
                .likes(board.getBoardLikes().stream()
                        .map(boardLike -> boardLike.getAccount().getAccountId())
                        .collect(Collectors.toList()))
                .commentNums(board.getBoardComments().size())
                .build();
    }
}
