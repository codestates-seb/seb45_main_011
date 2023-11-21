package com.growstory.domain.qnachat.chatroom.dto;

import lombok.*;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class DeleteChatRoomRequestDto {
    @NotNull @Min(1)
    private Long chatRoomId;

    @NotNull @Min(1)
    private Long accountId;

    @Builder
    public DeleteChatRoomRequestDto(Long chatRoomId, Long accountId) {
        this.chatRoomId = chatRoomId;
        this.accountId = accountId;
    }
}
