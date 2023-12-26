package com.growstory.domain.board.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.growstory.domain.account.entity.Account;
import com.growstory.domain.board.dto.RequestBoardDto;
import com.growstory.domain.comment.entity.Comment;
import com.growstory.domain.images.entity.BoardImage;
import com.growstory.domain.leaf.entity.Leaf;
import com.growstory.domain.likes.entity.BoardLike;
import com.growstory.domain.rank.board_likes.entity.BoardLikesRank;
import com.growstory.global.audit.BaseTimeEntity;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class Board extends BaseTimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long boardId;

    @Column(nullable = false)
    private String title;

    @Lob
    @Column(nullable = false)
    private String content;

    @ManyToOne
    @JsonBackReference
    @JoinColumn(name = "ACCOUNT_ID")
    private Account account;

    @OneToMany(mappedBy = "board", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<Comment> boardComments = new ArrayList<>();

    @OneToMany(mappedBy = "board", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<BoardImage> boardImages = new ArrayList<>();

    @OneToMany(mappedBy = "board", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<BoardLike> boardLikes = new ArrayList<>();

    @OneToMany(mappedBy = "board", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Board_HashTag> boardHashTags = new ArrayList<>();

    @OneToMany(mappedBy = "board", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<BoardLikesRank> boardLikesRanks = new ArrayList<>();


    @Builder
    public Board(Long boardId, String title, String content, Account account, List<Comment> boardComments, List<BoardImage> boardImages, List<BoardLike> boardLikes, List<Board_HashTag> boardHashTags) {
        this.boardId = boardId;
        this.title = title;
        this.content = content;
        this.account = account;
        this.boardComments = boardComments;
        this.boardImages = boardImages;
        this.boardLikes = boardLikes;
        this.boardHashTags = boardHashTags;
    }

    // Mockito Test를 위한 setter
    public void setBoardId(Long boardId) {
        this.boardId = boardId;
    }

    public void addBoardLike(BoardLike boardLike) {
        boardLikes.add(boardLike);
    }

    public void update(RequestBoardDto.Patch requestPatchDto) {
        this.title = requestPatchDto.getTitle();
        this.content = requestPatchDto.getContent();
    }
}
