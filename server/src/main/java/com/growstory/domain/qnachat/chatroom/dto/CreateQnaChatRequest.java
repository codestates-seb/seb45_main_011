package com.growstory.domain.qnachat.chatroom.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class CreateQnaChatRequest {
    @NotNull @Min(1)
    private Long questionerId;
    @NotNull @Min(1)
    private Long reviewerId;
    @NotNull
    private String qnaTitle;
}
