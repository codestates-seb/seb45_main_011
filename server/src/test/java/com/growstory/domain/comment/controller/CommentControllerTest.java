//package com.growstory.domain.comment.controller;
//
//import com.google.gson.Gson;
//import com.growstory.domain.comment.dto.CommentDto;
//import com.growstory.domain.comment.service.CommentService;
//import org.junit.jupiter.api.Test;
//import org.mockito.Mockito;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
//import org.springframework.boot.test.context.SpringBootTest;
//import org.springframework.boot.test.mock.mockito.MockBean;
//import org.springframework.http.MediaType;
//import org.springframework.security.test.context.support.WithMockUser;
//import org.springframework.test.web.servlet.MockMvc;
//import org.springframework.test.web.servlet.ResultActions;
//import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
//import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
//
//import static org.hamcrest.Matchers.is;
//import static org.hamcrest.Matchers.startsWith;
//import static org.mockito.BDDMockito.given;
//import static org.mockito.Mockito.doNothing;
//import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.patch;
//import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
//import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
//import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.header;
//import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
//
//
//@SpringBootTest
//@AutoConfigureMockMvc
//class CommentControllerTest {
//
//    @Autowired
//    private MockMvc mockMvc;
//
//
//    @Autowired
//    private Gson gson;
//
//    @MockBean
//    private CommentService commentService;
//
//
//    @Test
//    void postComment() throws Exception {
//
//        // given
//        String content = "Comment Test";
//        Long boardId = 1L;
//        Long commentId = 1L;
//
//        CommentDto.Post commentDto = new CommentDto.Post(content);
//
//
//        // when
//        given(commentService.saveComment(Mockito.eq(boardId), Mockito.any(CommentDto.Post.class)))
//                .willReturn(commentId);
//
//        String content1 = gson.toJson(boardId);
//        String content2 = gson.toJson(commentDto);
//
//        // then
//        ResultActions actions =
//                mockMvc.perform(
//                        post("/v1/comments/boards/{boardId}", boardId)
//                                .accept(MediaType.APPLICATION_JSON)     // 요청에서 받을 응답 데이터 타입을 JSON으로 설정합니다. 이것은 클라이언트가 JSON 형식의 응답을 기대한다고 나타냅니다.
//                                .contentType(MediaType.APPLICATION_JSON)    // 요청 데이터의 타입을 JSON으로 설정합니다. 이것은 요청의 본문(content)이 JSON 형식임을 나타냅니다.
//                                .content(content1)
//                                .content(content2)
//                );
//
//        actions
//                .andExpect(status().isCreated())
//                .andExpect(header().string("Location", is(startsWith("/v1/comments/"))))
//                .andDo(print());
//    }
//
//    @Test
//    @WithMockUser(username = "testuser", roles = "USER") // 사용자 권한으로 요청 보내기
//    void patchComment() throws Exception{
//        // given
//        Long commentId = 1L;
//        String content = "TestContent";
//        CommentDto.Patch commentDto = new CommentDto.Patch(content);
//
//
//        // when
//        doNothing().when(commentService).editComment(commentId, commentDto);
//
//        String content1 = gson.toJson(commentId);
//        String content2 = gson.toJson(commentDto);
//
//
//        // then
//        ResultActions actions =
//                mockMvc.perform(
//                patch("/v1/comments/{commentId}", commentId)
//                        .accept(MediaType.APPLICATION_JSON)     // 요청에서 받을 응답 데이터 타입을 JSON으로 설정합니다. 이것은 클라이언트가 JSON 형식의 응답을 기대한다고 나타냅니다.
//                        .contentType(MediaType.APPLICATION_JSON)    // 요청 데이터의 타입을 JSON으로 설정합니다. 이것은 요청의 본문(content)이 JSON 형식임을 나타냅니다
//                        .content(content1)
//                        .content(content2)
//        );
//
//        actions
//                .andExpect(MockMvcResultMatchers.status().isNoContent())
//                .andDo(print());
//    }
//
//    @Test
//    @WithMockUser(username = "testuser", roles = "USER") // 사용자 권한으로 요청 보내기
//    void deleteComment() throws Exception {
//        // given
//        Long commentId = 1L;
//
//        // when
//        doNothing().when(commentService).deleteComment(commentId);
//
//        // then
//        ResultActions actions = mockMvc.perform(
//                        MockMvcRequestBuilders.delete("/v1/comments/{commentId}", commentId)
//                );
//        actions
//                .andExpect(MockMvcResultMatchers.status().isNoContent())
//                .andDo(print());
//    }
//}