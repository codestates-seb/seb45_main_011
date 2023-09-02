package com.growstory.domain.leaf.service;

import com.growstory.domain.leaf.entity.Leaf;
import com.growstory.domain.leaf.repository.LeafRepository;
import com.growstory.global.exception.BusinessLogicException;
import com.growstory.global.exception.ExceptionCode;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class LeafService {

    private final LeafRepository leafRepository;

    public LeafService(LeafRepository leafRepository) {
        this.leafRepository = leafRepository;
    }

    @Transactional(readOnly = true)
    public Leaf findLeaf(Long leafId) {
        Leaf findLeaf = findVerifiedLeaf(leafId);
        return findLeaf;
    }

    public Leaf findVerifiedLeaf(Long leafId) {
        return leafRepository.findById(leafId).orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.LEAF_NOT_FOUND));
    }
}
