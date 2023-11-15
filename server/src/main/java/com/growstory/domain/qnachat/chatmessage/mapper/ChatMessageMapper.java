package com.growstory.domain.qnachat.chatmessage.mapper;

import com.growstory.domain.account.entity.Account;
import com.growstory.domain.account.service.AccountService;
import com.growstory.domain.qnachat.chatmessage.dto.ChatMessageRequestDto;
import com.growstory.domain.qnachat.chatmessage.entity.ChatMessage;
import com.growstory.domain.qnachat.chatroom.entity.ChatRoom;
import com.growstory.domain.qnachat.chatroom.service.ChatRoomService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@RequiredArgsConstructor
@Component
public class ChatMessageMapper {

    private final AccountService accountService;
    private final ChatRoomService chatRoomService;

    public ChatMessage toEntityFrom(ChatMessageRequestDto requestDto) {
        if(requestDto == null) return null;

        Account findAccount = accountService.findVerifiedAccount(requestDto.getSenderId());
        ChatRoom findChatRoom = chatRoomService.findVerifiedChatRoom(requestDto.getChatRoomId());

        return ChatMessage.builder()
                .account(findAccount)
                .chatRoom(findChatRoom)
                .message(requestDto.getMessage())
                .build();
    };
}
