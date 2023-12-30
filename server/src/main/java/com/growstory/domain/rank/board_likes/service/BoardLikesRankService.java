package com.growstory.domain.rank.board_likes.service;

import com.growstory.domain.board.service.BoardService;
import com.growstory.domain.rank.RankService;
import com.growstory.domain.rank.board_likes.dto.BoardLikesRankDto;
import com.growstory.domain.rank.board_likes.entity.BoardLikesRank;
import com.growstory.domain.rank.board_likes.history.repository.BoardLikesRankHistoryRepository;
import com.growstory.domain.rank.board_likes.repository.BoardLikesRankRepository;
import com.growstory.domain.rank.entity.Rank;
import com.growstory.global.exception.BusinessLogicException;
import com.growstory.global.exception.ExceptionCode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Transactional
@Slf4j
@RequiredArgsConstructor
@Service
public class BoardLikesRankService {

    private final BoardService boardService;
    private final BoardLikesRankRepository repository;
    private final BoardLikesRankHistoryRepository historyRepository;
    private final RankService rankService;

    @Value("${my.scheduled.cron}")
    private String cronExpression;

    // 현재 주간 랭킹 조회
    public List<BoardLikesRankDto.Response> findCurrentBoardLikesRanks() {
        return repository.findAll().stream()
                //이번 주의 유효한 랭킹만 조회
                .filter(boardLikesRank -> boardLikesRank.getRankStat()== Rank.RankStat.CURRENT)
                .map(BoardLikesRank::toResponseDto)
                .collect(Collectors.toList());
    }

    // 주 1회 랭킹 업데이트 및 이력 관리, 포인트 보상
    @Scheduled(cron = "${my.scheduled.cron}")
    public void updateFindTop3LikedBoards() {
        log.info("# Scheduled task findTop3LikedBoards started at {}", LocalDateTime.now());
        log.info("# and Cron expression is: {}", cronExpression);

        // 기존 랭킹 데이터 상태 Previous로 전환
        repository.findAll()
                .forEach(boardLikesRank -> boardLikesRank.updateRankStat(Rank.RankStat.PREVIOUS));

        // 좋아요 개수 상위 3등 까지의 게시글 조회
        List<BoardLikesRank> boardLikesRanks = boardService.findTop3LikedBoardRanks();
        if(boardLikesRanks.isEmpty()) {
            log.info("지난 주 좋아요를 받은 게시글이 없어 금주의 랭킹은 갱신되지 않습니다.");
            throw new BusinessLogicException(ExceptionCode.RANK_NOT_FOUND);
        }

        // 해당 게시글의 유저에게 보상 포인트 제공
        boardLikesRanks
                .forEach(rankService::compensateWeeklyPoints);

        // 이번 주 랭킹 저장

        repository.saveAll(boardLikesRanks);

    }
}
