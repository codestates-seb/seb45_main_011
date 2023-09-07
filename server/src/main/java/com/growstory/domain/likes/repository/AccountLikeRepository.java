package com.growstory.domain.likes.repository;

import com.growstory.domain.likes.entity.AccountLike;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AccountLikeRepository extends JpaRepository<AccountLike, Long> {
}
