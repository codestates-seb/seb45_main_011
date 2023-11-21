package com.growstory.domain.qnachat.chatmessage.dto;

import com.growstory.domain.qnachat.chatmessage.entity.ChatMessage;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Getter
@Builder
@AllArgsConstructor
public class ChatMessageResponseDto {
    private Long messageId;
    private Long senderId;
    private String senderName;
    private String message;
    private String imageUrl;
    private LocalDateTime createdAt;
    private LocalDateTime modifiedAt;

    public static ChatMessageResponseDto from(ChatMessage chatMessage) {
        String chatImgUrl = chatMessage.getChatMessageImage() == null ? null : chatMessage.getChatMessageImage().getImageUrl();
        return ChatMessageResponseDto.builder()
                .messageId(chatMessage.getMessageId())
                .senderId(chatMessage.getAccount().getAccountId())
                .senderName(chatMessage.getAccount().getDisplayName())
                .message(chatMessage.getMessage())
                .imageUrl(chatImgUrl)
                .createdAt(chatMessage.getCreatedAt().withNano(0))
                .modifiedAt(chatMessage.getModifiedAt().withNano(0))
                .build();
    }
}
