package com.growstory.domain.point.service;

import com.growstory.domain.point.entity.Point;
import com.growstory.domain.point.repository.PointRepository;
import com.growstory.global.exception.BusinessLogicException;
import com.growstory.global.exception.ExceptionCode;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Transactional
@Service
@RequiredArgsConstructor
public class PointService {
    private static final int REGISTER_POINT = 1000; // 회원가입시 지급 포인트
    private static final int POSTING_POINT = 100; // 게시글 등록시 지급 포인트

    private final PointRepository pointRepository;

    public Point createPoint(String type) {
        int score = 0;

        switch (type) {
            case "register":
                score = REGISTER_POINT;
                break;

            case "posting":
                score = POSTING_POINT;
                break;

            default:
                throw new BusinessLogicException(ExceptionCode.POINT_TYPE_NOT_FOUND);
        }

        return pointRepository.save(Point.builder()
                .score(score)
                .build()
        );
    }
}
