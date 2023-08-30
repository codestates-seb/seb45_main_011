package com.growstory.domain.likes.entity;

import com.growstory.domain.account.entity.Account;

import javax.persistence.*;

@Entity
public class AccountLike {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long accountLikeId;

    @ManyToOne
    @JoinColumn(name = "ACCOUNT_ID")
    private Account account;
}
