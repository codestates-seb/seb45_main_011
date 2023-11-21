package com.growstory.domain.qnachat.chatmessage.entity;

import com.growstory.domain.account.entity.Account;
import com.growstory.domain.images.entity.ChatMessageImage;
import com.growstory.domain.qnachat.chatroom.entity.ChatRoom;
import com.growstory.global.audit.BaseTimeEntity;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@NoArgsConstructor
@Getter
@Entity
public class ChatMessage extends BaseTimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long messageId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "sender_id", nullable = false)
    Account account;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "chat_room_id", nullable = false)
    private ChatRoom chatRoom;

    @Lob
    @Column(nullable = false)
    private String message;

    @OneToOne(mappedBy = "chatMessage", cascade = {CascadeType.PERSIST, CascadeType.REMOVE}, orphanRemoval = true)
    private ChatMessageImage chatMessageImage;

    /**
     * 생성자
     */

    @Builder
    public ChatMessage(Account account, String message, ChatMessageImage chatMessageImage, ChatRoom chatRoom) {
        this.account = account;
        this.message = message;
        this.chatMessageImage = chatMessageImage;
        this.chatRoom = chatRoom;
    }

    /**
     *  연관관계 메서드
     */
    public void updateChatMessageImage(ChatMessageImage chatMessageImage) {
        this.chatMessageImage = chatMessageImage;
    }
}
