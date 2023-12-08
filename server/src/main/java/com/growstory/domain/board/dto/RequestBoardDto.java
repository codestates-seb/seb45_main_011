package com.growstory.domain.board.dto;

import com.growstory.domain.account.entity.Account;
import com.growstory.domain.board.entity.Board;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.lang.Nullable;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.List;


public class RequestBoardDto {

    @Getter
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    public static class Post {
        @NotBlank
        private String title;

        @NotBlank
        private String content;

        @Nullable
        private List<String> hashTags;


        @Builder
        public Post(String title, String content, @Nullable List<String> hashTags) {
            this.title = title;
            this.content = content;
            this.hashTags = hashTags;
        }

        public Board toEntity(Account account) {
            return Board.builder()
                    .title(title)
                    .content(content)
                    .account(account)
                    .build();
        }
    }

    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    @Getter
    public static class Patch {

//        private Long boardId;

        @Nullable
        private String title;

        @Nullable
        private String content;

        @Nullable
        private List<String> hashTags;

        @NotNull
        private Boolean isImageUpdated;
        // TODO: Lombok getter 명명 규칙


        @Builder
        public Patch(@Nullable String title, @Nullable String content, @Nullable List<String> hashTags, boolean isImageUpdated) {
            this.title = title;
            this.content = content;
            this.hashTags = hashTags;
            this.isImageUpdated = isImageUpdated;
        }
    }
}
