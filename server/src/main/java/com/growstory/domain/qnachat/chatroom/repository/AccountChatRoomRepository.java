package com.growstory.domain.qnachat.chatroom.repository;

import com.growstory.domain.account.entity.Account;
import com.growstory.domain.qnachat.chatroom.entity.AccountChatRoom;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface AccountChatRoomRepository extends JpaRepository<AccountChatRoom, Long> {
    List<AccountChatRoom> findAllByAccount(Account account);
//    List<AccountChatRoom> findAllByChatRoomId(Long chatRoomId);
    //TODO: 리팩토링
    Optional<AccountChatRoom> findOneByAccountAccountIdAndChatRoomChatRoomId(Long accountId, Long chatRoomId);
}
