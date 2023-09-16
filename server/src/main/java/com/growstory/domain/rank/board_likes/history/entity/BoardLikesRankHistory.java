package com.growstory.domain.rank.board_likes.history.entity;

import com.growstory.global.audit.BaseTimeEntity;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class BoardLikesRankHistory extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long historyId;

    Long accountId;
    Long boardId;
    Long likesNum;

    @Builder
    public BoardLikesRankHistory(Long historyId, Long accountId, Long boardId, Long likesNum) {
        this.historyId = historyId;
        this.accountId = accountId;
        this.boardId = boardId;
        this.likesNum = likesNum;
    }
}
