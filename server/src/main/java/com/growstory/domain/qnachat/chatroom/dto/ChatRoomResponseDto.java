package com.growstory.domain.qnachat.chatroom.dto;

import com.growstory.domain.account.entity.Account;
import com.growstory.domain.qnachat.chatmessage.entity.ChatMessage;
import com.growstory.domain.qnachat.chatroom.entity.AccountChatRoom;
import com.growstory.domain.qnachat.chatroom.entity.ChatRoom;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Comparator;
import java.util.List;
import java.util.Set;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
public class ChatRoomResponseDto implements Comparable<ChatRoomResponseDto> {
    private Long chatRoomId;
    private String roomName;
    private Long otherAccountId;
    private String otherAccountName;
    private String createdAt;
    private String status;
    private Boolean isAnswered;
    private String latestMessage;
    private String latestTime;

    public static ChatRoomResponseDto from(AccountChatRoom accountChatRoom, AccountChatRoom otherAccountChatRoom) {

        List<ChatMessage> chatMessages = accountChatRoom.getChatRoom().getChatMessages();
        LocalDateTime tempLatestTime = LocalDateTime.of(2000, 1, 1, 1, 1, 1);
        String tempLatestMessage = null;
        for (ChatMessage chatMessage : chatMessages) {
            if (chatMessage.getCreatedAt().isAfter(tempLatestTime)) {
                tempLatestTime = chatMessage.getCreatedAt().withNano(0);
                tempLatestMessage = chatMessage.getMessage();
            }
        }
        return ChatRoomResponseDto.builder()
                .chatRoomId(accountChatRoom.getChatRoom().getChatRoomId())
                .roomName(accountChatRoom.getChatRoom().getRoomName())
                .otherAccountId(otherAccountChatRoom.getAccount().getAccountId())
                .otherAccountName(otherAccountChatRoom.getAccount().getDisplayName())
                .status(accountChatRoom.getChatRoom().getStatus().getMessage())
                .createdAt(accountChatRoom.getChatRoom().getCreatedAt().format(DateTimeFormatter.ofPattern("yyyy-MM-dd")))
                .isAnswered(accountChatRoom.getChatRoom().getIsAnswered())
                .latestMessage(tempLatestMessage)
                .latestTime(tempLatestTime.format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")))
                .build();
    }

    public static ChatRoomResponseDto from(AccountChatRoom accountChatRoom) {

        List<ChatMessage> chatMessages = accountChatRoom.getChatRoom().getChatMessages();
        LocalDateTime tempLatestTime = LocalDateTime.of(2000, 1, 1, 1, 1, 1);
        String tempLatestMessage = null;

        for(ChatMessage chatMessage : chatMessages) {
            if(chatMessage.getCreatedAt().isAfter(tempLatestTime)) {
                tempLatestTime = chatMessage.getCreatedAt().withNano(0);
                tempLatestMessage = chatMessage.getMessage();
            }
        }
        return ChatRoomResponseDto.builder()
                .chatRoomId(accountChatRoom.getChatRoom().getChatRoomId())
                .latestMessage(tempLatestMessage)
                .latestTime(tempLatestTime.format(DateTimeFormatter.ofPattern("yyyy-MM-dd")))
                .build();

    }

    public void trimLatestTime() {
        this.latestTime = this.latestTime.split(" ")[0];
//        return this;
    }


    @Override
    public int compareTo(ChatRoomResponseDto other) {
        // latestTime을 기준으로 내림차순 정렬
        return Comparator.comparing(ChatRoomResponseDto::getLatestTime, Comparator.nullsLast(Comparator.reverseOrder()))
                .compare(this, other);
    }
}
