package com.growstory.domain.comment.repository;

import com.growstory.domain.comment.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CommentRepository extends JpaRepository<Comment, Long> {
    Optional<List<Comment>> findCommentsByBoard_BoardId(Long boardId);
}
