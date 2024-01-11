package com.growstory.domain.hashTag.entity;

import com.growstory.domain.board.entity.Board_HashTag;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;


@Getter
@NoArgsConstructor
@Entity
public class HashTag {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long hashTagId;

    private String tag;

    public void setTag(String tag) {
        this.tag = tag;
    }

    @Builder
    public HashTag(String tag) {
        this.tag = tag;
    }

    @OneToMany(mappedBy = "hashTag", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Board_HashTag> boardHashTags = new ArrayList<>();
}
