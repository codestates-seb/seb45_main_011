package com.growstory.domain.board.repository;

import com.growstory.domain.board.dto.ResponseBoardDto;
import com.growstory.domain.board.entity.Board;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;


public interface BoardRepository extends JpaRepository<Board, Long> {
    @Query("SELECT b FROM Board b WHERE b.title LIKE %:keyword% OR b.content LIKE %:keyword%")
    Page<Board> findByKeyword(@Param("keyword") String keyword, Pageable pageable);

    @Query("SELECT b, COUNT(bl) AS likeCount " +
            "FROM Board b " +
            "LEFT JOIN BoardLike bl ON b.boardId = bl.board.boardId " +
            "WHERE b.createdAt >= :sevenDaysAgo " + // 7일 이내
            "GROUP BY b " +
            "ORDER BY likeCount DESC")
    List<Object[]> findTop3LikedBoards(LocalDateTime sevenDaysAgo);

//    @Query(value = "SELECT * FROM (" +
//            " SELECT b.*, COUNT(bl.board_id) AS likeCount, " +
//            " RANK() OVER (ORDER BY COUNT(bl.board_id) DESC) AS ranking " +
//            " FROM board b " +
//            " LEFT JOIN board_like bl ON b.board_id = bl.board_id " +
//            " WHERE b.created_at >= :sevenDaysAgo " +
//            " GROUP BY b.board_id " +
//            " ORDER BY likeCount DESC " +
//            ") AS subquery " +
//            "WHERE ranking <= 3", nativeQuery = true)
//    List<Object[]> findTop3LikedBoards(LocalDateTime sevenDaysAgo);
}
