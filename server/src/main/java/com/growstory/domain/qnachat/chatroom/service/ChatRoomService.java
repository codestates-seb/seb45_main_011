//package com.growstory.domain.qnachat.chatroom.service;
//
//import com.growstory.domain.qnachat.chatroom.dto.*;
//import com.growstory.domain.qnachat.chatroom.entity.AccountChatRoom;
//import com.growstory.domain.qnachat.chatroom.entity.ChatRoom;
//
//import java.util.List;
//
//public interface ChatRoomService {
//    List<ChatRoomResponseDto> getAllChatRooms(Long accountId);
//    ChatRoom findVerifiedChatRoom(Long chatRoomId);
//    Long createChatRoom(CreateQnaChatRequest chatRoomRequestDto);
//    EntryCheckResponseDto checkEntry(EntryCheckRequestDto entryCheckRequestDto);
//    AccountChatRoom validateIsEntered(Long accountId, Long chatRoomId);
//    void validateAlreadyEnter(Long accountId, Long chatRoomId);
//    void deleteChatRoom(AccountChatRoom deleteAccChatRoomRequest);
//    AccountChatRoom getAccountChatRoomByAccountIdAndChatRoomId(Long accountId, Long chatRoomId);
//}
