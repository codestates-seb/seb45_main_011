package com.growstory.domain.board.dto;


import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Builder
@Getter
public class ResponseBoardDto {
    private long boardId;

    private String title;
    private String imageUrl;
    private String displayName;
    private LocalDateTime createAt;
    private LocalDateTime modifiedAt;

    private String leafName;
    private String leafImage;


    private int likeNum;

    private String tag;


}
