package com.growstory.domain.qnachat.chatroom.controller;

import com.growstory.domain.qnachat.chatmessage.dto.ChatMessageResponseDto;
import com.growstory.domain.qnachat.chatmessage.service.ChatMessageService;
import com.growstory.domain.qnachat.chatroom.dto.ChatRoomResponseDto;
import com.growstory.domain.qnachat.chatroom.dto.DeleteChatRoomRequestDto;
import com.growstory.domain.qnachat.chatroom.dto.EntryCheckRequestDto;
import com.growstory.domain.qnachat.chatroom.dto.EntryCheckResponseDto;
import com.growstory.domain.qnachat.chatroom.service.ChatRoomService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RequestMapping("v1/chat-rooms")
@RestController
public class ChatRoomController {
    private final ChatRoomService chatRoomService;
    private final ChatMessageService chatMessageService;

    @Operation(summary = "유저의 모든 채팅방 조회", description = "유저의 모든 채팅방을 조회합니다.")
    @GetMapping("/{account-id}")
    public ResponseEntity<List<ChatRoomResponseDto>> getAllChatRooms(@PathVariable("account-id") Long accountId) {
        return ResponseEntity.ok(chatRoomService.getAllChatRooms(accountId));
    }

    @Operation(summary = "해당 유저의 채팅방 입장 여부 조회", description = "해당 유저가 채팅방에 입장했는지 여부를 조회합니다.")
    @PostMapping("/entry-check")
    public ResponseEntity<EntryCheckResponseDto> checkEntry(@RequestBody EntryCheckRequestDto entryCheckRequest) {
        return ResponseEntity.ok(chatRoomService.checkEntry(entryCheckRequest));
    }


    @Operation(summary = "채팅방 나가기", description = "해당 유저의 채팅방을 삭제합니다.")
    @DeleteMapping("/out")
    public ResponseEntity<ChatMessageResponseDto> deleteChatRoom(@RequestBody DeleteChatRoomRequestDto deleteChatRoomRequest) {
        return ResponseEntity.ok(chatMessageService.deleteChatRoom(deleteChatRoomRequest));
    }
}
