package com.growstory.domain.comment.entity;

import com.growstory.domain.account.entity.Account;
import com.growstory.domain.board.entity.Board;
import com.growstory.global.audit.BaseTimeEntity;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

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
    @JoinColumn(name = "ACCOUNT_ID")
    private Account account;

    @ManyToOne
    @JoinColumn(name = "BOARD_ID")
    private Board board;

    @Builder
    public Comment(Long commentId, String content, Account account, Board board) {
        this.commentId = commentId;
        this.content = content;
        this.account = account;
        this.board = board;
    }

    public void update(String content) {
        this.content = content;
    }
}
