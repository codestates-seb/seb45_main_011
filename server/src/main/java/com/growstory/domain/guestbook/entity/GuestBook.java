package com.growstory.domain.guestbook.entity;

import com.growstory.domain.account.entity.Account;
import com.growstory.global.audit.BaseTimeEntity;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class GuestBook extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long guestbookId;

    private String content;

    @ManyToOne
    @JoinColumn(name = "WRITER_ACCOUNT_ID")
    private Account author;

    @ManyToOne
    @JoinColumn(name = "RECEIVE_ACCOUNT_ID")
    private Account receiver;


    @Builder
    public GuestBook(Long guestbookId, String content, Account author, Account receiver) {
        this.guestbookId = guestbookId;
        this.content = content;
        this.author = author;
        this.receiver = receiver;
    }

    public void update(String content){
        this.content = content;
    }
}

