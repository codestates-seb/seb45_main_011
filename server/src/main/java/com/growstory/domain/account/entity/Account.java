package com.growstory.domain.account.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.growstory.domain.board.entity.Board;
import com.growstory.domain.comment.entity.Comment;
import com.growstory.domain.leaf.entity.Leaf;
import com.growstory.domain.likes.entity.AccountLike;
import com.growstory.domain.likes.entity.BoardLike;
import com.growstory.domain.plant_object.entity.PlantObj;
import com.growstory.domain.point.entity.Point;
import com.growstory.global.audit.BaseTimeEntity;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Setter
@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder(toBuilder = true)
public class Account extends BaseTimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long accountId;

    @Column(name = "EMAIL", unique = true, nullable = false, length = 50)
    private String email;

    @Column(name = "DISPLAY_NAME", nullable = false, length = 50)
    private String displayName;

    @Column(name = "PASSWORD", length = 100, nullable = false)
    private String password;

    @Column(name = "PROFILE_IMAGE_URL")
    private String profileImageUrl;

    @OneToMany(mappedBy = "account", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<Board> boards = new ArrayList<>();

    @OneToMany(mappedBy = "account", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Leaf> leaves = new ArrayList<>();

    // 자신이 좋아요 누른 계정 리스트
    @OneToMany(mappedBy = "givingAccount", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<AccountLike> givingAccountLikes;

    // 자신이 좋아요 받은 계정 리스트
    @OneToMany(mappedBy = "receivingAccount", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<AccountLike> receivingAccountLikes;

    // 자신이 좋아요 누른 게시글 리스트
    @OneToMany(mappedBy = "account", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<BoardLike> boardLikes;

    @OneToMany(mappedBy = "account", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Comment> comments = new ArrayList<>();

    @JsonIgnore
    @OneToOne(mappedBy = "account", cascade = CascadeType.ALL, orphanRemoval = true)
    private Point point;

    // 단방향관계, 1:N 디폴트 - 지연 로딩,
    @OneToMany(mappedBy = "account", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<PlantObj> plantObjs;

    @ElementCollection(fetch = FetchType.EAGER)
    private List<String> roles = new ArrayList<>();

    @Enumerated(EnumType.STRING)
    private AccountGrade accountGrade = AccountGrade.GRADE_BRONZE;

//    식물카드개수에 의한 등급 제도
//    50개 미만 - 브론즈 가드너
//    50개 이상 - 실버 가드너
//    100개 이상 - 골드 가드너
    public enum AccountGrade {
        GRADE_BRONZE(1, "브론즈 가드너"),
        GRADE_SILVER(2, "실버 가드너"),
        GRADE_GOLD(3, "골드 가드너");

        @Getter
        private int stepNumber;

        @Getter
        private String stepDescription;

        AccountGrade(int stepNumber, String stepDescription) {
            this.stepNumber = stepNumber;
            this.stepDescription = stepDescription;
        }
    }

    public void addLeaf(Leaf leaf) {
        leaves.add(leaf);
    }

    public void addGivingAccountLike(AccountLike accountLike) {
        givingAccountLikes.add(accountLike);
    }

    public void addReceivingAccountLike(AccountLike accountLike) {
        receivingAccountLikes.add(accountLike);
    }

    public Account(Long accountId, String email, String displayName, String password, String profileImageUrl, List<String> roles) {
        this.accountId = accountId;
        this.email = email;
        this.displayName = displayName;
        this.password = password;
        this.profileImageUrl = profileImageUrl;
        this.roles = roles;
    }

    public void updateGrade(AccountGrade accountGrade) {
        this.accountGrade = accountGrade;
    }

    public void updatePoint(Point point) {
        this.point = point;
        if (point.getAccount() != this)
            point.updateAccount(this);
    }

    public void addBoardLike(BoardLike boardLike) {
        boardLikes.add(boardLike);
    }

    public void addPlantObj(PlantObj plantObj) {
        this.plantObjs.add(plantObj);
        if(plantObj.getAccount()!= this) {
            plantObj.updateAccount(this);
        }
    }

    public void removePlantObj(PlantObj plantObj) {
        this.plantObjs.remove(plantObj);
    }
}
