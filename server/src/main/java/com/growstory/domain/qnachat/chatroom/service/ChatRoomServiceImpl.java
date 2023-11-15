package com.growstory.domain.qnachat.chatroom.service;

import com.growstory.domain.account.entity.Account;
import com.growstory.domain.account.service.AccountService;
import com.growstory.domain.qnachat.chatroom.dto.*;
import com.growstory.domain.qnachat.chatroom.entity.AccountChatRoom;
import com.growstory.domain.qnachat.chatroom.entity.ChatRoom;
import com.growstory.domain.qnachat.chatroom.repository.AccountChatRoomRepository;
import com.growstory.domain.qnachat.chatroom.repository.ChatRoomRepository;
import com.growstory.global.exception.BusinessLogicException;
import com.growstory.global.exception.ExceptionCode;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@Transactional
@Service
public class ChatRoomServiceImpl implements ChatRoomService {
    private final ChatRoomRepository chatRoomRepository;
    private final AccountChatRoomRepository accountChatRoomRepository;
    private final AccountService accountService;

    // GET, 계정 아이디로 전체 채팅방 조회
    @Override
    public List<ChatRoomResponseDto> getAllChatRooms(Long accountId) {
        Account findAccount = accountService.findVerifiedAccount(accountId);
        List<AccountChatRoom> accountChatRoomList = accountChatRoomRepository.findAllByAccount(findAccount);
        validateCountIsNotZero(accountChatRoomList);
        List<ChatRoomResponseDto> chatRoomResponses = new ArrayList<>();
        for (AccountChatRoom accountChatRoom : accountChatRoomList) {
            // 일대일 채팅일 경우
            if(accountChatRoom.getChatRoom().getAccountChatRooms().size()==2) {
                accountChatRoom.getChatRoom().getAccountChatRooms().stream()
                        .filter(tempAccountChatRoom -> !accountChatRoom.equals(tempAccountChatRoom))
                        .forEach(tempAccountChatRoom ->chatRoomResponses.add(ChatRoomResponseDto.from(accountChatRoom, tempAccountChatRoom)));
            } else // 그룹 채팅의 경우
                chatRoomResponses.add(ChatRoomResponseDto.from(accountChatRoom));
        }
        return chatRoomResponses;
    }


    @Override
    public EntryCheckResponseDto checkEntry(EntryCheckRequestDto entryCheckRequestDto) {
        Long accountId = entryCheckRequestDto.getAccountId();
        Long chatRoomId = entryCheckRequestDto.getChatRoomId();
        AccountChatRoom accountChatRoom = validateAccountIdAndChatRoomId(accountId, chatRoomId);
        if(accountChatRoom.isEntryCheck()) return EntryCheckResponseDto.builder().entryCheck(true).build();
        else // 해당 계정이 채팅방에 입장하지 않았을 경우
            return EntryCheckResponseDto.builder().entryCheck(false).build();
    }


    @Override
    public Long createChatRoom(CreateQnaChatRequest createQnaChatRequest) {
        Long questionerId = createQnaChatRequest.getQuestionerId();
        Long reviewerId = createQnaChatRequest.getReviewerId();

        Account questioner = accountService.findVerifiedAccount(questionerId);
        Account reviewer = accountService.findVerifiedAccount(reviewerId);

        ChatRoom chatRoom = ChatRoom.builder().roomName(questionerId +"과(와)" + reviewerId + "의 채팅방").build();
        ChatRoom createdChatRoom = chatRoomRepository.save(chatRoom);

        AccountChatRoom accountChatRoomByQuestioner = AccountChatRoom.builder().account(questioner).build();
        AccountChatRoom accountChatRoomByReviewer = AccountChatRoom.builder().account(reviewer).build();

        accountChatRoomRepository.save(accountChatRoomByQuestioner);
        accountChatRoomRepository.save(accountChatRoomByReviewer);

        return createdChatRoom.getChatRoomId();
    }


    @Override
    public AccountChatRoom validateIsEntered(Long accountId, Long chatRoomId) {
        return null;
    }

    @Override
    public void validateAlreadyEnter(Long accountId, Long chatRoomId) {
        if(accountChatRoomRepository.findOneByAccountIdAndChatRoomId(accountId, chatRoomId).get().isEntryCheck()) {
            throw new BusinessLogicException(ExceptionCode.ALREADY_CHATROOM_ENTERED);
        }
    }

    @Override
    public void deleteChatRoom(AccountChatRoom deleteAccChatRoomRequest) {
        //TODO: soft delete
    }

    @Override
    public AccountChatRoom getAccountChatRoomByAccountIdAndChatRoomId(Long accountId, Long chatRoomId) {
        return validateAccountIdAndChatRoomId(accountId, chatRoomId);
    }


    @Override
    public ChatRoom findVerifiedChatRoom(Long id) {
        return chatRoomRepository.findById(id).orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.CHATROOM_NOT_FOUND));
    }

    private AccountChatRoom validateAccountIdAndChatRoomId(Long accountId, Long chatRoomId) {
        return this.accountChatRoomRepository.findOneByAccountIdAndChatRoomId(accountId, chatRoomId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.ALREADY_CHATROOM_ENTERED));
    }

    private void validateCountIsNotZero(List<AccountChatRoom> accountChatRoomList) {
        if (accountChatRoomList.size() == 0)
            throw new BusinessLogicException(ExceptionCode.ACCOUNT_CHATROOM_NOT_FOUND);
    }
}
