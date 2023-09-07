package com.growstory.domain.images.repository;

import com.growstory.domain.images.entity.JournalImage;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JournalImageRepository extends JpaRepository<JournalImage, Long> {
}
