//package com.growstory.domain.images.entity;
//
//import com.growstory.domain.qnachat.chatmessage.entity.ChatMessage;
//import lombok.AccessLevel;
//import lombok.Builder;
//import lombok.Getter;
//import lombok.NoArgsConstructor;
//
//import javax.persistence.*;
//
//@Getter
//@NoArgsConstructor(access = AccessLevel.PROTECTED)
//@Entity
//public class ChatMessageImage {
//
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private long chatImageId;
//
//    @Column(name ="origin_name", nullable = false)
//    private String originName;
//
//    @Column(name = "image_url", nullable = false)
//    private String imageUrl;
//
//    @OneToOne
//    @JoinColumn(name = "chat_message_id", nullable = false)
//    private ChatMessage chatMessage;
//
//    @Builder
//    public ChatMessageImage(long chatImageId, String originName, String imageUrl, ChatMessage chatMessage) {
//        this.chatImageId = chatImageId;
//        this.originName = originName;
//        this.imageUrl = imageUrl;
//        this.chatMessage = chatMessage;
//    }
//
//    /**
//     * 연관관계 메소드
//     * @param chatMessage : ChatMessageImage가 참조하는 메시지 객체
//     */
//    public void updateChatMessage(ChatMessage chatMessage) {
//        this.chatMessage = chatMessage;
//    }
//}
