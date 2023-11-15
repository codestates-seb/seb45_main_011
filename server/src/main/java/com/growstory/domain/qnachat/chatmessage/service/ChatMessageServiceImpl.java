package com.growstory.domain.qnachat.chatmessage.service;

import com.growstory.domain.account.entity.Account;
import com.growstory.domain.account.service.AccountService;
import com.growstory.domain.qnachat.chatmessage.constant.ChatMessageConstants;
import com.growstory.domain.qnachat.chatmessage.dto.ChatMessageRequestDto;
import com.growstory.domain.qnachat.chatmessage.dto.ChatMessageResponseDto;
import com.growstory.domain.qnachat.chatmessage.entity.ChatMessage;
import com.growstory.domain.qnachat.chatmessage.repository.ChatMessageRepository;
import com.growstory.domain.qnachat.chatroom.constants.ChatRoomConstants;
import com.growstory.domain.qnachat.chatroom.dto.DeleteChatRoomRequestDto;
import com.growstory.domain.qnachat.chatroom.entity.AccountChatRoom;
import com.growstory.domain.qnachat.chatroom.entity.ChatRoom;
import com.growstory.domain.qnachat.chatroom.service.ChatRoomService;
import com.growstory.global.response.PageResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Transactional
@Service
public class ChatMessageServiceImpl implements ChatMessageService{
    private final ChatRoomService chatRoomService;
    private final ChatMessageRepository chatMessageRepository;
    private final AccountService accountService;

    // chatRoomId -> 메시지응답 페이지 반환
    @Override
    @Transactional(readOnly = true)
    public PageResponse<List<ChatMessageResponseDto>> getAllChatMessage(Pageable pageable, Long chatRoomId) {
        ChatRoom chatRoom = this.chatRoomService.getChatRoom(chatRoomId);
        Page<ChatMessage> page = this.chatMessageRepository.findByChatRoom(pageable, chatRoom);
        List<ChatMessageResponseDto> data = page.get().map(ChatMessageResponseDto::from).collect(Collectors.toList());
        return PageResponse.of(page, data);
    }

    // 메시지 전송 요청 -> Account, ChatRoom과 매핑 후 저장 및 응답
    @Override
    public ChatMessageResponseDto createSendMessage(ChatMessageRequestDto chatMessageRequest) {
        Account account = accountService.findVerifiedAccount(chatMessageRequest.getSenderId());
        ChatRoom chatRoom = chatRoomService.getChatRoom(chatMessageRequest.getChatRoomId());
        ChatMessage chatMessage =
                ChatMessage.builder()
                        .account(account)
                        .chatRoom(chatRoom)
                        .message(chatMessageRequest.getMessage())
//                        .imageUrl()
                        .build();
        chatMessageRepository.save(chatMessage);

        return ChatMessageResponseDto.from(chatMessage);
    }

    // 채팅방 입장 메시지 매핑 및 저장, 응답
    @Override
    public ChatMessageResponseDto createEnterMessage(ChatMessageRequestDto chatMessageRequest) {
        Long accountId = chatMessageRequest.getSenderId();
        Long chatRoomId = chatMessageRequest.getChatRoomId();
        Account account = accountService.findVerifiedAccount(accountId);
        ChatRoom chatRoom = chatRoomService.getChatRoom(chatRoomId);
        AccountChatRoom accountChatRoom = chatRoomService.validateIsEntered(accountId, chatRoomId);
        chatRoomService.validateAlreadyEnter(accountId, chatRoomId);
        accountChatRoom.updateEntryCheck(true);

        ChatMessage chatMessage =
                ChatMessage.builder()
                        .message(account.getDisplayName()+ ChatMessageConstants.EnumChatMessage.ENTERED.getValue())
                        .account(account)
                        .chatRoom(chatRoom)
                        .build();
        chatMessageRepository.save(chatMessage);

        return ChatMessageResponseDto.from(chatMessage);
    }

    // 채팅방 삭제
    @Override
    public ChatMessageResponseDto deleteChatRoom(DeleteChatRoomRequestDto deleteChatRoomRequest) {
        Account account = accountService.findVerifiedAccount(deleteChatRoomRequest.getAccountId());
        ChatRoom chatRoom = chatRoomService.getChatRoom(deleteChatRoomRequest.getChatRoomId());
        AccountChatRoom accountChatRoom = chatRoomService.getAccountChatRoomByAccountIdAndChatRoomId(account.getAccountId(), chatRoom.getChatRoomId());
        chatRoomService.deleteChatRoom(accountChatRoom);
        //TODO: soft delete로 변경
        return createSendMessage(ChatMessageRequestDto.of(chatRoom.getChatRoomId(), account.getAccountId(),
                account.getDisplayName() + ChatRoomConstants.EnumChatRoomMessage.enumExitChatRoomMessage.getValue(), null));
    }
}
