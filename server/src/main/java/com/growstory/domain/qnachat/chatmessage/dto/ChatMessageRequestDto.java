package com.growstory.domain.qnachat.chatmessage.dto;

import com.growstory.domain.qnachat.chatmessage.entity.ChatMessage;
import com.growstory.domain.qnachat.chatroom.entity.ChatRoom;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Getter
@NoArgsConstructor
public class ChatMessageRequestDto {
    @NotBlank
    private Long senderId;
    @NotBlank
    private Long chatRoomId;
    @NotBlank
    private String message;
    //TODO: 이미지 관련 로직 추가
    private MultipartFile image;

    @Builder
    public ChatMessageRequestDto(Long senderId, String message, Long chatRoomId, MultipartFile image) {
        this.senderId = senderId;
        this.message = message;
        this.chatRoomId = chatRoomId;
        this.image = image;
    }

    public static ChatMessageRequestDto of(Long chatRoomId, Long senderId, String message, MultipartFile image) {
        return ChatMessageRequestDto.builder()
                .chatRoomId(chatRoomId)
                .senderId(senderId)
                .message(message)
                .image(image)
                .build();
    }

}
