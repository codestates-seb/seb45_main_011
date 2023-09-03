package com.growstory.domain.images.service;

import com.amazonaws.SdkClientException;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.amazonaws.services.s3.model.PutObjectResult;
import com.growstory.domain.images.entity.BoardImage;
import com.growstory.domain.images.repository.BoardImageRepository;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.UUID;

@AllArgsConstructor
@Getter
@Slf4j
@Service
public class BoardImageService {
    @Value("${cloud.aws.s3.bucketName}")
    private String bucketName;

    private final AmazonS3 amazonS3;
    private final BoardImageRepository boardImageRepository;


    @Autowired
    public BoardImageService(AmazonS3 amazonS3, BoardImageRepository boardImageRepository) {
        this.amazonS3 = amazonS3;
        this.boardImageRepository = boardImageRepository;
    }


    public String uploadImageToS3(MultipartFile image) {
        String originName = image.getOriginalFilename(); //원본 파일 이름
        String ext = originName.substring(originName.lastIndexOf(".")); // 확장자
        String changedName = changedImageName(originName); // 변경된 이름
        ObjectMetadata metadata = new ObjectMetadata(); // 메타데이터
        metadata.setContentType("image/" + ext);


//        log.info("storedImagePath = " + storedImagePath);

        try {
            PutObjectResult putObjectRequest = amazonS3.putObject(new PutObjectRequest(
                    bucketName, changedName, image.getInputStream(), metadata
            ).withCannedAcl(CannedAccessControlList.PublicRead));
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
//        s3://growstory/image/


        String string = amazonS3.getUrl(bucketName, changedName).toString();
        BoardImage boardImage = new BoardImage();
        boardImage.setStoredImagePath(string);
        boardImage.setOriginName(originName);

        boardImageRepository.save(boardImage);
        return string;
    }

    public void deleteImage(String fileName) throws IOException {
        boolean isObjectExist = amazonS3.doesObjectExist(bucketName, fileName);


        try {
            if (isObjectExist) {
                amazonS3.deleteObject(bucketName, fileName);
            }
        } catch (SdkClientException e) {
            throw new IOException("Image delete failed", e);
        }
    }

    // 이미지 이름 변경
    // 이미지 이름이 겹칠 경우 충돌이 발생하기 때문에 고유 난수를 uuid로 생성하여 originName과 합해준다.
    private static String changedImageName(String originName) {
        String random = UUID.randomUUID().toString();
        return random + originName;
    }
}
