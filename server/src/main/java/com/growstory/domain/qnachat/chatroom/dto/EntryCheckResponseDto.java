package com.growstory.domain.qnachat.chatroom.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Getter
public class EntryCheckResponseDto {

    private boolean entryCheck;

    @Builder
    public EntryCheckResponseDto(boolean entryCheck) {
        this.entryCheck = entryCheck;
    }

    public EntryCheckResponseDto from(boolean entryCheck) {
        return EntryCheckResponseDto
                .builder()
                .entryCheck(entryCheck)
                .build();
    }
}
