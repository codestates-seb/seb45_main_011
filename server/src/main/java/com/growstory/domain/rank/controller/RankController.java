package com.growstory.domain.rank.controller;

import com.growstory.domain.rank.board_likes.dto.BoardLikesRankDto;
import com.growstory.domain.rank.board_likes.service.BoardLikesRankService;
import com.growstory.global.response.SingleResponseDto;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequestMapping("/v1/ranks")
@RequiredArgsConstructor
@RestController
public class RankController {
    private final BoardLikesRankService boardLikesRankService;
    private final String DEFAULT_URL = "/v1/ranks";

    @Operation(summary = "주간 게시판 좋아요 랭킹 조회", description = "일주일 단위로 좋아요 상위 3개 까지의 게시판 리스트 조회")
    @GetMapping("/weekly-board-likes")
    public ResponseEntity<SingleResponseDto> getWeeklyBoardLikesRanks() {

        List<BoardLikesRankDto.Response> responseDto = boardLikesRankService.findCurrentBoardLikesRanks();

        return ResponseEntity.ok(SingleResponseDto.builder()
                        .data(responseDto)
                        .status(HttpStatus.OK.value())
                        .message(HttpStatus.OK.getReasonPhrase())
                        .build());
    }

    @Operation(summary = "주간 게시판 좋아요 랭킹 갱신", description = "일주일 단위로 좋아요 상위 3개 게시판 리스트 갱신 및 이력 관리")
    @PatchMapping("/weekly-board-likes")
    public ResponseEntity<HttpStatus> updateWeeklyBoardLikesRanks() {
        boardLikesRankService.updateFindTop3LikedBoards();

        return ResponseEntity.noContent().build();
    }
}
