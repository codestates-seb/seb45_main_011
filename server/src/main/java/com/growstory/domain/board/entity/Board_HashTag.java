package com.growstory.domain.board.entity;

import com.growstory.domain.hashTag.entity.HashTag;
import com.growstory.domain.leaf.entity.Leaf;

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

    public void setBoard(Board board) {
        this.board = board;
    }

    public void setHashTag(HashTag hashTag) {
        this.hashTag = hashTag;
    }

    public void addBoard(Board board) {
        this.board = board;
    }

    public void addHashTag(HashTag hashTag) {
        this.hashTag = hashTag;
    }
}
