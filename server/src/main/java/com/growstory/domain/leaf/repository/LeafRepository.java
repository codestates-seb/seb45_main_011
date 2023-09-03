package com.growstory.domain.leaf.repository;

import com.growstory.domain.leaf.entity.Leaf;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LeafRepository extends JpaRepository<Leaf, Long> {
}
