package com.growstory.domain.account.service;

import com.growstory.domain.account.constants.AccountGrade;
import com.growstory.domain.account.constants.Status;
import com.growstory.domain.account.dto.AccountDto;
import com.growstory.domain.account.entity.Account;
import com.growstory.domain.account.repository.AccountRepository;
import com.growstory.domain.alarm.constants.AlarmType;
import com.growstory.domain.alarm.service.AlarmService;
import com.growstory.domain.board.entity.Board;
import com.growstory.domain.guest.service.GuestService;
import com.growstory.domain.images.entity.BoardImage;
import com.growstory.domain.leaf.entity.Leaf;
import com.growstory.domain.plant_object.dto.PlantObjDto;
import com.growstory.domain.plant_object.entity.PlantObj;
import com.growstory.domain.point.entity.Point;
import com.growstory.domain.point.service.PointService;
import com.growstory.global.auth.utils.AuthUserUtils;
import com.growstory.global.auth.utils.CustomAuthorityUtils;
import com.growstory.global.aws.service.S3Uploader;
import com.growstory.global.email.service.EmailService;
import com.growstory.global.exception.BusinessLogicException;
import com.growstory.global.exception.ExceptionCode;
import com.growstory.global.sse.service.SseService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.*;
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
    private final SseService sseService;
    private final AlarmService alarmService;
    private final EmailService emailService;

    // Guest
    private final GuestService guestService;

    public AccountDto.Response createAccount(AccountDto.Post requestDto) {
        if (verifyExistsEmail(requestDto.getEmail())) {
            throw new BusinessLogicException(ExceptionCode.ACCOUNT_ALREADY_EXISTS);
        }

        Status status = Status.USER;
        String encryptedPassword = passwordEncoder.encode(requestDto.getPassword());
        List<String> roles = authorityUtils.createRoles(requestDto.getEmail());
        Point point = pointService.createPoint(requestDto.getEmail());

        //TODO: if admin@gmail.com 일때 status.admin 추가
        if (requestDto.getEmail().equals("admin@gmail.com")) status = Status.ADMIN;

        Account savedAccount = accountRepository.save(Account.builder()
                .displayName(requestDto.getDisplayName())
                .email(requestDto.getEmail())
                .password(encryptedPassword)
                .point(point)
                .roles(roles)
                .status(status)
                .accountGrade(AccountGrade.GRADE_BRONZE)
                .build());

        point.updateAccount(savedAccount);
        alarmService.createAlarm(savedAccount.getAccountId(), AlarmType.SIGN_UP);

        return AccountDto.Response.builder()
                .accountId(savedAccount.getAccountId())
                .build();
    }

    public AccountDto.Response createAccount() {
        Status status = Status.GUEST_USER;
        List<String> roles = authorityUtils.createRoles(" ");       // TODO: security 권한(디비에 저장되는지 실험해보기
        Point point = pointService.createPoint("guest");
        String encryptedPassword = passwordEncoder.encode("gs123!@#");

        // Save Account
        Account savedAccount = accountRepository.save(Account.builder()
                // Guest Email:  guest+8자리 난수@gmail.com
                .email("guest" + emailService.getAuthCode() + "@gmail.com")
                .password(encryptedPassword)
                // DisplayName: Guest + 8자리 난수
                .displayName("Guest" + emailService.getAuthCode())
                .leaves(new ArrayList<>())
                .plantObjs(new ArrayList<>())
                .point(point)
                .roles(roles)
                .status(status)
                .accountGrade(AccountGrade.GRADE_BRONZE)
                .build());

        // Update Point
        point.updateAccount(savedAccount);

        // 식물 카드
        Leaf leafA = guestService.createGuestLeaf(savedAccount, "귀염둥이 니드몬","사막에서 공수한 선인장입니다.", "https://growstory.s3.ap-northeast-2.amazonaws.com/image/guest/leaves/cactus-1842095_1280.jpg");
        Leaf leafB = guestService.createGuestLeaf(savedAccount, "가시나","예쁜 선인장이에요!! ", "https://growstory.s3.ap-northeast-2.amazonaws.com/image/guest/leaves/cactus-5434469_1280.jpg");

        // 일지 각각의 image S3에 업로드 후 imageUrl 반환
        guestService.createGuestJournal(leafA, "니드몬 성장일기 1일차", "물 주기", null);
        guestService.createGuestJournal(leafA, "니드몬 성장일기 2일차", "칭찬해 주기", null);
        guestService.createGuestJournal(leafA, "니드몬 성장일기 3일차", "햇빛 쫴기", null);
        guestService.createGuestJournal(leafA, "니드몬 성장일기 4일차", "병원 가는 날", null);
        guestService.createGuestJournal(leafA, "니드몬 성장일기 5일차", "물 주기", null);
        guestService.createGuestJournal(leafA, "니드몬 성장일기 6일차", "영양 거름 주기", null);
        guestService.createGuestJournal(leafA, "니드몬 성장일기 7일차", "분갈이", null);
        guestService.createGuestJournal(leafA, "니드몬 성장일기 8일차", "물 주기", null);
        guestService.createGuestJournal(leafA, "니드몬 성장일기 9일차", "칭찬해 주기", null);
        guestService.createGuestJournal(leafA, "니드몬 성장일기 10일차", "물 주기", null);

        // Buy Garden Object
        PlantObjDto.TradeResponse plantObjA = guestService.buyProduct(savedAccount, 1L);    // 벽돌 유적
        guestService.buyProduct(savedAccount, 2L);    // 콜로세움
        guestService.buyProduct(savedAccount, 3L);    // 잊혀진 연구소
        guestService.buyProduct(savedAccount, 4L);    // 대리석 신전
        PlantObjDto.TradeResponse plantObjB = guestService.buyProduct(savedAccount, 5L);    // 벚나무


        // Batch Garden Object
        // 벽돌 유적(2x2): (6, 5)
        // 벚나무(1x1): (3, 3)
        guestService.saveLocation(plantObjA.getPlantObj(), plantObjB.getPlantObj());



        // Connect Garden Object and Plants Card
        // 식물 카드 A와 벽돌 유적 오브젝트 연결
        guestService.updateLeafConnection(1L, leafA.getLeafId());

        return AccountDto.Response.builder()
                .accountId(savedAccount.getAccountId())
                .email(savedAccount.getEmail())
                .displayName("Guest")
                .status(status.getStepDescription())
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

    public void updateDisplayName(AccountDto.DisplayNamePatch requestDto) {
        Account findAccount = authUserUtils.getAuthUser();

        accountRepository.save(findAccount.toBuilder()
                .displayName(requestDto.getDisplayName())
                .build());
    }

    public void updatePassword(AccountDto.PasswordPatch requestDto) {
        Account findAccount = authUserUtils.getAuthUser();

        String encryptedChangedPassword = passwordEncoder.encode(requestDto.getChangedPassword());

        if (!passwordEncoder.matches(requestDto.getPresentPassword(), findAccount.getPassword()))
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
                .distinct() // 같은 게시글 중복 제거
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


    // 게스트 용 v1/accounts/{account-id}
    public void deleteAccount(Long id) {
        Account findAccount = findVerifiedAccount(id);

        accountRepository.delete(findAccount);
    }

    // 출석 체크
    public void attendanceCheck(Account account) {
        if (!account.getAttendance()) {
            account.updatePoint(pointService.updatePoint(account.getPoint(), "login"));
            account.updateAttendance(true);
            accountRepository.save(account);

            sseService.notify(account.getAccountId(), AlarmType.DAILY_LOGIN);
        }
    }

    // 자정에 초기화
    @Scheduled(cron = "0 0 0 * * *")
    public void attendanceReset() {
        accountRepository.findAll()
                .forEach(account -> account.updateAttendance(false));
    }

    public Boolean verifyPassword(AccountDto.PasswordVerify requestDto) {
        Account findAccount = authUserUtils.getAuthUser();

        return passwordEncoder.matches(requestDto.getPassword(), findAccount.getPassword());
    }

    public Boolean verifyExistsEmail(String email) { // 입력받은 이메일의 계정이 이미 존재한다면 true
        Optional<Account> findAccount = accountRepository.findByEmail(email);

        return findAccount.isPresent();
    }

    @Transactional(readOnly = true)
    public Account findVerifiedAccount(Long accountId) {
        return accountRepository.findById(accountId).orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.ACCOUNT_NOT_FOUND));
    }

    //TODO: 리팩토링 -> AuthUserUtil
    public void isAuthIdMatching(Long accountId) {
        Authentication authentication = null;
        Map<String, Object> claims = null;
        try {
            authentication = SecurityContextHolder.getContext().getAuthentication();
            claims = (Map<String, Object>) authentication.getPrincipal();
        } catch (Exception e) {
            throw new BusinessLogicException(ExceptionCode.ACCOUNT_NOT_FOUND);
        }

        // 사용자가 인증되지 않거나 익명인지 확인하고 그렇다면 401 예외 던지기
        if (authentication.getName() == null || authentication.getName().equals("anonymousUser")) {
            throw new BusinessLogicException(ExceptionCode.ACCOUNT_UNAUTHORIZED);
        }

        // 사용자가 일치하지 않으면 405 예외 던지기
        if (!(Long.valueOf((String) claims.get("accountId"))).equals(accountId)) {
            throw new BusinessLogicException(ExceptionCode.ACCOUNT_NOT_ALLOW);
        }
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
