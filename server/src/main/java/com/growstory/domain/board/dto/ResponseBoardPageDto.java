package com.growstory.domain.board.dto;


import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
public class ResponseBoardPageDto {

    private Long boardId;

    private String title;

    private String content;

    private String boardImageUrl;


    private int likeNum;

    private int commentNum;
}
