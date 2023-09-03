package com.growstory.domain.hashTag.service;

import com.growstory.domain.hashTag.entity.HashTag;
import com.growstory.domain.hashTag.repository.HashTagRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class HashTagService {

    private final HashTagRepository hashTagRepository;

    public void createHashTag(String tag) {
        HashTag hashTag = new HashTag();
        hashTag.setTag(tag);

        hashTagRepository.save(hashTag);
    }

}
