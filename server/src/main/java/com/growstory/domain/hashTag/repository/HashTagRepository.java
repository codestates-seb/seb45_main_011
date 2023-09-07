package com.growstory.domain.hashTag.repository;

import com.growstory.domain.hashTag.entity.HashTag;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface HashTagRepository extends JpaRepository<HashTag, Long> {
    Optional<List<HashTag>> findByBoardHashTags_BoardHashTagId(Long boardId);
}
