package com.growstory.domain.likes.entity;

import com.growstory.domain.account.entity.Account;
import com.growstory.domain.comment.entity.Comment;

import javax.persistence.*;

@Entity
public class CommentLike {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long commentLikeId;

    @ManyToOne
    @JoinColumn(name = "ACCOUNT_ID")
    private Account account;

    @ManyToOne
    @JoinColumn(name = "COMMENT_ID")
    private Comment comment;
}
