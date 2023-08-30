package com.growstory.domain.account.entity;

import com.growstory.domain.board.entity.Board;
import com.growstory.domain.leaf.entity.Leaf;
import com.growstory.domain.likes.entity.AccountLike;
import com.growstory.domain.point.entity.Point;
import com.growstory.global.audit.BaseTimeEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Account extends BaseTimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long accountId;

    @Column(name = "EMAIL", unique = true, nullable = false, length = 50)
    private String email;

    @Column(name = "DISPLAY_NAME", nullable = false, length = 50)
    private String displayName;

    @Column(name = "PASSWORD", nullable = false)
    private String password;

    @Column(name = "PROFILE_IMAGE_URL")
    private String profileImageUrl;

    @OneToMany(mappedBy = "account")
    private List<Board> boards = new ArrayList<>();

    @OneToMany(mappedBy = "account")
    private List<Leaf> leaves = new ArrayList<>();

    @OneToMany(mappedBy = "account")
    private List<AccountLike> accountLikes;

    @OneToOne(mappedBy = "account")
    private Point point;

    @ElementCollection(fetch = FetchType.EAGER)
    private List<String> roles = new ArrayList<>();

}
