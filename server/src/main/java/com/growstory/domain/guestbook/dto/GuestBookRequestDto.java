package com.growstory.domain.guestbook.dto;

import com.growstory.domain.account.entity.Account;
import com.growstory.domain.guestbook.entity.GuestBook;
import com.growstory.domain.plant_object.entity.PlantObj;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;

public class GuestBookRequestDto {

    @Getter
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    public static class Post {
        @NotBlank
        private String content;

        public GuestBook toEntity(Account author, Account receiver) {
            return GuestBook.builder()
                    .content(content)
                    .author(author)
                    .receiver(receiver)
                    .build();
        }


        public Post(String content) {
            this.content = content;
        }
    }

    @Getter
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    public static class Patch {

        @NotBlank
        private String content;
    }
}
