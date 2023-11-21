//package com.growstory.domain.qnachat.chatroom.entity;
//
//
//import com.growstory.domain.account.entity.Account;
//import lombok.Builder;
//import lombok.Getter;
//import lombok.NoArgsConstructor;
//
//import javax.persistence.*;
//
//@NoArgsConstructor
//@Getter
//@Entity
//public class AccountChatRoom {
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    @Column(name = "account_chat_room_id")
//    private Long accountChatRoomId;
//
//    @ManyToOne
//    @JoinColumn(name = "account_id")
//    private Account account;
//
//    @ManyToOne
//    @JoinColumn(name = "chatroom_id")
//    private ChatRoom chatRoom;
//
//    @Column(nullable = false)
//    private boolean entryCheck;
//
//    /**
//     *  생성자
//     */
//    @Builder
//    public AccountChatRoom(Long accountChatRoomId, Account account, ChatRoom chatRoom, boolean entryCheck) {
//        this.accountChatRoomId = accountChatRoomId;
//        this.account = account;
//        this.chatRoom = chatRoom;
//        this.entryCheck = entryCheck;
//    }
//
//    /**
//     * 연관관계 메서드
//     */
//
//    public void updateAccount(Account account) {
//        this.account = account;
//        account.getAccountChatRooms().add(this);
//    }
//
//    public void updateChatRoom(ChatRoom chatRoom) {
//        this.chatRoom = chatRoom;
//        chatRoom.getAccountChatRooms().add(this);
//    }
//
//    public void updateEntryCheck(boolean check) {
//        this.entryCheck = check;
//    }
//}
