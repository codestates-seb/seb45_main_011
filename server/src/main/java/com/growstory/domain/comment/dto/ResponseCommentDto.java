package com.growstory.domain.comment.dto;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class ResponseCommentDto {
    private Long commentId;
    private String content;
    private Long accountId;
    private String displayName;
    private String profileUrl;
    private String grade;
    private LocalDateTime createdAt;
    private LocalDateTime modifiedAt;
    private int commentLikeNum;

    @Builder
    public ResponseCommentDto(Long commentId, String content, Long accountId, String displayName, String profileUrl, String grade, LocalDateTime createdAt, LocalDateTime modifiedAt, int commentLikeNum) {
        this.commentId = commentId;
        this.content = content;
        this.accountId = accountId;
        this.displayName = displayName;
        this.profileUrl = profileUrl;
        this.grade = grade;
        this.createdAt = createdAt;
        this.modifiedAt = modifiedAt;
        this.commentLikeNum = commentLikeNum;
    }
}
