package com.growstory.domain.likes.controller;

import com.growstory.domain.likes.service.LikeService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;

import static org.mockito.BDDMockito.willDoNothing;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
class LikeControllerTest {
    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private LikeService likeService;

    @DisplayName("입력받은 게시글에 사용자가 좋아요를 누르거나 취소한다.")
    @Test
    void postBoardLike() throws Exception {
        // given
        Long boardId = 1L;

        willDoNothing().given(likeService).pressBoardLike(Mockito.anyLong());

        // when
        ResultActions actions = mockMvc.perform(
                post("/v1/likes/boards/" + boardId));

        // then
        actions
                .andDo(print())
                .andExpect(status().isNoContent());
    }

    @DisplayName("입력받은 댓글에 사용자가 좋아요를 누르거나 취소한다.")
    @Test
    void postCommentLike() throws Exception {
        // given
        Long commentId = 1L;

        willDoNothing().given(likeService).pressCommentLike(Mockito.anyLong());

        // when
        ResultActions actions = mockMvc.perform(
                post("/v1/likes/comments/" + commentId));

        // then
        actions
                .andDo(print())
                .andExpect(status().isNoContent());
    }

    @DisplayName("입력받은 계정의 정원에 사용자가 좋아요를 누르거나 취소한다.")
    @Test
    void postAccountLike() throws Exception {
        // given
        Long accountId = 1L;

        willDoNothing().given(likeService).pressAccountLike(Mockito.anyLong());

        // when
        ResultActions actions = mockMvc.perform(
                post("/v1/likes/gardens/" + accountId));

        // then
        actions
                .andDo(print())
                .andExpect(status().isNoContent());
    }
}