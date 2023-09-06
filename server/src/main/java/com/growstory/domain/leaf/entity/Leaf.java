package com.growstory.domain.leaf.entity;

import com.growstory.domain.account.entity.Account;
import com.growstory.domain.board.entity.Board;
import com.growstory.domain.journal.entity.Journal;
import com.growstory.domain.leaf.dto.LeafDto;
import com.growstory.domain.plant_object.entity.PlantObj;
import com.growstory.global.audit.BaseTimeEntity;
import lombok.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.List;

@Entity
@Getter
@Builder(toBuilder = true)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class Leaf extends BaseTimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long leafId;

    @Column(nullable = false)
    private String leafName;

    @Lob
    @Column(nullable = false)
    private String content;

    private LocalDate startDate;

    private LocalDate waterDate;

    private String place;

    @Column(nullable = false)
    private String leafImageUrl;

    @ManyToOne
    @JoinColumn(name = "ACCOUNT_ID")
    private Account account;

    @OneToOne(mappedBy = "leaf")
    private PlantObj plantObj;

    @OneToMany(mappedBy = "leaf")
    private List<Journal> journals;

    public void updateAccount(Account account) {
        this.account = account;
    }
}
