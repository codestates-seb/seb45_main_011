package com.growstory.global.aws.service;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.amazonaws.services.s3.model.PutObjectResult;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class S3Uploader {
    private final AmazonS3Client amazonS3Client;

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    // MultipartFile을 전달받아 File로 전환한 후 S3에 업로드
    public String uploadImageToS3(MultipartFile image, String type) {
        String originName = image.getOriginalFilename(); //원본 파일 이름
        String ext = originName.substring(originName.lastIndexOf(".")); // 확장자
        String changedName = changedImageName(originName); // 변경된 이름

        ObjectMetadata metadata = new ObjectMetadata(); // 메타데이터
        metadata.setContentType(ext);

        try {
            PutObjectResult putObjectRequest = amazonS3Client.putObject(new PutObjectRequest(
                    bucket + "/" + type, changedName, image.getInputStream(), metadata)
                    .withCannedAcl(CannedAccessControlList.PublicRead)
            );
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        String imageUrl = amazonS3Client.getUrl(bucket + "/" + type, changedName).toString();

        return imageUrl;
    }

    public void deleteImageFromS3(String imageUrl, String type) {
        if (imageUrl.contains("https://s3.ap-northeast-2.amazonaws.com/"+ bucket))
            amazonS3Client.deleteObject(bucket + "/" + type, imageUrl.split("/")[6]);
    }

    // 이미지 이름 변경
    // 이미지 이름이 겹칠 경우 충돌이 발생하기 때문에 고유 난수를 uuid로 생성하여 originName과 합해준다.
    private static String changedImageName(String originName) {
        String random = UUID.randomUUID().toString();
        return random + originName;
    }
}
