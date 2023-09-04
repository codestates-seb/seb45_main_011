package com.growstory.domain.journal.service;

import com.growstory.domain.images.entity.JournalImage;
import com.growstory.domain.journal.dto.JournalDto;
import com.growstory.domain.journal.entity.Journal;
import com.growstory.domain.journal.mapper.JournalMapper;
import com.growstory.domain.journal.repository.JournalRepository;
import com.growstory.domain.leaf.entity.Leaf;
import com.growstory.domain.leaf.service.LeafService;
import com.growstory.global.aws.service.S3Uploader;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.stream.Collectors;

@Transactional
@RequiredArgsConstructor
@Service
public class JournalService {

    private final JournalRepository journalRepository;
    private final LeafService leafService;
    private final JournalMapper journalMapper;
    private final S3Uploader s3Uploader;

    private static final String JOURNAL_IMAGE_PROCESS_TYPE = "journal_image";

    @Transactional(readOnly = true)
    public List<JournalDto.Response> findAllJournals(Long leafId) {
        Leaf leaf = leafService.findLeafEntityWithNoAuth(leafId);
        return leaf.getJournals().stream()
                .map(journalMapper::toResponseFrom)
                .collect(Collectors.toList());
    }

    public JournalDto.Response createJournal(Long leafId, JournalDto.Post postDto, MultipartFile image) {
        //TODO: isConnectedToBoard 요청을 어떻게 할 것인지 처리 필요
        boolean isConnectedToBoard = postDto.isConnectedToBoard();
        Leaf findLeaf = leafService.findLeafEntityBy(leafId);
        Journal journal = createJournalWithNoImg(findLeaf, postDto);
        //image가 null일 경우
        if(image==null) {
            return journalMapper.toResponseFrom(journal);
        }
        //image가 null이 아닐 경우 이미지 업로드 및 DB 저장
        String imgUrl = s3Uploader.uploadImageToS3(image, JOURNAL_IMAGE_PROCESS_TYPE);
        JournalImage journalImage =
                JournalImage.builder()
                .imageUrl(imgUrl)
                .originName(image.getOriginalFilename())
                .journal(journal)
                .build();
        //image 정보 Journal에 업데이트
        journal.updateImg(journalImage);

        return journalMapper.toResponseFrom(journalRepository.save(journal));
    }

    private Journal createJournalWithNoImg(Leaf findLeaf, JournalDto.Post postDto) {
        return journalRepository.save(Journal.builder()
                .title(postDto.getTitle())
                .content(postDto.getContent())
                .isConnectedToBoard(postDto.isConnectedToBoard())
                .leaf(findLeaf)
                .journalImage(null)
                .build());
    }
}
