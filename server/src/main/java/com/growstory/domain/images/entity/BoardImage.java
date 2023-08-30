package com.growstory.domain.images.entity;

import com.growstory.domain.board.entity.Board;

import javax.persistence.*;

@Entity(name = "BOARD_IMAGE")
public class BoardImage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long boardImageId;

    @Column(nullable = false)
    private String originName;

    @Column(nullable = false)
    private String imageUrl;

    @ManyToOne
    @JoinColumn(name = "BOARD_ID")
    private Board board;
}
