package com.growstory.domain.images.entity;

import javax.persistence.MappedSuperclass;

@MappedSuperclass
public class Image {

    String originName;
    String imageUrl;

    public Image(String originName, String imageUrl) {
        this.originName = originName;
        this.imageUrl = imageUrl;
    }
}
