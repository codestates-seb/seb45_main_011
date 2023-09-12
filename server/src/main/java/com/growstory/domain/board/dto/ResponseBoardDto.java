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
    private int likeNum;
    private LocalDateTime createAt;
    private LocalDateTime modifiedAt;

    private Long accountId;
    private String displayName;
    private String profileImageUrl;

    private List<ResponseHashTagDto> hashTags;

    private List<ResponseCommentDto> comments;
    private int commentLikeNum;
}
