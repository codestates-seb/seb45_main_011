package com.growstory.domain.qnachat.chatmessage.service;

import com.growstory.domain.qnachat.chatmessage.dto.ChatMessageRequestDto;
import com.growstory.domain.qnachat.chatmessage.dto.ChatMessageResponseDto;
import com.growstory.domain.qnachat.chatroom.dto.DeleteChatRoomRequestDto;
import com.growstory.global.response.PageResponse;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface ChatMessageService {
    PageResponse<List<ChatMessageResponseDto>> getAllChatMessage(Pageable pageable, Long chatRoomId);
    ChatMessageResponseDto createSendMessage(ChatMessageRequestDto chatMessageRequest);
    ChatMessageResponseDto createEnterMessage(ChatMessageRequestDto chatMessageRequest);
    ChatMessageResponseDto deleteChatRoom(DeleteChatRoomRequestDto deleteChatRoomRequest);
}
