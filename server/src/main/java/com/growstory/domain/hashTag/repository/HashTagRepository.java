package com.growstory.domain.hashTag.repository;

import com.growstory.domain.hashTag.entity.HashTag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface HashTagRepository extends JpaRepository<HashTag, Long> {
//    Optional<List<HashTag>> findByHashTags_BoardId(Long boardId);
    Optional<HashTag> findByTag(String tag);

    @Query("SELECT ht FROM HashTag ht " +
            "JOIN ht.boardHashTags bht " +
            "JOIN bht.board b " +
            "WHERE b.boardId = :boardId")
    List<HashTag> findHashtagsByBoardId(Long boardId);


}
