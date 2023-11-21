package com.growstory.domain.qnachat.chatroom.controller;

import com.growstory.domain.qnachat.chatmessage.dto.ChatMessageResponseDto;
import com.growstory.domain.qnachat.chatmessage.service.ChatMessageService;
import com.growstory.domain.qnachat.chatroom.dto.*;
import com.growstory.domain.qnachat.chatroom.service.ChatRoomService;
import com.growstory.global.utils.UriCreator;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
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
    public ResponseEntity<List<ChatRoomResponseDto>> getAllChatRooms(@PathVariable("account-id") Long accountId) {
        return ResponseEntity.ok(chatRoomService.getAllChatRooms(accountId));
    }

    @Operation(summary = "qna 채팅방 생성", description = "관리자와 문의자의 1:1 문의 채팅방을 생성합니다.")
    @PostMapping
    public ResponseEntity<HttpStatus> createQnaChatRoom(@RequestBody CreateQnaChatRequest createQnaChatRequest) {
        Long chatRoomId = chatRoomService.createQnaChatRoom(createQnaChatRequest);
        URI location = UriCreator.createUri(DEFAULT_URL, chatRoomId);
        return ResponseEntity.created(location).build();
    }

    @Operation(summary = "유저의 채팅방 입장 여부 조회", description = "특정 유저가 채팅방에 입장했는지 여부를 조회합니다.")
    @PostMapping("/entry-check")
    public ResponseEntity<EntryCheckResponseDto> checkEntry(@RequestBody EntryCheckRequestDto entryCheckRequest) {
        return ResponseEntity.ok(chatRoomService.checkEntry(entryCheckRequest));
    }


    @Operation(summary = "채팅방 나가기", description = "특정 유저의 채팅방을 삭제 상태로 변경 합니다.")
    @PatchMapping("/out")
    public ResponseEntity<ChatMessageResponseDto> deleteChatRoom(@RequestBody DeleteChatRoomRequestDto deleteChatRoomRequest) {
        return ResponseEntity.ok(chatMessageService.sendExitChatRoomMessage(deleteChatRoomRequest));
    }
}
