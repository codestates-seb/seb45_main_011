package com.growstory.domain.leaf.entity;

import com.growstory.domain.account.entity.Account;
import com.growstory.domain.board.entity.Board;
import com.growstory.domain.journal.entity.Journal;
import com.growstory.domain.plant_object.entity.PlantObj;
import com.growstory.global.audit.BaseTimeEntity;
import lombok.*;

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
    private String content;

    private String leafImageUrl;

    @ManyToOne
    @JoinColumn(name = "ACCOUNT_ID")
    private Account account;

    @OneToOne(mappedBy = "leaf", cascade = CascadeType.ALL, orphanRemoval = true)
    private PlantObj plantObj;

    @OneToMany(mappedBy = "leaf", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Journal> journals;

    public void updatePlantObj(PlantObj plantObj) {
//        if(plantObj == null) {
//            this.plantObj = null;
//            return;
//        }
//        if(this.plantObj == plantObj) return;
//
//        // else , if(this.plantObj != plantObj)
//        if(this.getPlantObj()!=null){
//            this.getPlantObj().updateLeaf(null);
//        }
//
//        this.plantObj = plantObj;
//        if(this.plantObj.getLeaf()!=this) {
//            this.plantObj.updateLeaf(this);
//        }
        this.plantObj = plantObj;
    }



    public void removePlantObj() {
        this.plantObj = null;
    }
}
