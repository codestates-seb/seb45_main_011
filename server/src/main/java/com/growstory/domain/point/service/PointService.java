package com.growstory.domain.point.service;

import com.growstory.domain.point.entity.Point;
import com.growstory.domain.point.repository.PointRepository;
import com.growstory.global.exception.BusinessLogicException;
import com.growstory.global.exception.ExceptionCode;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Transactional
@Service
@RequiredArgsConstructor
public class PointService {
    @Value("${mail.admin.address}")
    private String adminMailAddress;

    private static final int ADMIN_POINT = 100000000;
    private static final int REGISTER_POINT = 500; // 회원 가입시 지급 포인트
    private static final int POSTING_POINT = 30; // 게시글 등록시 지급 포인트
    private static final int DAILY_LOGIN_POINT = 10; // 일일 로그인시 지급 포인트 (출석 체크 창이나 버튼이 필요, 로그인을 지속하며 날짜가 갱신되었을 때 판별이 어려워보임)
    private static final int JOURNAL_WRITTEN_POINT = 10; // 저널 작성 포인트


    private final PointRepository pointRepository;

    public Point createPoint(String email) {
        // pointRepo.save 없이 account의 cascade로 자동 저장됨(account가 삭제되면 자동 삭제)
        if (email.equals(adminMailAddress))
            return Point.builder()
                .score(ADMIN_POINT)
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

        return pointRepository.save(presentPoint.toBuilder()
                .score(presentPoint.getScore() + updateScore)
                .build());
    }
}
