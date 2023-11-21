package com.growstory.domain.images.service;

import com.growstory.domain.images.entity.ChatMessageImage;
import com.growstory.domain.images.repository.ChatMessageImageRepository;
import com.growstory.domain.qnachat.chatmessage.entity.ChatMessage;
import com.growstory.global.aws.service.S3Uploader;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

@Transactional
@Slf4j
@RequiredArgsConstructor
@Service
public class ChatMessageImageService {

    private final ChatMessageImageRepository chatMessageImageRepository;
    private final S3Uploader s3Uploader;

    // 테이블 인스턴스 생성 및 S3 파일 업로드
    public ChatMessageImage createChatMessageImgWithS3(MultipartFile image, String type, ChatMessage chatMessage) {
        if(image.isEmpty() || type == null || chatMessage == null) {
            log.info("image:{}, type:{}, chatMessage:{}", image, type, chatMessage);

            throw new NullPointerException("챗 메세지 이미지 생성 중 NPE 발생");
        }
        String imgUrl = s3Uploader.uploadImageToS3(image, type);
        ChatMessageImage chatMessageImage =
                ChatMessageImage.builder()
                        .imageUrl(imgUrl)
                        .originName(image.getOriginalFilename())
                        .chatMessage(chatMessage)
                        .build();

        return chatMessageImageRepository.save(chatMessageImage);
    }

    // 테이블 인스턴스 삭제 및 S3 데이터 삭제
    public void deleteChatMessageImageWithS3(ChatMessageImage chatMessageImage, String type) {
        if(chatMessageImage == null || type == null) {
            log.info("chatMessageImage:{}, type:{}", chatMessageImage, type);
            throw new NullPointerException("챗 메세지 이미지 삭제 중 NPE 발생");
        }

        ChatMessage chatMessage = chatMessageImage.getChatMessage();
//        chatMessage.removeChatMessageImage(chatMessageImage);

        s3Uploader.deleteImageFromS3(chatMessageImage.getImageUrl(), type);

    }
}
