package com.growstory.domain.likes.repository;

import com.growstory.domain.likes.entity.CommentLike;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentLikeRepository extends JpaRepository<CommentLike, Long> {
}
