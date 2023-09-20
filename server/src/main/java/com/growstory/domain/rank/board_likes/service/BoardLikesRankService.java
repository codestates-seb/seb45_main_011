package com.growstory.domain.rank.board_likes.service;

import com.growstory.domain.board.service.BoardService;
import com.growstory.domain.rank.RankService;
import com.growstory.domain.rank.board_likes.dto.BoardLikesRankDto;
import com.growstory.domain.rank.board_likes.entity.BoardLikesRank;
import com.growstory.domain.rank.board_likes.history.entity.BoardLikesRankHistory;
import com.growstory.domain.rank.board_likes.history.repository.BoardLikesRankHistoryRepository;
import com.growstory.domain.rank.board_likes.repository.BoardLikesRankRepository;
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

    // 주간 랭킹 조회
    public List<BoardLikesRankDto.Response> findAllBoardLikesRanks() {
        List<BoardLikesRank> boardLikesRanks = repository.findAll();
        return boardLikesRanks.stream()
                .map(BoardLikesRank::toResponseDto)
                .collect(Collectors.toList());
    }

    // 주 1회 랭킹 업데이트 및 이력 관리, 포인트 보상
    @Scheduled(cron = "${my.scheduled.cron}")
    public void updateFindTop3LikedBoards() {
        log.info("# Scheduled task findTop3LikedBoards started at {}", LocalDateTime.now());
        log.info("# and Cron expression is: {}", cronExpression);

        // 좋아요 개수 상위 3등 까지의 게시글 조회
        List<BoardLikesRank> boardLikesRanks = boardService.findTop3LikedBoardRanks();

        // 이전 주의 랭킹 이력 테이블에 저장
        saveHistories(boardLikesRanks);

        // 유저에게 보상 포인트 제공
        boardLikesRanks
                .forEach(rankService::compensateWeeklyPoints);

        // 이전 주의 랭킹 삭제 및 이번 주 랭킹 저장
        repository.deleteAll();
        List<BoardLikesRank> newBoardLikesRanks = boardService.findTop3LikedBoardRanks();
        repository.saveAll(newBoardLikesRanks);
    }

    // 이전 게시글 좋아요 랭킹을 이력 테이블로서 저장
    private void saveHistories(List<BoardLikesRank> boardLikesRanks) {
        List<BoardLikesRankHistory> histories
                = boardLikesRanks.stream()
                .map(rank -> {
                    return BoardLikesRankHistory.builder()
                            .accountId(rank.getAccount().getAccountId())
                            .boardId(rank.getBoard().getBoardId())
                            .likesNum(rank.getLikeNum())
                            .build();
                }).collect(Collectors.toList());
        historyRepository.saveAll(histories);
    }

}
