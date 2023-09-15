package com.growstory.domain.board.dto;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ResponseRankingDto {
    private Long boardId;
    private String title;
    private String displayName;
    private int likeNum;

    @Builder
    public ResponseRankingDto(Long boardId, String title, String displayName, int likeNum) {
        this.boardId = boardId;
        this.title = title;
        this.displayName = displayName;
        this.likeNum = likeNum;
    }
}
