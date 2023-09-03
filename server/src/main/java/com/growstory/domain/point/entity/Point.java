package com.growstory.domain.point.entity;

import com.growstory.domain.account.entity.Account;
import com.growstory.global.audit.BaseTimeEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder(toBuilder = true)
public class Point extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long pointId;

    private int score;

    @OneToOne
    @JoinColumn(name = "ACCOUNT_ID")
    private Account account;

    public void setAccount(Account account) {
        this.account = account;
        if (account.getPoint() != this)
            account.setPoint(this);
    }
    public void updateScore(int updatedScore) {
        this.score = updatedScore;
        if(this.account.getPoint()!=this) {
            account.updatePoint(this);
        }
    }
}
