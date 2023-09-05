package com.growstory.domain.journal.service;

import com.growstory.domain.images.entity.JournalImage;
import com.growstory.domain.images.service.JournalImageService;
import com.growstory.domain.journal.dto.JournalDto;
import com.growstory.domain.journal.entity.Journal;
import com.growstory.domain.journal.mapper.JournalMapper;
import com.growstory.domain.journal.repository.JournalRepository;
import com.growstory.domain.leaf.entity.Leaf;
import com.growstory.domain.leaf.service.LeafService;
import com.growstory.global.aws.service.S3Uploader;
import com.growstory.global.exception.BusinessLogicException;
import com.growstory.global.exception.ExceptionCode;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Transactional
@RequiredArgsConstructor
@Service
public class JournalService {

    private final JournalRepository journalRepository;
    private final JournalImageService journalImageService;
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
        Leaf findLeaf = leafService.findLeafEntityBy(leafId);
        Journal journal = createJournalWithNoImg(findLeaf, postDto);
        //image가 null일 경우
        if(image==null|| image.isEmpty()) {
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
        JournalImage savedJournalImage = journalImageService.createJournalImg(journalImage);
//        image 정보 Journal에 업데이트
        journal.updateImg(savedJournalImage);

        return journalMapper.toResponseFrom(journalRepository.save(journal));
    }

    private Journal createJournalWithNoImg(Leaf findLeaf, JournalDto.Post postDto) {
        return journalRepository.save(Journal.builder()
                .title(postDto.getTitle())
                .content(postDto.getContent())
                .leaf(findLeaf)
                .journalImage(null)
                .build());
    }

    public void updateJournal(Long leafId, Long journalId, JournalDto.Patch patchDto, MultipartFile image) {

        Leaf findLeaf = leafService.findLeafEntityBy(leafId);
        Journal findJournal = findVerifiedJournalBy(journalId);

        //TODO: 확인 후 쿼리 3번 날아간다면 리팩토링 필요
        Optional.ofNullable(findLeaf)
                .ifPresent(findJournal::updateLeaf);
        Optional.ofNullable(patchDto.getTitle())
                .ifPresent(findJournal::updateTitle);
        Optional.ofNullable(patchDto.getContent())
                .ifPresent(findJournal::updateContent);

        JournalImage journalImage = findJournal.getJournalImage();
        updateLoadImage(image, journalImage, JOURNAL_IMAGE_PROCESS_TYPE);

    }

    //TODO: S3로 빼는 리팩토링 작업? (상위 클래스 Image를 이용한 형변환)
    // 기존 DB와 S3에 저장된 이미지 정보를 업로드 이미지 여부에 따라 수정
    private void updateLoadImage(MultipartFile image, JournalImage journalImage, String type) {
        if(journalImage != null) { // 기존 사진이 있는 경우
            if(image == null || image.isEmpty())
                return;
            else if (!image.isEmpty()) {
                s3Uploader.deleteImageFromS3(journalImage.getImageUrl(), type);
            }
        } else { // 기존 사진이 없는 경우 (journalImage == null)
            if(image == null || image.isEmpty()) // 수정 요청 이미지가 null || empty 면
                journalImage = null;
            else if (!image.isEmpty()) {
                s3Uploader.uploadImageToS3(image, type);
            }
        }
    }
    public void deleteJournal(Long leafId, Long journalId) {
        Journal journal = findVerifiedJournalBy(journalId);
        journalRepository.delete(journal);
    }

    private Journal findVerifiedJournalBy(Long journalId) {
        return journalRepository.findById(journalId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.JOURNAL_NOT_FOUND));
    }

}
