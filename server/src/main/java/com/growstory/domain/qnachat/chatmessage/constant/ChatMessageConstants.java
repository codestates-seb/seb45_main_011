package com.growstory.domain.qnachat.chatmessage.constant;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

public class ChatMessageConstants {

    @Getter
    @AllArgsConstructor
    @NoArgsConstructor
    public enum EnumChatMessage {
        ENTERED(" 님이 입장하셨습니다.");

        private String value;
    }
}
