package com.growstory.domain.qnachat.chatmessage.constant;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

public class ChatMessageConstants {

    @Getter
    @AllArgsConstructor
    @NoArgsConstructor
    public enum EnumChatMessage {
        QNA_ENTERED("님, 문의하신 내용을 자세하게 적어주시면 담당자가 훨씬 빠르게 내용을 파악하고 답변드릴 수 있습니다.");

        private String value;
    }
}
