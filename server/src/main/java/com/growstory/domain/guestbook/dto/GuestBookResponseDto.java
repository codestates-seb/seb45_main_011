package com.growstory.domain.guestbook.dto;


import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
public class GuestBookResponseDto {

    private Long accountId;
    private Long guestbookId;
    private String content;

    // account
    private String displayName;
    private String imageUrl;
    private String accountGrade;
    private LocalDateTime createdAt;
    private LocalDateTime modifiedAt;
}
