package com.growstory.domain.likes.repository;

import com.growstory.domain.likes.entity.BoardLike;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BoardLikeRepository extends JpaRepository<BoardLike, Long> {
}
