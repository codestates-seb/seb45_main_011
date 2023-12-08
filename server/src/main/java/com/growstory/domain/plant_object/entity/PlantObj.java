package com.growstory.domain.plant_object.entity;


import com.growstory.domain.account.entity.Account;
import com.growstory.domain.guestbook.entity.GuestBook;
import com.growstory.domain.leaf.entity.Leaf;
import com.growstory.domain.plant_object.location.entity.Location;
import com.growstory.domain.product.entity.Product;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;


@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
public class PlantObj {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long plantObjId;


    @OneToOne
    @JoinColumn(name = "PRODUCT_ID")
    private Product product;


    @OneToOne(cascade = {CascadeType.PERSIST, CascadeType.REMOVE}, orphanRemoval = true)
    @JoinColumn(name = "LOCATION_ID", nullable = false)
    private Location location;

    @OneToOne
    @JoinColumn(name = "LEAF_ID")
    private Leaf leaf;

    @ManyToOne
    @JoinColumn(name = "ACCOUNT_ID")
    private Account account;


    public void updateLeaf(Leaf leaf) {
        this.leaf = leaf;
    }

    public void updateAccount(Account account) {
        this.account=account;
        if(account.getPlantObjs().stream().noneMatch(plantObj -> plantObj.getPlantObjId()!=this.plantObjId)) {
            account.addPlantObj(this);
        }
    }
}
