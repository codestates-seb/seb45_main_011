package com.growstory.domain.qnachat.chatroom.entity;

import com.growstory.domain.qnachat.chatmessage.entity.ChatMessage;
import com.growstory.domain.qnachat.chatroom.dto.ChatRoomRequestDto;
import com.growstory.global.audit.BaseTimeEntity;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Entity
public class ChatRoom extends BaseTimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long chatRoomId;

    @Column(nullable = false)
    private String roomName;

    @OneToMany(mappedBy = "chatRoom", cascade = CascadeType.ALL)
    private List<AccountChatRoom> accountChatRooms = new ArrayList<>();

    @OneToMany(mappedBy = "chatRoom", cascade = CascadeType.ALL)
    private List<ChatMessage> chatMessages = new ArrayList<>();

    @Enumerated(EnumType.STRING)
    private ChatRoomStatus status;

    @Builder
    public ChatRoom(String roomName) {
        this.roomName = roomName;
        this.status = ChatRoomStatus.EXISTS;
    }

    public Long updateRoomName(ChatRoomRequestDto requestDto) {
        this.roomName = requestDto.getRoomName();
        return this.chatRoomId;
    }

    @Getter
    public enum ChatRoomStatus {
        EXISTS(1, "EXISTS"),
        DELETED(2, "DELETED");
        private final int status;
        private final String message;

        ChatRoomStatus(int status, String message) {
            this.status = status;
            this.message = message;
        }
    }
}
