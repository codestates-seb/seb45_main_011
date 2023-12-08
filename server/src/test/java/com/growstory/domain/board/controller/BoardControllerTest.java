//package com.growstory.domain.board.controller;
//
//import com.google.gson.Gson;
//import com.growstory.domain.board.service.BoardService;
//import org.junit.jupiter.api.DisplayName;
//import org.junit.jupiter.api.Test;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
//import org.springframework.boot.test.context.SpringBootTest;
//import org.springframework.boot.test.mock.mockito.MockBean;
//import org.springframework.test.web.servlet.MockMvc;
//
//import java.util.ArrayList;
//import java.util.Arrays;
//import java.util.List;
//
//import static org.junit.jupiter.api.Assertions.*;
//
//
//@SpringBootTest
//@AutoConfigureMockMvc
//class BoardControllerTest {
//
//    // CICD plz
//    @Autowired
//    private MockMvc mockMvc;
//
//    @Autowired
//    private Gson gson;
//
//    @MockBean
//    private BoardService boardService;
//
//    private final String BOARD_DEFAULT_URL = "/v1/boards";
//
//
//    @DisplayName("게시판 등록")
//    @Test
//    void 게시판_등록() throws Exception {
//
//        // given
//        String title = "게시글 제목";
//        String content = "게시글 본문";
//        List<String> hashTagList = new ArrayList<>();
//        hashTagList.add("tag1");
//        hashTagList.add("tag2");
//
//        // when
//
//        // then
//
//    }
//
//    @Test
//    void getBoard() {
//    }
//
//    @Test
//    void getBoards() {
//    }
//
//    @Test
//    void getBoardsByKeyword() {
//    }
//
//    @Test
//    void patchBoard() {
//    }
//
//    @Test
//    void deleteBoard() {
//    }
//
//    @Test
//    void getTop3LikedBoardsOfWeek() {
//    }
//}