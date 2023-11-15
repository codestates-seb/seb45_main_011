package com.growstory.domain.qnachat.chatmessage.controller;

import com.growstory.domain.qnachat.chatmessage.dto.ChatMessageRequestDto;
import com.growstory.domain.qnachat.chatmessage.dto.ChatMessageResponseDto;
import com.growstory.domain.qnachat.chatmessage.service.ChatMessageService;
import com.growstory.domain.qnachat.chatroom.dto.DeleteChatRoomRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Controller
@RequiredArgsConstructor
public class ChatMessageStompController {

    private final SimpMessagingTemplate simpMessagingTemplate;
    private final ChatMessageService chatMessageService;

    @MessageMapping(value = "/chatRoom/enter")
    public void enterChatRoom(ChatMessageRequestDto chatMessageRequest) {
        ChatMessageResponseDto chatMessageResponse = chatMessageService.createEnterMessage(chatMessageRequest);
        simpMessagingTemplate.convertAndSend("/sub/chatRoom/" + chatMessageRequest.getChatRoomId());
    }

    @MessageMapping(value = "/chatRoom/send")
    public void sendMessageToChatRoom(ChatMessageRequestDto chatMessageRequest) {
        ChatMessageResponseDto chatMessageResponse = chatMessageService.createSendMessage(chatMessageRequest);
        simpMessagingTemplate.convertAndSend("/sub/chatRoom/" + chatMessageRequest.getChatRoomId(), chatMessageResponse);
    }

    @MessageMapping(value = "/chatRoom/exit")
    public void exitChatRoom(DeleteChatRoomRequestDto deleteChatRoomRequest) {
        ChatMessageResponseDto chatMessageResponse = chatMessageService.deleteChatRoom(deleteChatRoomRequest);
        simpMessagingTemplate.convertAndSend("/sub/chatRoom/"+deleteChatRoomRequest.getChatRoomId(), chatMessageResponse);
    }
}
