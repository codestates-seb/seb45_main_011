package com.growstory.domain.rank.board_likes.history.repository;

import com.growstory.domain.rank.board_likes.history.entity.BoardLikesRankHistory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BoardLikesRankHistoryRepository extends JpaRepository<BoardLikesRankHistory, Long> {
}
