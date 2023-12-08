package com.growstory.domain.qnachat.chatroom.service;

import com.growstory.domain.account.entity.Account;
import com.growstory.domain.account.service.AccountService;
import com.growstory.domain.images.service.ChatMessageImageService;
import com.growstory.domain.qnachat.chatroom.dto.*;
import com.growstory.domain.qnachat.chatroom.entity.AccountChatRoom;
import com.growstory.domain.qnachat.chatroom.entity.ChatRoom;
import com.growstory.domain.qnachat.chatroom.repository.AccountChatRoomRepository;
import com.growstory.domain.qnachat.chatroom.repository.ChatRoomRepository;
import com.growstory.global.exception.BusinessLogicException;
import com.growstory.global.exception.ExceptionCode;
import com.growstory.global.response.PageResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Transactional
@Service
public class ChatRoomServiceImpl implements ChatRoomService {
    private final ChatRoomRepository chatRoomRepository;
    private final ChatMessageImageService chatMessageImageService;
    private final AccountChatRoomRepository accountChatRoomRepository;
    private final AccountService accountService;

    private static final String CHAT_MESSAGE_IMAGE_PROCESS_TYPE = "chat_message_image";

    // GET, 계정 아이디로 전체 채팅방 조회
    @Override
    @Transactional(readOnly = true)
    public PageResponse<List<ChatRoomResponseDto>> getAllChatRooms(Long accountId, Pageable pageable) {
        Account findAccount = accountService.findVerifiedAccount(accountId);
        List<AccountChatRoom> accountChatRoomList = accountChatRoomRepository.findAllByAccount(findAccount);
        validateCountIsNotZero(accountChatRoomList);
        List<ChatRoomResponseDto> chatRoomResponses = new ArrayList<>();
        for (AccountChatRoom accountChatRoom : accountChatRoomList) {
            // 일대일 채팅일 경우
            if(accountChatRoom.getChatRoom().getAccountChatRooms().size()==2) {
                accountChatRoom.getChatRoom().getAccountChatRooms().stream()
                        .filter(tempAccountChatRoom -> !accountChatRoom.equals(tempAccountChatRoom))
                        .filter(tempAccountChatRoom -> isValidateStatus(tempAccountChatRoom.getChatRoom()))
                        .forEach(tempAccountChatRoom ->chatRoomResponses.add(ChatRoomResponseDto.from(accountChatRoom, tempAccountChatRoom)));
            } else // 그룹 채팅의 경우
            {
                accountChatRoom.getChatRoom().getAccountChatRooms().stream()
                                .filter(tempAccountChatRoom -> isValidateStatus(tempAccountChatRoom.getChatRoom()))
                                .forEach(tempAccountChatRoom -> chatRoomResponses.add(ChatRoomResponseDto.from(accountChatRoom)));
            }
        }

        //최근 메시지 수신일을 기준으로 내림차순정렬
//        Collections.sort(chatRoomResponses, Comparator.comparing(ChatRoomResponseDto::getLatestTime).reversed());
        Collections.sort(chatRoomResponses);

        // 페이지네이션 처리
        int start = (int) pageable.getOffset();
        int end = Math.min((start + pageable.getPageSize()), chatRoomResponses.size());
        Page<ChatRoomResponseDto> page = new PageImpl<>(chatRoomResponses.subList(start, end), pageable, chatRoomResponses.size());

        page.getContent().forEach(content -> content.trimLatestTime());

        return PageResponse.of(page, page.getContent());
    }

    //채팅방 id와 계정 id를 이용해 입장 여부를 조회
    @Override
    public EntryCheckResponseDto checkEntry(EntryCheckRequestDto entryCheckRequestDto) {
        Long accountId = entryCheckRequestDto.getAccountId();
        Long chatRoomId = entryCheckRequestDto.getChatRoomId();
        AccountChatRoom accountChatRoom = validateAccountIdAndChatRoomId(accountId, chatRoomId);
        if(accountChatRoom.isEntryCheck()) return EntryCheckResponseDto.builder().entryCheck(true).build();
        else // 해당 계정이 채팅방에 입장하지 않았을 경우
            return EntryCheckResponseDto.builder().entryCheck(false).build();
    }


