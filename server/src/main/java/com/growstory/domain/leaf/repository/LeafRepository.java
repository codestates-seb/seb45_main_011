package com.growstory.domain.leaf.repository;

import com.growstory.domain.account.entity.Account;
import com.growstory.domain.leaf.entity.Leaf;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LeafRepository extends JpaRepository<Leaf, Long> {
    List<Leaf> findByAccount(Account account);
}
