package com.growstory.domain.qnachat.chatroom.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

@Getter
@NoArgsConstructor
public class CreateQnaChatResponse {
    private Long chatRoomId;

    @Builder
    public CreateQnaChatResponse(Long chatRoomId) {
        this.chatRoomId = chatRoomId;
    }
}
