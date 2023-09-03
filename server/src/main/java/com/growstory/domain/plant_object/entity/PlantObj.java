package com.growstory.domain.plant_object.entity;


import com.growstory.domain.account.entity.Account;
import com.growstory.domain.leaf.entity.Leaf;
import com.growstory.domain.plant_object.location.entity.Location;
import com.growstory.domain.product.entity.Product;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;


@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
public class PlantObj {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long plantObjectId;


    @OneToOne
    @JoinColumn(name = "PRODUCT_ID")
    private Product product;


    @OneToOne(cascade = {CascadeType.PERSIST, CascadeType.REMOVE}, orphanRemoval = true)
    @JoinColumn(name = "LOCATION_ID", nullable = false)
    private Location location;

    @OneToOne
    @JoinColumn(name = "LEAF_ID")
    private Leaf leaf;


    public void update(Leaf leaf) {
        this.leaf = leaf;
    }
}
