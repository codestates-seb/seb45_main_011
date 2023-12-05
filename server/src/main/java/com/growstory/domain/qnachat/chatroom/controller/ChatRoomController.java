package com.growstory.domain.qnachat.chatroom.controller;

import com.growstory.domain.qnachat.chatmessage.dto.ChatMessageResponseDto;
import com.growstory.domain.qnachat.chatmessage.service.ChatMessageService;
import com.growstory.domain.qnachat.chatroom.dto.*;
import com.growstory.domain.qnachat.chatroom.service.ChatRoomService;
import com.growstory.global.response.PageResponse;
import com.growstory.global.utils.UriCreator;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RequiredArgsConstructor
@RequestMapping("v1/chat-rooms")
@RestController
public class ChatRoomController {
    private final ChatRoomService chatRoomService;
    private final ChatMessageService chatMessageService;

    private static final String DEFAULT_URL = "/v1/chat-rooms";

    @Operation(summary = "유저의 모든 채팅방 조회", description = "특정 유저의 모든 채팅방을 조회합니다.")
    @GetMapping("/{account-id}")
    public ResponseEntity<PageResponse<List<ChatRoomResponseDto>>> getAllChatRooms(
            @PathVariable("account-id") Long accountId,
            @PageableDefault Pageable pageable) {
        return ResponseEntity.ok(chatRoomService.getAllChatRooms(accountId, pageable));
    }

    @Operation(summary = "qna 채팅방 생성", description = "관리자와 문의자의 1:1 문의 채팅방을 생성합니다.")
    @PostMapping
    public ResponseEntity<CreateQnaChatResponse> createQnaChatRoom(@RequestBody CreateQnaChatRequest createQnaChatRequest) {
        Long chatRoomId = chatRoomService.createQnaChatRoom(createQnaChatRequest);
        URI location = UriCreator.createUri(DEFAULT_URL, chatRoomId);
        return ResponseEntity.created(location).body(CreateQnaChatResponse.builder().chatRoomId(chatRoomId).build());
    }

    @Operation(summary = "유저의 채팅방 입장 여부 조회", description = "특정 유저가 채팅방에 입장했는지 여부를 조회합니다.")
    @PostMapping("/entry-check")
    public ResponseEntity<EntryCheckResponseDto> checkEntry(@RequestBody EntryCheckRequestDto entryCheckRequest) {
        return ResponseEntity.ok(chatRoomService.checkEntry(entryCheckRequest));
    }


    @Operation(summary = "채팅방 나가기", description = "특정 유저의 채팅방을 삭제 상태로 변경 합니다.")
    @DeleteMapping("/out")
    public ResponseEntity<ChatMessageResponseDto> deleteChatRoom(@RequestBody SimpChatRoomRequestDto deleteChatRoomRequest) {
        return ResponseEntity.ok(chatMessageService.sendExitChatRoomMessage(deleteChatRoomRequest));
    }

    @Operation(summary = "문의 답변 여부 갱신", description = "해당 채팅방의 답변 여부를 최신 상태로 갱신합니다.")
    @PatchMapping("/qna-answer-renewal")
    public ResponseEntity<HttpStatus> patchAnswer(@RequestBody SimpChatRoomRequestDto answerRenewalRequest) {
        chatRoomService.updateAnswer(answerRenewalRequest);
        return ResponseEntity.ok().build();
    }
}
