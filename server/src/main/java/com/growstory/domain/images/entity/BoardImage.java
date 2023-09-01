package com.growstory.domain.images.entity;

import com.growstory.domain.board.entity.Board;
import lombok.Setter;

import javax.persistence.*;

@Entity(name = "BOARD_IMAGE")
public class BoardImage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long boardImageId;

    @Setter
    @Column(nullable = false)
    private String originName;

    @Setter
    @Column(nullable = false)
    private String storedImagePath;

    @ManyToOne
    @JoinColumn(name = "BOARD_ID")
    private Board board;
}
