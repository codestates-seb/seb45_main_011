package com.growstory.domain.plant_object.entity;


import com.growstory.domain.account.entity.Account;
import com.growstory.domain.leaf.entity.Leaf;
import com.growstory.domain.location.entity.Location;
import com.growstory.domain.product.entity.Product;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;


@Getter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class PlantObject {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long plantObjectId;

    private String nickName;

//    @Lob
//    @Column(name = "image", columnDefinition = "BLOB")
    private String imageUrl;


    @OneToOne
    @JoinColumn(name = "PRODUCT_ID")
    private Product product;

    @OneToOne
    @JoinColumn(name = "LOCATION_ID")
    private Location location;

    @OneToOne
    @JoinColumn(name = "LEAF_ID")
    private Leaf leaf;

    @ManyToOne
    @JoinColumn(name = "ACCOUNT_ID")
    private Account account;


}
