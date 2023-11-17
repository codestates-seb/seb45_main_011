//package com.growstory.domain.qnachat.chatroom.dto;
//
//import com.growstory.domain.account.entity.Account;
//import com.growstory.domain.qnachat.chatmessage.entity.ChatMessage;
//import com.growstory.domain.qnachat.chatroom.entity.AccountChatRoom;
//import com.growstory.domain.qnachat.chatroom.entity.ChatRoom;
//import lombok.AllArgsConstructor;
//import lombok.Builder;
//import lombok.Getter;
//import lombok.NoArgsConstructor;
//
//import java.time.LocalDateTime;
//import java.time.format.DateTimeFormatter;
//import java.util.List;
//import java.util.Set;
//
//@Builder
//@AllArgsConstructor
//@NoArgsConstructor
//@Getter
//public class ChatRoomResponseDto {
//    private Long chatRoomId;
//    private String roomName;
//    private Long otherAccountId;
//    private String otherAccountName;
//    private String createdAt;
//    private String status;
//    private String latestMessage;
//    private LocalDateTime latestTime;
//
//    public static ChatRoomResponseDto from(AccountChatRoom accountChatRoom, AccountChatRoom otherAccountChatRoom) {
//
//        List<ChatMessage> chatMessages = accountChatRoom.getChatRoom().getChatMessages();
//        LocalDateTime tempLatestTime = LocalDateTime.of(2000, 1, 1, 1, 1, 1);
//        String tempLatestMessage = null;
//        for (ChatMessage chatMessage : chatMessages) {
//            if (chatMessage.getChatRoom().getCreatedAt().isAfter(tempLatestTime)) {
//                tempLatestTime = chatMessage.getCreatedAt().withNano(0);
//                tempLatestMessage = chatMessage.getMessage();
//            }
//        }
//        return ChatRoomResponseDto.builder()
//                .chatRoomId(accountChatRoom.getChatRoom().getChatRoomId())
//                .roomName(accountChatRoom.getChatRoom().getRoomName())
//                .otherAccountId(otherAccountChatRoom.getAccount().getAccountId())
//                .otherAccountName(otherAccountChatRoom.getAccount().getDisplayName())
//                .status(accountChatRoom.getChatRoom().getStatus().getMessage())
//                .latestMessage(tempLatestMessage)
//                .latestTime(tempLatestTime)
//                .build();
//    }
//
//    public static ChatRoomResponseDto from(AccountChatRoom accountChatRoom) {
//
//        List<ChatMessage> chatMessages = accountChatRoom.getChatRoom().getChatMessages();
//        LocalDateTime tempLatestTime = LocalDateTime.of(2000, 1, 1, 1, 1, 1);
//        String tempLatestMessage = null;
//
//        for(ChatMessage chatMessage : chatMessages) {
//            if(chatMessage.getCreatedAt().isAfter(tempLatestTime)) {
//                tempLatestTime = chatMessage.getCreatedAt().withNano(0);
//                tempLatestMessage = chatMessage.getMessage();
//            }
//        }
//        return ChatRoomResponseDto.builder()
//                .chatRoomId(accountChatRoom.getChatRoom().getChatRoomId())
//                .latestMessage(tempLatestMessage)
//                .latestTime(tempLatestTime)
//                .build();
//
//    }
//}
