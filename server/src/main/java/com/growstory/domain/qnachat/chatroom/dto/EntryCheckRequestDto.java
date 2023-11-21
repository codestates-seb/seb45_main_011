package com.growstory.domain.qnachat.chatroom.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

@Getter
@NoArgsConstructor
public class EntryCheckRequestDto {
    @NotNull(message = "채팅방id를 입력해주세요.") @Min(1)
    private Long chatRoomId;
    @NotNull(message = "메시지를 전송할 계정 id를 입력해주세요.") @Min(1)
    private Long accountId;

    @Builder
    public EntryCheckRequestDto(Long chatRoomId, Long accountId) {
        this.chatRoomId = chatRoomId;
        this.accountId = accountId;
    }
}
