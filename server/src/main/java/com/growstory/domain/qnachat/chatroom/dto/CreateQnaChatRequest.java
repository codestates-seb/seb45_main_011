package com.growstory.domain.qnachat.chatroom.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class CreateQnaChatRequest {
    @NotNull
    private Long questionerId;
    @NotNull
    private Long reviewerId;
}
