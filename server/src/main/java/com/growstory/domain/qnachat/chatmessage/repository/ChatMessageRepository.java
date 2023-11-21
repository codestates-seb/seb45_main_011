//package com.growstory.domain.qnachat.chatmessage.repository;
//
//import com.growstory.domain.qnachat.chatmessage.entity.ChatMessage;
//import com.growstory.domain.qnachat.chatroom.entity.ChatRoom;
//import org.springframework.data.domain.Page;
//import org.springframework.data.domain.Pageable;
//import org.springframework.data.domain.Sort;
//import org.springframework.data.jpa.repository.JpaRepository;
//
//import java.util.List;
//
//public interface ChatMessageRepository extends JpaRepository<ChatMessage, Long> {
//    //채팅방 페이지 조회
//    Page<ChatMessage> findByChatRoom(Pageable pageable, ChatRoom chatRoom);
//
//
//    //채팅방 조건 메시지 조회
//    List<ChatMessage> findAllByChatRoom(ChatRoom chatRoom);
//
//    List<ChatMessage> findAllByChatRoom(ChatRoom chatRoom, Sort sort);
//
//    //메시지 내용 조건 메시지 조회
//    List<ChatMessage> findAllByMessageContaining(String message);
//
//    List<ChatMessage> findAllByMessageContaining(String message, Sort sort);
//}
