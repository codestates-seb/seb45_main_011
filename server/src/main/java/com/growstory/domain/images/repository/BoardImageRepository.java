package com.growstory.domain.images.repository;

import com.growstory.domain.images.entity.BoardImage;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BoardImageRepository extends JpaRepository<BoardImage, Long> {

}
