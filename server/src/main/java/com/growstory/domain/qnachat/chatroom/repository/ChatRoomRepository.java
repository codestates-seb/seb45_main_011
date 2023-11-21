package com.growstory.domain.qnachat.chatroom.repository;

import com.growstory.domain.qnachat.chatroom.entity.ChatRoom;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ChatRoomRepository extends JpaRepository<ChatRoom, Long> {
    // ChatRoom 상세 조회
    ChatRoom findByRoomName(String roomName);

    // ChatRoom 목록 조회
    List<ChatRoom> findAllByRoomName(String roomName);

    List<ChatRoom> findAllByRoomName(String roomName, Sort sort);

    // ChatRoom 목록 조회, 포함 일치
    List<ChatRoom> findAllByRoomNameContaining(String roomName);

    List<ChatRoom> findAllByRoomNameContaining(String roomName, Sort sort);
}
