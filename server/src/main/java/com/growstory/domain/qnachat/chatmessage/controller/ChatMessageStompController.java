package com.growstory.domain.qnachat.chatmessage.controller;

import com.growstory.domain.qnachat.chatmessage.dto.ChatMessageRequestDto;
import com.growstory.domain.qnachat.chatmessage.dto.ChatMessageResponseDto;
import com.growstory.domain.qnachat.chatmessage.service.ChatMessageService;
import com.growstory.domain.qnachat.chatroom.dto.SimpChatRoomRequestDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Slf4j
@Controller
@RequiredArgsConstructor
public class ChatMessageStompController {

    private final SimpMessagingTemplate simpMessagingTemplate;
    private final ChatMessageService chatMessageService;

    @MessageMapping(value = "/chatRoom/enter")
    public void enterChatRoom(SimpChatRoomRequestDto enterMessageRequest) {
        ChatMessageResponseDto chatMessageResponse = chatMessageService.createEnterMessage(enterMessageRequest);
        simpMessagingTemplate.convertAndSend("/sub/chatRoom/" + enterMessageRequest.getChatRoomId(), chatMessageResponse);
    }

    @MessageMapping(value = "/chatRoom/send")
    public void sendMessageToChatRoom(ChatMessageRequestDto chatMessageRequest) {
        ChatMessageResponseDto chatMessageResponse = chatMessageService.createSendMessage(chatMessageRequest, null);
        simpMessagingTemplate.convertAndSend("/sub/chatRoom/" + chatMessageRequest.getChatRoomId(), chatMessageResponse);
    }

    @MessageMapping(value = "/chatRoom/exit")
    public void exitChatRoom(SimpChatRoomRequestDto deleteChatRoomRequest) {
        ChatMessageResponseDto chatMessageResponse = chatMessageService.sendExitChatRoomMessage(deleteChatRoomRequest);
        simpMessagingTemplate.convertAndSend("/sub/chatRoom/"+deleteChatRoomRequest.getChatRoomId(), chatMessageResponse);
    }
}
