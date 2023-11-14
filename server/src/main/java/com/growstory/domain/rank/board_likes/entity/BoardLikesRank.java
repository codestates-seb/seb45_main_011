package com.growstory.domain.rank.board_likes.entity;

import com.growstory.domain.account.entity.Account;
import com.growstory.domain.board.entity.Board;
import com.growstory.domain.rank.board_likes.dto.BoardLikesRankDto;
import com.growstory.domain.rank.entity.Rank;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@DiscriminatorValue("board_likes_rank")
@Entity
public class BoardLikesRank extends Rank {
    @ManyToOne
    @JoinColumn(name = "board_id", nullable = false)
    private Board board;
    private Long likeNum;

    @Builder
    public BoardLikesRank(Board board, Long likeNum, Account account) {
        super(account);
        this.board = board;
        this.likeNum = likeNum;
        super.updateRankStat(RankStat.CURRENT);
    }

    public BoardLikesRankDto.Response toResponseDto() {
        return BoardLikesRankDto.Response
                .builder()
                .rank(this.getRankOrders().getPosition()) //Rank 에서 상속 받은 rank, account 정보 활용
                .displayName(this.getAccount().getDisplayName())
                .boardId(this.board.getBoardId())
                .title(this.board.getTitle())
                .likeNum(this.likeNum)
                .build();
    }

    public void updateRank(int rank) {
        super.updateRank(rank);
    }
}
