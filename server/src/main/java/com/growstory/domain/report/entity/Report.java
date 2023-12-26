package com.growstory.domain.report.entity;

import com.growstory.domain.account.entity.Account;
import com.growstory.global.audit.BaseTimeEntity;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@NoArgsConstructor
@Entity
public class Report extends BaseTimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long reportId;

    @Column(nullable = false)
    private String title;

    @Lob
    @Column(nullable = false)
    private String content;

    @ManyToOne
    @JoinColumn(name = "ACCOUNT_ID")
    private Account account;

    private Long reportedAccountId;

    @Builder
    public Report(Long reportId, String title, String content, Account account, Long reportedAccountId) {
        this.reportId = reportId;
        this.title = title;
        this.content = content;
        this.account = account;
        this.reportedAccountId = reportedAccountId;
    }
}
