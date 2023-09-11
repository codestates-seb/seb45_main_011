package com.growstory.domain.journal.service;

import com.growstory.domain.account.service.AccountService;
import com.growstory.domain.images.entity.JournalImage;
import com.growstory.domain.images.service.JournalImageService;
import com.growstory.domain.journal.dto.JournalDto;
import com.growstory.domain.journal.entity.Journal;
import com.growstory.domain.journal.mapper.JournalMapper;
import com.growstory.domain.journal.repository.JournalRepository;
import com.growstory.domain.leaf.entity.Leaf;
import com.growstory.domain.leaf.service.LeafService;
import com.growstory.domain.point.service.PointService;
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
    private final AccountService accountService;
    private final PointService pointService;

    private static final String JOURNAL_IMAGE_PROCESS_TYPE = "journal_image";

    @Transactional(readOnly = true)
    public List<JournalDto.Response> findAllJournals(Long accountId, Long leafId) {
        Leaf leaf = leafService.findLeafEntityWithNoAuth(leafId);
        return leaf.getJournals().stream()
                .map(journalMapper::toResponseFrom)
                .collect(Collectors.toList());
    }

    public JournalDto.Response createJournal(Long accountId, Long leafId, JournalDto.Post postDto, MultipartFile image) {
        accountService.isAuthIdMatching(accountId);
        Leaf findLeaf = leafService.findLeafEntityBy(leafId);
        Journal journal = createJournalWithNoImg(findLeaf, postDto);
        //image가 null이거나 비어있을 경우 ResponseDto로 변환하여 반환
        if(image==null|| image.isEmpty()) {
            return journalMapper.toResponseFrom(journal);
        }
        //image가 null이 아닐 경우 이미지 업로드 및 DB 저장
        JournalImage savedJournalImage = journalImageService.createJournalImgWithS3(image, JOURNAL_IMAGE_PROCESS_TYPE, journal);
        //image 정보 Journal에 업데이트
        journal.updateImg(savedJournalImage);

        return journalMapper.toResponseFrom(journalRepository.save(journal));
    }

    private Journal createJournalWithNoImg(Leaf findLeaf, JournalDto.Post postDto) {
        pointService.updatePoint(findLeaf.getAccount().getPoint(), "journal");
        return journalRepository.save(Journal.builder()
                .title(postDto.getTitle())
                .content(postDto.getContent())
                .leaf(findLeaf)
                .journalImage(null)
                .build());
    }

    public void updateJournal(Long accountId, Long journalId, JournalDto.Patch patchDto, MultipartFile image) {
        Journal findJournal = findVerifiedJournalBy(journalId);
        accountService.isAuthIdMatching(accountId);

        Optional.ofNullable(patchDto.getTitle())
                .ifPresent(findJournal::updateTitle);
        Optional.ofNullable(patchDto.getContent())
                .ifPresent(findJournal::updateContent);

        updateLoadImage(image, findJournal, JOURNAL_IMAGE_PROCESS_TYPE);
    }

    //TODO: S3Uploader로 빼는 리팩토링 작업? (상위 클래스 Image를 이용한 형변환)
    // 기존 DB와 S3에 저장된 이미지 정보를 업로드 이미지 여부에 따라 수정
    private void updateLoadImage(MultipartFile image, Journal journal, String type) {
        JournalImage journalImage = journal.getJournalImage();

        // image == null (수정하지 않았을 경우) return
        if(image == null) return;

        // image를 수정하지 않았으면서 기존 이미지도 보유하고 있는 경우 삭제
        if(image != null && journalImage != null)
            journalImageService.deleteJournalImageWithS3(journalImage, type);

        // image가 존재하면 등록
        if(!image.isEmpty())
            journalImageService.createJournalImgWithS3(image, type, journal);

    }

    public void deleteJournal(Long accountId, Long journalId) {
        accountService.isAuthIdMatching(accountId);
        Journal journal = findVerifiedJournalBy(journalId);
        //저널에 귀속되어 있는 이미지들도 S3에서 삭제해야 한다.
        JournalImage journalImage = journal.getJournalImage();
        journalImageService.deleteJournalImageWithS3(journalImage, JOURNAL_IMAGE_PROCESS_TYPE);
        journalRepository.delete(journal);
    }

    private Journal findVerifiedJournalBy(Long journalId) {
        return journalRepository.findById(journalId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.JOURNAL_NOT_FOUND));
    }

}
