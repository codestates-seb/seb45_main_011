package com.growstory.domain.journal.repository;

import com.growstory.domain.journal.entity.Journal;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface JournalRepository extends JpaRepository<Journal,Long> {
    List<Journal> findAllByOrderByCreatedAtDesc();
}
