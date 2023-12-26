package com.growstory.domain.rank.board_likes.repository;

import com.growstory.domain.rank.board_likes.entity.BoardLikesRank;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BoardLikesRankRepository extends JpaRepository<BoardLikesRank, Long> {
}
