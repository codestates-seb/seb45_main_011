package com.growstory.domain.rank.entity;

import com.growstory.domain.account.entity.Account;
import com.growstory.global.audit.BaseTimeEntity;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@MappedSuperclass
@NoArgsConstructor
@Getter
public abstract class Rank extends BaseTimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long rankId;

    @ManyToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "account_id", nullable = false)
    private Account account;

    @Enumerated(EnumType.STRING)
    private RankStatus rankStatus;

    public Rank(Account account) {
        this.account = account;
    }

    protected void updateRank(RankStatus rankStatus) {
        this.rankStatus = rankStatus;
    }

    @Getter
    public enum RankStatus {
        RANK_NO_1("rank_no_1", 1),
        RANK_NO_2("rank_no_2", 2),
        RANK_NO_3("rank_no_3", 3),
        RANK_NO_4("rank_no_4", 4),
        RANK_NO_5("rank_no_5", 5);

        private String status;
        private int rank;

        RankStatus(String status, int rank) {
            this.status = status;
            this.rank = rank;
        }
    }
}
