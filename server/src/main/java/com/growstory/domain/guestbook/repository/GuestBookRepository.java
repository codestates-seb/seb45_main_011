package com.growstory.domain.guestbook.repository;

import com.growstory.domain.guestbook.entity.GuestBook;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface GuestBookRepository extends JpaRepository<GuestBook, Long> {
//    Optional<List<GuestBook>> findGuestBooksByReceiverAccountId(Long accountId);
}
