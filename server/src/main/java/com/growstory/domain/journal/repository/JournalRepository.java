package com.growstory.domain.journal.repository;

import com.growstory.domain.journal.entity.Journal;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JournalRepository extends JpaRepository<Journal,Long> {
}
