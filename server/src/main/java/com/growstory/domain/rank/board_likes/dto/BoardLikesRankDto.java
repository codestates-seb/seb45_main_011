package com.growstory.domain.rank.board_likes.dto;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

public class BoardLikesRankDto {
    @Getter
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    public static class Response {
        int rank;
        long boardId;
        String title;
        String displayName;
        long likeNum;

        @Builder
        public Response(int rank, long boardId, String title, String displayName, long likeNum) {
            this.rank = rank;
            this.boardId = boardId;
            this.title = title;
            this.displayName = displayName;
            this.likeNum = likeNum;
        }
    }
}
