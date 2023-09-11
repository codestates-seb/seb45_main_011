package com.growstory.domain.board.repository;

import com.growstory.domain.board.entity.Board_HashTag;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BoardHashTagResitory extends JpaRepository<Board_HashTag, Long> {
}
