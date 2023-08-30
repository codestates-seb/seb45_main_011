package com.growstory.domain.comment.entity;

import com.growstory.domain.board.entity.Board;
import com.growstory.global.audit.BaseTimeEntity;

import javax.persistence.*;

@Entity
public class Comment extends BaseTimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long commentId;

    @Column(nullable = false)
    private String content;

    @ManyToOne
    @JoinColumn(name = "BOARD_ID")
    private Board board;
}
