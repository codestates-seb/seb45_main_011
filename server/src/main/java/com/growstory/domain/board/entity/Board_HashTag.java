package com.growstory.domain.board.entity;

import com.growstory.domain.hashTag.entity.HashTag;

import javax.persistence.*;

@Entity
public class Board_HashTag {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long boardHashTagId;

    @ManyToOne
    @JoinColumn(name = "BOARD_ID")
    private Board board;

    @ManyToOne
    @JoinColumn(name = "HASHTAG_ID")
    private HashTag hashTag;
}
