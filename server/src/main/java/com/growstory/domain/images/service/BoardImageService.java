package com.growstory.domain.images.service;

import com.growstory.domain.images.entity.BoardImage;
import com.growstory.domain.images.repository.BoardImageRepository;
import com.growstory.global.aws.service.S3Uploader;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Transactional
@RequiredArgsConstructor
@Service
public class BoardImageService {
    private static final String BOARD_IMAGE_PROCESS_TYPE = "boards";

    private final S3Uploader s3Uploader;
    private final BoardImageRepository boardImageRepository;

    public void saveBoardImage(MultipartFile image) {
        String boardImageUrl = s3Uploader.uploadImageToS3(image, BOARD_IMAGE_PROCESS_TYPE);

        BoardImage boardImage = BoardImage.builder()
                .originName(image.getOriginalFilename())
                .storedImagePath(boardImageUrl)
                .build();

        boardImageRepository.save(boardImage);
    }



}
