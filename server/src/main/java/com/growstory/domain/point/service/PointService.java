package com.growstory.domain.point.service;

import com.growstory.domain.account.entity.Account;
import com.growstory.domain.account.repository.AccountRepository;
import com.growstory.domain.account.service.AccountService;
import com.growstory.domain.point.entity.Point;
import com.growstory.domain.point.repository.PointRepository;
import com.growstory.global.exception.BusinessLogicException;
import com.growstory.global.exception.ExceptionCode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Transactional
@RequiredArgsConstructor
@Slf4j
@Service
public class PointService {
    @Value("${mail.admin.address}")
    private String adminMailAddress;

    @Value("${mail.guest}")
    private String guest;

    private static final int ADMIN_POINT = 100000000;
    private static final int GUEST_POINT = 12300;   // 게스트 시작 시 지급 포인트(10,000 + 2,300)
    private static final int REGISTER_POINT = 2500; // 회원 가입시 지급 포인트
    private static final int POSTING_POINT = 30; // 게시글 등록시 지급 포인트
    private static final int DAILY_LOGIN_POINT = 10; // 일일 로그인시 지급 포인트 (출석 체크 창이나 버튼이 필요, 로그인을 지속하며 날짜가 갱신되었을 때 판별이 어려워보임)
    private static final int JOURNAL_WRITTEN_POINT = 10; // 저널 작성 포인트


    @Value("${event.key}")
    private String EVENT_KEY;

    private final PointRepository pointRepository;
    private final AccountRepository accountRepository;

    public Point createPoint(String email) {
        // pointRepo.save 없이 account의 cascade로 자동 저장됨(account가 삭제되면 자동 삭제)
        if (email.equals(adminMailAddress))
            return Point.builder()
                .score(ADMIN_POINT)
                .build();
        if (email.equals(guest))
            return Point.builder()
                .score(GUEST_POINT)
                .build();

        return Point.builder()
                .score(REGISTER_POINT)
                .build();
    }

    public Point updatePoint(Point presentPoint, String type) {
        int score = 0;

        switch (type) {
            case "posting":
                score = POSTING_POINT;
                break;

            case "login":
                score = DAILY_LOGIN_POINT;
                break;

            case "journal":
                score = JOURNAL_WRITTEN_POINT;
                break;

            default:
                throw new BusinessLogicException(ExceptionCode.POINT_TYPE_NOT_FOUND);
        }

        return pointRepository.save(presentPoint.toBuilder()
                        .score(presentPoint.getScore() + score)
                        .build());
    }

    public Point updatePoint(Point presentPoint, int updateScore) {
        if(presentPoint == null)
            throw new BusinessLogicException(ExceptionCode.POINT_TYPE_NOT_FOUND);

        Account pointOwner = presentPoint.getAccount();
        log.info("# 포인트 획득자 : "+ pointOwner.getAccountId() +", " + pointOwner.getDisplayName());

        return pointRepository.save(presentPoint.toBuilder()
                .score(presentPoint.getScore() + updateScore)
                .build());
    }

    // 다중 이벤트 포인트 지급
    public void updateAllEventPoint(int updateScore, String eventKey) {
        if (check(eventKey)) return;

        List<Point> findPoints = pointRepository.findAll();
        findPoints
                .forEach(point -> updatePoint(point, updateScore));
    }

    // 특정 계정에 대한 이벤트 포인트 지급
    public void updateEventPoint(Long accountId, Integer updateScore, String eventKey) {
        if (check(eventKey)) return;
        Account findAccount = accountRepository.findById(accountId).get();
        updatePoint(findAccount.getPoint(), updateScore);
    }

    private boolean check(String eventKey) {
        if(!EVENT_KEY.equals(eventKey)) {
            log.info("eventError");
            return true;
        }
        return false;
    }
}
