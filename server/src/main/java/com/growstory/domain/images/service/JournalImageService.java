package com.growstory.domain.images.service;

import com.growstory.domain.images.entity.JournalImage;
import com.growstory.domain.images.repository.JournalImageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Transactional
@RequiredArgsConstructor
@Service
public class JournalImageService {

    private final JournalImageRepository journalImageRepository;
    public JournalImage createJournalImg(JournalImage journalImage) {
        return journalImageRepository.save(journalImage);
    }
}
