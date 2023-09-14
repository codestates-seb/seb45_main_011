package com.growstory.domain.images.repository;

import com.growstory.domain.images.entity.BoardImage;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface BoardImageRepository extends JpaRepository<BoardImage, Long> {
    Optional<BoardImage> findBoardImageByBoard_BoardId(Long boardId);
}
