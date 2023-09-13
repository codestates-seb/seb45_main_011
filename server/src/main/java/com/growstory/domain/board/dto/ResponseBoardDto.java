package com.growstory.domain.board.dto;


import com.growstory.domain.comment.dto.CommentDto;
import com.growstory.domain.comment.dto.ResponseCommentDto;
import com.growstory.domain.comment.entity.Comment;
import com.growstory.domain.hashTag.dto.ResponseHashTagDto;
import com.growstory.domain.hashTag.entity.HashTag;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.List;

@Builder
@Getter
public class ResponseBoardDto {
    private long boardId;
    private String title;
    private String content;
    private String boardImageUrl;
    private boolean isLiked;
    private int likeNum;
    private LocalDateTime createAt;
    private LocalDateTime modifiedAt;

    private Long accountId;
    private String displayName;
    private String profileImageUrl;
    private String grade;

    private List<ResponseHashTagDto> hashTags;

    private List<ResponseCommentDto> comments;

    // 프런트에서 댓글 좋아요 구현 시 사용
    private int commentLikeNum;
}
