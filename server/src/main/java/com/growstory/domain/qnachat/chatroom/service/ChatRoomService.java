package com.growstory.domain.qnachat.chatroom.service;

import com.growstory.domain.qnachat.chatroom.dto.*;
import com.growstory.domain.qnachat.chatroom.entity.AccountChatRoom;
import com.growstory.domain.qnachat.chatroom.entity.ChatRoom;
import com.growstory.global.response.PageResponse;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface ChatRoomService {
    PageResponse<List<ChatRoomResponseDto>> getAllChatRooms(Long accountId, Pageable pageable);
    ChatRoom findVerifiedChatRoom(Long chatRoomId);
    Long createQnaChatRoom(CreateQnaChatRequest chatRoomRequestDto);
    EntryCheckResponseDto checkEntry(EntryCheckRequestDto entryCheckRequestDto);
    AccountChatRoom validateIsEntered(Long accountId, Long chatRoomId);
    void validateAlreadyEnter(Long accountId, Long chatRoomId);
    void deleteChatRoom(AccountChatRoom deleteAccChatRoomRequest);
    void completeChatRoom(AccountChatRoom completeAccChatRoomRequest);
    AccountChatRoom getAccountChatRoomByAccountIdAndChatRoomId(Long accountId, Long chatRoomId);
    void updateAnswer(SimpChatRoomRequestDto answerRenewalRequest);
}
