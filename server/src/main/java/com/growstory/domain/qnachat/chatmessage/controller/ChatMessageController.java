package com.growstory.domain.qnachat.chatmessage.controller;

import com.growstory.domain.qnachat.chatmessage.dto.ChatMessageRequestDto;
import com.growstory.domain.qnachat.chatmessage.dto.ChatMessageResponseDto;
import com.growstory.domain.qnachat.chatmessage.service.ChatMessageService;
import com.growstory.global.response.MultiResponseDto;
import com.growstory.global.response.PageResponse;
import com.growstory.global.response.SingleResponseDto;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import lombok.Value;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.util.List;

@Validated
@RequestMapping("v1/chat-messages")
@RequiredArgsConstructor
@RestController
public class ChatMessageController {

    private final ChatMessageService chatMessageService;

    @Operation(summary = "채팅방의 전체 메시지 조회", description = "채팅방의 전체 메시지를 조회합니다.")
    @GetMapping("/{chatroom-id}")
    public ResponseEntity<PageResponse<List<ChatMessageResponseDto>>> getAllChatMessages(@PageableDefault Pageable pageable,
                                                                                         @Positive @PathVariable("chatroom-id") Long chatRoomId) {
        return ResponseEntity.ok(chatMessageService.getAllChatMessage(pageable, chatRoomId));
    }

    @Operation(summary = "입장 메시지 만들기 테스트", description = "메시지 만들기 테스트")
    @PostMapping("/enter-test")
    public ResponseEntity<ChatMessageResponseDto> createEnterMessage(@Valid @RequestPart ChatMessageRequestDto chatMessageRequest,
                                                                                        @RequestPart(required = false, value = "image") MultipartFile image) {
        return ResponseEntity.ok(chatMessageService.createEnterMessage(chatMessageRequest, image));
    }

    @Operation(summary = "보내는 메시지 만들기 테스트", description = "메시지 만들기 테스트")
    @PostMapping("/send-test")
    public ResponseEntity<ChatMessageResponseDto> createSendMessage(@Valid @RequestPart ChatMessageRequestDto chatMessageRequest,
                                                                                       @RequestPart(required = false, value = "image") MultipartFile image) {
        return ResponseEntity.ok(chatMessageService.createSendMessage(chatMessageRequest, image));
    }
}
