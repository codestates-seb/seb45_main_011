package com.growstory.domain.rank;

import com.growstory.domain.point.service.PointService;
import com.growstory.domain.rank.entity.Rank;
import com.growstory.global.exception.BusinessLogicException;
import com.growstory.global.exception.ExceptionCode;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Transactional
@RequiredArgsConstructor
@Service
public class RankService {

    private final PointService pointService;

    // 주간 랭킹별 포인트 보상
    public void compensateWeeklyPoints(Rank rank) {
        int score = calculateWeeklyPoints(rank);
        pointService.updatePoint(rank.getAccount().getPoint(), score);
    }

    // 주간 랭킹별 포인트 보상액 산정
    private int calculateWeeklyPoints(Rank rank) {
        int score;
        switch (rank.getRankOrders().getPosition()) {
            case 1:
                score = 3000;
                break;
            case 2:
                score = 2000;
                break;
            case 3:
                score = 1000;
                break;
            case 4:
                score = 500;
                break;
            case 5:
                score = 300;
                break;
            default:
                throw new BusinessLogicException(ExceptionCode.RANK_NOT_FOUND);
        }
        return score;
    }
}
