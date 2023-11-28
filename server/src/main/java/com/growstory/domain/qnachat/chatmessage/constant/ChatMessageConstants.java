package com.growstory.domain.qnachat.chatmessage.constant;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

public class ChatMessageConstants {

    @Getter
    @AllArgsConstructor
    @NoArgsConstructor
    public enum EnumChatMessage {
        ENTERED("님, 무엇을 도와드릴까요?");

        private String value;
    }
}