    // 질문자 id와 검토자 id를 이용해 채팅방 및 어카운트 채팅방 생성
    @Override
    public Long createQnaChatRoom(CreateQnaChatRequest createQnaChatRequest) {
        Long questionerId = createQnaChatRequest.getQuestionerId();
        Long reviewerId = createQnaChatRequest.getReviewerId();

        Account questioner = accountService.findVerifiedAccount(questionerId);
        Account reviewer = accountService.findVerifiedAccount(reviewerId);

        ChatRoom chatRoom = ChatRoom.builder().roomName(createQnaChatRequest.getQnaTitle()).build();
        ChatRoom createdChatRoom = chatRoomRepository.save(chatRoom);

        AccountChatRoom accountChatRoomByQuestioner = AccountChatRoom.builder().account(questioner).chatRoom(createdChatRoom).build();
        AccountChatRoom accountChatRoomByReviewer = AccountChatRoom.builder().account(reviewer).chatRoom(createdChatRoom).build();

        accountChatRoomByQuestioner.updateChatRoom(chatRoom);
        accountChatRoomByReviewer.updateChatRoom(chatRoom);

        accountChatRoomRepository.save(accountChatRoomByQuestioner);
        accountChatRoomRepository.save(accountChatRoomByReviewer);

        return createdChatRoom.getChatRoomId();
    }


    @Override
    public AccountChatRoom validateIsEntered(Long accountId, Long chatRoomId) {
        return this.accountChatRoomRepository.findOneByAccountAccountIdAndChatRoomChatRoomId(accountId, chatRoomId).orElseThrow(
                () -> new BusinessLogicException(ExceptionCode.ACCOUNT_CHATROOM_NOT_FOUND)
        );
    }

    @Override
    public void validateAlreadyEnter(Long accountId, Long chatRoomId) {
        if(accountChatRoomRepository.findOneByAccountAccountIdAndChatRoomChatRoomId(accountId, chatRoomId).get().isEntryCheck()) {
            throw new BusinessLogicException(ExceptionCode.ALREADY_CHATROOM_ENTERED);
        }
    }

    // ChatRoom 삭제
    @Override
    public void deleteChatRoom(AccountChatRoom deleteAccChatRoomRequest) {
        ChatRoom chatRoom = deleteAccChatRoomRequest.getChatRoom();
        chatRoom.getChatMessages().stream()
                .forEach(chatMessage -> chatMessageImageService.deleteChatMessageImageWithS3(chatMessage.getChatMessageImage(),CHAT_MESSAGE_IMAGE_PROCESS_TYPE));

        chatRoomRepository.delete(chatRoom);
    }

    // ChatRoom 상태 completed 업데이트
    @Override
    public void completeChatRoom(AccountChatRoom completeAccChatRoomRequest) {
        ChatRoom chatRoom = completeAccChatRoomRequest.getChatRoom();
        chatRoom.updateStatus(ChatRoom.ChatRoomStatus.ANSWER_COMPLETED);
        completeAccChatRoomRequest.updateChatRoom(chatRoom);
    }

    // accountId와 chatRoomId를 통해 AccountChatRoom 조회
    @Override
    public AccountChatRoom getAccountChatRoomByAccountIdAndChatRoomId(Long accountId, Long chatRoomId) {
        return validateAccountIdAndChatRoomId(accountId, chatRoomId);
    }

    // 답변 여부 업데이트
    @Override
    public void updateAnswer(SimpChatRoomRequestDto answerRenewalRequest) {
        Long lastSenderId = answerRenewalRequest.getSenderId();
        Long chatRoomId = answerRenewalRequest.getChatRoomId();

        Account findAccount = accountService.findVerifiedAccount(lastSenderId);
        ChatRoom findChatRoom = findVerifiedChatRoom(chatRoomId);

        boolean answered = false;
        if(findAccount.getRoles().contains("ADMIN"))
            answered = true;

        findChatRoom.updateAnswered(answered);
    }

    // chatRoomId로 채팅방 조회
    @Override
    public ChatRoom findVerifiedChatRoom(Long chatRoomId) {
        return chatRoomRepository.findById(chatRoomId).orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.CHATROOM_NOT_FOUND));
    }


    private AccountChatRoom validateAccountIdAndChatRoomId(Long accountId, Long chatRoomId) {
        return this.accountChatRoomRepository.findOneByAccountAccountIdAndChatRoomChatRoomId(accountId, chatRoomId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.ALREADY_CHATROOM_ENTERED));
    }

    // accountChatRoom의 인원이 0이면 예외 던지기
    private void validateCountIsNotZero(List<AccountChatRoom> accountChatRoomList) {
        if (accountChatRoomList.size() == 0)
            throw new BusinessLogicException(ExceptionCode.ACCOUNT_CHATROOM_NOT_FOUND);
    }

    // 채팅방 상태가 유효(존재 || 답변 완료)한지 체크
    private boolean isValidateStatus(ChatRoom chatRoom) {
        return chatRoom.getStatus().equals(ChatRoom.ChatRoomStatus.EXISTS) ||
                chatRoom.getStatus().equals(ChatRoom.ChatRoomStatus.ANSWER_COMPLETED);
    }
}
