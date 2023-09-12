package com.growstory.domain.board.repository;

import com.growstory.domain.board.entity.Board_HashTag;
import com.growstory.domain.hashTag.entity.HashTag;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface BoardHashTagRepository extends JpaRepository<Board_HashTag, Long> {
}
