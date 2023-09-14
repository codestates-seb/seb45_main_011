package com.growstory.domain.comment.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.growstory.domain.account.entity.Account;
import com.growstory.domain.board.entity.Board;
import com.growstory.domain.likes.entity.CommentLike;
import com.growstory.global.audit.BaseTimeEntity;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Entity
public class Comment extends BaseTimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long commentId;

    @Column(nullable = false)
    private String content;

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "ACCOUNT_ID")
    private Account account;

    @ManyToOne
    @JsonBackReference
    @JoinColumn(name = "BOARD_ID")
    private Board board;

    @OneToMany(mappedBy = "comment", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<CommentLike> commentLikes = new ArrayList<>();


    @Builder(toBuilder = true)
    public Comment(Long commentId, String content, Account account, Board board) {
        this.commentId = commentId;
        this.content = content;
        this.account = account;
        this.board = board;
    }

    public void update(String content) {
        this.content = content;
    }

    public void addCommentLike(CommentLike commentLike) {
        commentLikes.add(commentLike);
    }

}
