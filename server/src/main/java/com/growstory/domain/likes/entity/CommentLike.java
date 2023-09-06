package com.growstory.domain.likes.entity;

import com.growstory.domain.account.entity.Account;
import com.growstory.domain.comment.entity.Comment;
import lombok.Getter;

import javax.persistence.*;

@Getter
@Entity
public class CommentLike {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long commentLikeId;

    @ManyToOne
    @JoinColumn(name = "GIVING_ACCOUNT_ID")
    private Account givingAccount;

    @ManyToOne
    @JoinColumn(name = "COMMENT_ID")
    private Comment comment;
}
