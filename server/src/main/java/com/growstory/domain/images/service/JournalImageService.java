package com.growstory.domain.images.service;

import com.growstory.domain.images.entity.JournalImage;
import com.growstory.domain.images.repository.JournalImageRepository;
import com.growstory.domain.journal.entity.Journal;
import com.growstory.global.auth.utils.AuthUserUtils;
import com.growstory.global.aws.service.S3Uploader;
import com.growstory.global.exception.BusinessLogicException;
import com.growstory.global.exception.ExceptionCode;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

@Transactional
@RequiredArgsConstructor
@Service
public class JournalImageService {

    private final JournalImageRepository journalImageRepository;
    private final S3Uploader s3Uploader;

    // 테이블 인스턴스 생성 및 S3 파일 업로드
    public JournalImage createJournalImgWithS3(MultipartFile image, String type, Journal journal) {
        if(image.isEmpty() || type == null || journal == null)
            return null;
        String imgUrl = s3Uploader.uploadImageToS3(image, type);
        JournalImage journalImage =
                JournalImage.builder()
                        .imageUrl(imgUrl)
                        .originName(image.getOriginalFilename())
                        .journal(journal)
                        .build();
        return journalImageRepository.save(journalImage);
    }

    // 테이블 인스턴스 삭제 및 S3 데이터 삭제
    public void deleteJournalImageWithS3(JournalImage journalImage, String type) {
        if(journalImage == null || type == null) return;

        Journal journal = journalImage.getJournal();
        journal.removeJournalImage(journalImage);

        s3Uploader.deleteImageFromS3(journalImage.getImageUrl(), type);
    }

    public JournalImage findVerifiedImg(long journalImageId) {
       return journalImageRepository.findById(journalImageId).orElseThrow(
               ()-> new BusinessLogicException(ExceptionCode.JOURNAL_IMG_NOT_FOUND)
       );
    }


}
