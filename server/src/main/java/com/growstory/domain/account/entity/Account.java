package com.growstory.domain.account.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.growstory.domain.account.constants.AccountGrade;
import com.growstory.domain.account.constants.Status;
import com.growstory.domain.alarm.entity.Alarm;
import com.growstory.domain.board.entity.Board;
import com.growstory.domain.comment.entity.Comment;
import com.growstory.domain.guestbook.entity.GuestBook;
import com.growstory.domain.leaf.entity.Leaf;
import com.growstory.domain.likes.entity.AccountLike;
import com.growstory.domain.likes.entity.BoardLike;
import com.growstory.domain.plant_object.entity.PlantObj;
import com.growstory.domain.point.entity.Point;
import com.growstory.domain.qnachat.chatmessage.entity.ChatMessage;
import com.growstory.domain.qnachat.chatroom.entity.AccountChatRoom;
import com.growstory.domain.report.entity.Report;
import com.growstory.global.audit.BaseTimeEntity;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Setter
@Entity
@Getter
@NoArgsConstructor
public class Account extends BaseTimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ACCOUNT_ID")
    private Long accountId;

    @Column(name = "EMAIL", unique = true, nullable = false, length = 100)
    private String email;

    @Column(name = "DISPLAY_NAME", nullable = false, length = 50)
    private String displayName;

    @Column(name = "PASSWORD", length = 100, nullable = false)
    private String password;

    @Column(name = "PROFILE_IMAGE_URL")
    private String profileImageUrl;

    // 신고 받은 횟수
    private int reportNums = 0;

    @OneToMany(mappedBy = "account", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<Board> boards = new ArrayList<>();

    // cascade = 부모를 db에서 delete하면 자식도 지워진다.
    // orphan = 부모를 db에서 delete하면 자식도 지워진다.
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

    @OneToMany(mappedBy = "account", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Alarm> alarms = new ArrayList<>();

    @OneToMany(mappedBy = "account", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<AccountChatRoom> accountChatRooms = new ArrayList<>();

    @OneToMany(mappedBy = "account", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ChatMessage> chatMessages = new ArrayList<>();

    // 자신이 신고한 목록
    @OneToMany(mappedBy = "account", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Report> reports = new ArrayList<>();

    // 방명록을 받은 계정 리스트
    @OneToMany(mappedBy = "receiver", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<GuestBook> receivedGuestBooks = new ArrayList<>();

    // 방명록을 작성한 계정 리스트
    @OneToMany(mappedBy = "author", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<GuestBook> writerGuestBooks = new ArrayList<>();

    @ElementCollection(fetch = FetchType.EAGER)
    private List<String> roles = new ArrayList<>();

    @Enumerated(EnumType.STRING)
    private AccountGrade accountGrade = AccountGrade.GRADE_BRONZE;

    @Enumerated(EnumType.STRING)
    private Status status = Status.USER;

    // 출석 체크
    private Boolean attendance = false;

    public void updateDisplayName(String displayName) {
        this.displayName = displayName;
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

    public void addAlarm(Alarm alarm) {
        alarms.add(alarm);
    }

    public void updateGrade(AccountGrade accountGrade) {
        this.accountGrade = accountGrade;
    }

    public void updatePoint(Point point) {
        this.point = point;
        if (point.getAccount() != this)
            point.updateAccount(this);
    }

    public void updateAttendance(Boolean attendance) {
        this.attendance = attendance;
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

    public void addReport(Report report) {
        reports.add(report);
    }

    public void addReportsNum() {
        reportNums += 1;
    }

    public void updateStatus(Status status) {
        this.status = status;
    }

    public void removePlantObj(PlantObj plantObj) {
        this.plantObjs.remove(plantObj);
    }

    public Account(Long accountId, String email, String displayName, String password, String profileImageUrl, List<String> roles) {
        this.accountId = accountId;
        this.email = email;
        this.displayName = displayName;
        this.password = password;
        this.profileImageUrl = profileImageUrl;
        this.roles = roles;
    }

    @Builder(toBuilder = true)
    public Account(Long accountId, String email, String displayName, String password, String profileImageUrl,
                   List<Board> boards, List<Leaf> leaves, List<AccountLike> givingAccountLikes,
                   List<AccountLike> receivingAccountLikes, List<BoardLike> boardLikes, List<Comment> comments,
                   Point point, List<PlantObj> plantObjs, List<String> roles, AccountGrade accountGrade, Status status, int reportNums,
                   Boolean attendance) {
        this.accountId = accountId;
        this.email = email;
        this.displayName = displayName;
        this.password = password;
        this.profileImageUrl = profileImageUrl;
        this.boards = boards;
        this.leaves = leaves;
        this.givingAccountLikes = givingAccountLikes;
        this.receivingAccountLikes = receivingAccountLikes;
        this.boardLikes = boardLikes;
        this.comments = comments;
        this.point = point;
        this.plantObjs = plantObjs;
        this.roles = roles;
        this.accountGrade = accountGrade;
        this.status = status;
        this.reportNums = reportNums;
        this.attendance = attendance;
    }
}