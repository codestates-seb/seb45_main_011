package com.growstory.domain.likes.entity;

import com.growstory.domain.account.entity.Account;
import com.growstory.domain.board.entity.Board;

import javax.persistence.*;

@Entity
public class BoardLike {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long boardLikeId;

    @ManyToOne
    @JoinColumn(name = "ACCOUNT_ID")
    private Account account;

    @ManyToOne
    @JoinColumn(name = "BOARD_ID")
    private Board board;
}
