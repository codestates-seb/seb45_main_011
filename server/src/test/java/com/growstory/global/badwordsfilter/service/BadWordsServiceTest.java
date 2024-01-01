package com.growstory.global.badwordsfilter.service;

import com.growstory.global.badwordsfilter.dto.ProfanityResponse;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.transaction.annotation.Transactional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;

@Transactional
@ActiveProfiles("test")
@SpringBootTest
class BadWordsServiceTest {

    @Autowired
    private BadWordsService badWordsService;

    @BeforeEach
    void setUp() {
        String[] badWordArray = new String[]{"욕설1", "욕설2"};
        String[] allowWordArray = new String[]{"욕설1 욕설X"};
        badWordsService = BadWordsService.of(badWordArray, allowWordArray);
    }

    @DisplayName("사용자가 작성한 텍스트 중 욕설이 하나 이상 포함된 경우 true를 반환한다.")
    @Test
    void isForbidden() {
        //given
        String text = "욕설1이 포함되어 있다면 true를 반환 해야겠죠.";

        //when
        boolean isForbidden = badWordsService.isForbidden(text);

        //then
        assertThat(isForbidden).isTrue();
    }
    @DisplayName("사용자가 작성한 텍스트 중 욕설과 허용 단어가 겹치면 false를 반환한다.")
    @Test
    void isNotForbidden() {
        //given
        String text = "'욕설1 욕설X'이 포함되어 있다면 false를 반환 해야겠죠.";

        //when
        boolean isForbidden = badWordsService.isForbidden(text);

        //then
        assertThat(isForbidden).isFalse();
    }

    @DisplayName("사용자가 작성한 텍스트 중 욕설이 포함되어 있다면 '사용자 입력 욕설/금지된 욕설'을 출력한다.")
    @Test
    void getProfanityWords() {
        //given
        String text = "욕설1이라고 작성했다면 다음과 같이 출력되어야 한다.";
        String expect = "욕설1이라고/욕설1";

        //when
        ProfanityResponse profanityWords = badWordsService.getProfanityWords(text);

        //then
        assertThat(profanityWords.toString()).isEqualTo(expect);
    }
}