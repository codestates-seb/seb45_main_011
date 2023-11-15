package com.growstory.domain.images.service;

import com.growstory.domain.images.entity.ChatMessageImage;
import com.growstory.domain.images.repository.ChatMessageImageRepository;
import com.growstory.domain.qnachat.chatmessage.entity.ChatMessage;
import com.growstory.global.aws.service.S3Uploader;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

@Transactional
@RequiredArgsConstructor
@Service
public class ChatMessageImageService {

    private final ChatMessageImageRepository chatMessageImageRepository;
    private final S3Uploader s3Uploader;

    public ChatMessageImage createChatMessageImgWithS3(MultipartFile image, String type, ChatMessage chatMessage) {
        if(image.isEmpty() || type == null || chatMessage == null) return null;
        String imgUrl = s3Uploader.uploadImageToS3(image, type);
        ChatMessageImage chatMessageImage =
                ChatMessageImage.builder()
                        .imageUrl(imgUrl)
                        .originName(image.getOriginalFilename())
                        .chatMessage(chatMessage)
                        .build();

        return chatMessageImageRepository.save(chatMessageImage);
    }

    public void deleteChatMessageImageWithS3(ChatMessageImage chatMessageImage, String type) {
        if(chatMessageImage == null || type == null) return;

        ChatMessage chatMessage = chatMessageImage.getChatMessage();
//        chatMessage.removeChatMessageImage(chatMessageImage);

        s3Uploader.deleteImageFromS3(chatMessageImage.getImageUrl(), type);

    }
}
