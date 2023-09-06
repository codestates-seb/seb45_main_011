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
    private final AccountService accountService;

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
        JournalImage savedJournalImage = journalImageService.createJournalImgWithS3(image, JOURNAL_IMAGE_PROCESS_TYPE, journal);
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

    public void updateJournal(Long accountId, Long journalId, JournalDto.Patch patchDto, MultipartFile image) {
        accountService.isAuthIdMatching(accountId);
        Journal findJournal = findVerifiedJournalBy(journalId);

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
        if (image == null || image.isEmpty()) { //전송 이미지가 없을 경우
            if (journalImage != null) {
                // 업로드 이미지가 전송되지 않은 경우 테이블 삭제 및 기존 S3에서 해당 파일 삭제
                journalImageService.deleteJournalImageWithS3(journalImage, type);
            }
            // 수정 요청 이미지가 null 또는 empty이면 값을 수정하지 않는다.
            return;
        }
        // (image != null && !image.isEmpty()) : 업로드 이미지가 전송된 경우
        if (journalImage != null) { // 기존 이미지가 존재하는 경우
            //TODO: 기존 이미지와 일치하는지 비교 후 삭제하고 싶은데 방법이 없을까? (원본이름 또는 URL의 비교?)
            // 원본 이름은 비교하는 의미가 없고, URL은 UUID를 통한 변화한 이름이 포함되기 때문에 비교 불가능.
            // 클라이언트에서 이미지 수정을 하지 않으면 image를 null 또는 isEmpty() 형태로 보내주면 되겠구나! -> 애초에 수정한 게시물만 이 단계로 오게된다.

            // 업로드 이미지가 전송된 경우 기존 이미지 삭제 후 재업로드
            journalImageService.deleteJournalImageWithS3(journalImage, type);
        }
        // 업로드 이미지가 존재하면 JournalImage DB에 업데이트 이후 S3에 업로드한다.
        journalImageService.createJournalImgWithS3(image, type, journal);
    }

    public void deleteJournal(Long journalId) {
        Journal journal = findVerifiedJournalBy(journalId);
        //TODO: 저널에 딸린 이미지들도 S3에서 삭제해야 한다.
        JournalImage journalImage = journal.getJournalImage();
        journalImageService.deleteJournalImageWithS3(journalImage, JOURNAL_IMAGE_PROCESS_TYPE);
        journalRepository.delete(journal);
    }

    private Journal findVerifiedJournalBy(Long journalId) {
        return journalRepository.findById(journalId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.JOURNAL_NOT_FOUND));
    }

}
