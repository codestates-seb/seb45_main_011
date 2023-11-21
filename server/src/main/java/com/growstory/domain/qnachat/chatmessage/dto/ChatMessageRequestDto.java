package com.growstory.domain.qnachat.chatmessage.dto;

import com.growstory.domain.qnachat.chatmessage.entity.ChatMessage;
import com.growstory.domain.qnachat.chatroom.entity.ChatRoom;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Getter
@NoArgsConstructor
public class ChatMessageRequestDto {
    @NotNull @Min(1)
    private Long senderId;
    @NotNull @Min(1)
    private Long chatRoomId;
    @NotBlank
    private String message;

    @Builder
    public ChatMessageRequestDto(Long senderId, String message, Long chatRoomId) {
        this.senderId = senderId;
        this.message = message;
        this.chatRoomId = chatRoomId;
    }

    public static ChatMessageRequestDto of(Long chatRoomId, Long senderId, String message) {
        return ChatMessageRequestDto.builder()
                .chatRoomId(chatRoomId)
                .senderId(senderId)
                .message(message)
                .build();
    }

}
