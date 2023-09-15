package com.growstory.domain.board.repository;

import com.growstory.domain.board.dto.ResponseBoardDto;
import com.growstory.domain.board.entity.Board;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDateTime;
import java.util.List;


public interface BoardRepository extends JpaRepository<Board, Long> {

    @Query("SELECT b, COUNT(bl) AS likeCount " +
            "FROM Board b " +
            "LEFT JOIN BoardLike bl ON b.boardId = bl.board.boardId " +
            "WHERE b.createdAt >= :sevenDaysAgo " + // 7일 이내
            "GROUP BY b " +
            "ORDER BY likeCount DESC")
    List<Object[]> findTop3LikedBoards(LocalDateTime sevenDaysAgo);
}
