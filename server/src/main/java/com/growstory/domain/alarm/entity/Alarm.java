package com.growstory.domain.alarm.entity;

import com.growstory.domain.account.entity.Account;
import com.growstory.domain.alarm.constants.AlarmType;
import com.growstory.global.audit.BaseTimeEntity;
import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

import javax.persistence.*;

@Getter
@RequiredArgsConstructor
@Entity
public class Alarm extends BaseTimeEntity {
    // 구현 방법 SSE (server sent event)

    // 포인트 획득, 신고 알림
    // 확인되지 않은 알림이 존재하면 아이콘에 특별하게 표시
    // 아이콘을 클릭했을 경우 확인된 것으로 간주

    // 포인트 획득은 포인트를 얻는 경우
    // 요청(출석 로그인, 게시글 등록, 일지 작성)의 응답에 알림이 추가되었다고 알려주기

    // 신고 알림
    // 신고 받은 사람한테 현재 신고 누적 몇 회라는 알림

    // 알림을 개별, 전체 삭제할 수 있고, 삭제하지 않은 알림은
    // (삭제 방법: 개수 제한 or 알림 생성되고 이후 시간흐름)

    // 알림 확인 api 추가하기 (isShow, true)

//    알림 전체 조회 요청
//    req - userId
//    res - id, type, num, isShow(false)

//    알림 클릭 했을때 요청
//    모든 알림의 isShow를 true로만 바꾸는 요청
//
//    알림 개별 / 전체 삭제 요청
//    req -개별(알림id) / 전체(유저id)
//    res - ok

//      "reportComment" num={1} />
//      "reportPost" num={2} />
//      "signup" num={500} />
//      "dailyLogin" num={10} />
//      "dailyQuiz" num={10} />
//      "writePost" num={30} />
//      "writeDiary" num={10} />


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long alarmId;

    private AlarmType alarmType;

    private Boolean isShow = false;

    @ManyToOne
    @JoinColumn(name = "ACCOUNT_ID")
    private Account account;

    public void updateIsShow(Boolean isShow) {
        this.isShow = isShow;
    }

    @Builder
    public Alarm(Long alarmId, AlarmType alarmType, Boolean isShow, Account account) {
        this.alarmId = alarmId;
        this.alarmType = alarmType;
        this.isShow = isShow;
        this.account = account;
    }
}
