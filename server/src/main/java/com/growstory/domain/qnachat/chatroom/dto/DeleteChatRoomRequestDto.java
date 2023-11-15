package com.growstory.domain.qnachat.chatroom.dto;

import lombok.*;

import javax.validation.constraints.NotNull;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class DeleteChatRoomRequestDto {
    @NotNull
    private Long chatRoomId;

    @NotNull
    private Long accountId;

    @Builder
    public DeleteChatRoomRequestDto(Long chatRoomId, Long accountId) {
        this.chatRoomId = chatRoomId;
        this.accountId = accountId;
    }
}
