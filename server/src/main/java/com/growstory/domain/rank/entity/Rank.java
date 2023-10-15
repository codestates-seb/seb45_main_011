package com.growstory.domain.rank.entity;

import com.growstory.domain.account.entity.Account;
import com.growstory.global.audit.BaseTimeEntity;
import com.growstory.global.exception.BusinessLogicException;
import com.growstory.global.exception.ExceptionCode;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@NoArgsConstructor
@Getter
@DiscriminatorColumn(name = "DTYPE")
@Inheritance(strategy = InheritanceType.JOINED)
@Table(name = "ranks")
@Entity
public abstract class Rank extends BaseTimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long rankId;

    @ManyToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "account_id", nullable = false)
    private Account account;

    @Enumerated(EnumType.STRING)
    private RankOrders rankOrders;

    @Enumerated(EnumType.STRING)
    private RankStat rankStat;

    public Rank(Account account) {
        this.account = account;
    }

    protected void updateRank(RankOrders rankOrders) {
        this.rankOrders = rankOrders;
    }

    @Getter
    public enum RankOrders {
        FIRST("rank_no_1", 1),
        SECOND("rank_no_2", 2),
        THIRD("rank_no_3", 3),
        FOURTH("rank_no_4", 4),
        FIFTH("rank_no_5", 5);

        private final String name;
        private final int position;

        RankOrders(String name, int position) {
            this.name = name;
            this.position = position;
        }
    }

    @Getter
    public enum RankStat {
        CURRENT("Current Record", 1),
        PREVIOUS("Previous Record", 2);

        private final String recordLabel;
        private final int typeCode;

        RankStat(String recordLabel, int typeCode) {
            this.recordLabel = recordLabel;
            this.typeCode = typeCode;
        }
    }


    public void updateRank(int rank) {
        switch (rank) {
            case 1 :
                updateRank(RankOrders.FIRST);
                break;
            case 2 :
                updateRank(RankOrders.SECOND);
                break;
            case 3 :
                updateRank(RankOrders.THIRD);
                break;
            case 4 :
                updateRank(RankOrders.FOURTH);
                break;
            case 5 :
                updateRank(RankOrders.FIFTH);
                break;
            default:
                throw new BusinessLogicException(ExceptionCode.RANK_NOT_FOUND);
        }
    }

    public void updateRankStat(RankStat rankStat) {
        this.rankStat = rankStat;
    }
}
