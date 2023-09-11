package com.growstory.domain.hashTag.service;

import com.growstory.domain.hashTag.entity.HashTag;
import com.growstory.domain.hashTag.repository.HashTagRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.util.List;

@Service
@RequiredArgsConstructor
public class HashTagService {

    private final HashTagRepository hashTagRepository;

    public void createHashTag(String requestTag) {
        HashTag hashTag = HashTag.builder()
                .tag(requestTag)
                .build();
        hashTagRepository.save(hashTag);
    }

    public List<HashTag> getHashTags(Long boardId) {
        return hashTagRepository.findByBoardHashTags_BoardHashTagId(boardId)
                .orElseThrow(() -> new EntityNotFoundException("Not found HashTag"));
    }
}
