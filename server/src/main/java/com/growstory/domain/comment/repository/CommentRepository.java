package com.growstory.domain.comment.repository;

import com.growstory.domain.comment.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CommentRepository extends JpaRepository<Comment, Long> {

    // boardId에 해당하는 모든 comments를 조회하는 메서드
    Optional<List<Comment>> findCommentsByBoard_BoardId(Long boardId);
}
