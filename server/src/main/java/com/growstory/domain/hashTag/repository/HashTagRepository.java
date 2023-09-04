package com.growstory.domain.hashTag.repository;

import com.growstory.domain.hashTag.entity.HashTag;
import org.springframework.data.jpa.repository.JpaRepository;

public interface HashTagRepository extends JpaRepository<HashTag, Long> {
}
