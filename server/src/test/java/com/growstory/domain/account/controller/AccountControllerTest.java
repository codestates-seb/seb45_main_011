//package com.growstory.domain.account.controller;
//
//import com.google.gson.Gson;
//import com.growstory.domain.account.dto.AccountDto;
//import com.growstory.domain.account.service.AccountService;
//import com.growstory.domain.point.entity.Point;
//import org.junit.jupiter.api.Test;
//import org.mockito.Mockito;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
//import org.springframework.boot.test.context.SpringBootTest;
//import org.springframework.boot.test.mock.mockito.MockBean;
//import org.springframework.data.domain.Page;
//import org.springframework.data.domain.PageImpl;
//import org.springframework.data.domain.PageRequest;
//import org.springframework.http.HttpMethod;
//import org.springframework.http.MediaType;
//import org.springframework.mock.web.MockMultipartFile;
//import org.springframework.test.web.servlet.MockMvc;
//import org.springframework.test.web.servlet.ResultActions;
//import org.springframework.web.multipart.MultipartFile;
//
//import java.io.FileInputStream;
//import java.util.ArrayList;
//import java.util.List;
//
//import static org.hamcrest.Matchers.is;
//import static org.hamcrest.Matchers.not;
//import static org.mockito.BDDMockito.given;
//import static org.mockito.BDDMockito.willDoNothing;
//import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
//import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
//import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
//
//@SpringBootTest
//@AutoConfigureMockMvc
//public class AccountControllerTest {
//    @Autowired
//    private MockMvc mockMvc;
//
//    @Autowired
//    private Gson gson;
//
//    @MockBean
//    private AccountService accountService;
//
//    @Test
//    void 회원가입() throws Exception {
//        // given
//        AccountDto.Post requestDto = AccountDto.Post.builder()
//                .email("user1@gmail.com")
//                .displayName("user1")
//                .password("user1234")
//                .build();
//
//        AccountDto.Response responseDto = getResponseDto(1L, "user1@gmail.com", "user1");
//
//        given(accountService.createAccount(Mockito.any(AccountDto.Post.class)))
//                .willReturn(responseDto);
//
//        // when
//        ResultActions actions = mockMvc.perform(
//                post("/v1/accounts/signup")
//                        .contentType(MediaType.APPLICATION_JSON) // contentType은 default가 application/octet-stream
//                        .content(gson.toJson(requestDto)));
//
//        // then
//        actions
//                .andExpect(status().isCreated())
//                .andExpect(header().string("Location", is("/v1/accounts/" + responseDto.getAccountId().toString())))
//                .andDo(print());
//    }
//
//    @Test
//    void 프로필_사진_변경() throws Exception {
//        // given
//        MockMultipartFile testImage = new MockMultipartFile("profileImage",
//                "testImage.jpg",
//                "jpg",
//                new FileInputStream("src/test/resources/images/testImage.jpg"));
//
//        willDoNothing().given(accountService).updateProfileImage(Mockito.any(MultipartFile.class));
//
//        // when
//        ResultActions actions = mockMvc.perform(
//                multipart(HttpMethod.PATCH, "/v1/accounts/profileimage")
//                        .file(testImage));
//
//        // then
//        actions
//                .andExpect(status().isNoContent())
//                .andDo(print());
//    }
//
//    @Test
//    void 닉네임_수정() throws Exception {
//        // given
//        AccountDto.DisplayNamePatch requestDto = AccountDto.DisplayNamePatch.builder()
//                .displayName("user2")
//                .build();
//
//        willDoNothing().given(accountService).updateDisplayName(Mockito.any(AccountDto.DisplayNamePatch.class));
//
//        // when
//        ResultActions actions = mockMvc.perform(
//                patch("/v1/accounts/displayname")
//                        .contentType("application/json")
//                        .content(gson.toJson(requestDto)));
//
//        // then
//        actions
//                .andExpect(status().isNoContent())
//                .andDo(print());
//    }
//
//    @Test
//    void 비밀번호_수정() throws Exception {
//        // given
//        AccountDto.PasswordPatch requestDto = AccountDto.PasswordPatch.builder()
//                .presentPassword("user1234")
//                .changedPassword("user4321")
//                .build();
//
//        willDoNothing().given(accountService).updatePassword(Mockito.any(AccountDto.PasswordPatch.class));
//
//        // when
//        ResultActions actions = mockMvc.perform(
//                patch("/v1/accounts/password")
//                        .contentType("application/json")
//                        .content(gson.toJson(requestDto)));
//
//        // then
//        actions
//                .andExpect(status().isNoContent())
//                .andDo(print());
//    }
//
//    @Test
//    void 나의_계정_조회() throws Exception {
//        // given
//        Long accountId = 1L;
//
//        AccountDto.Response responseDto = getResponseDto(accountId, "user1@gmail.com", "user1");
//
//        given(accountService.getAccount(Mockito.anyLong()))
//                .willReturn(responseDto);
//
//        // when
//        ResultActions actions = mockMvc.perform(
//                get("/v1/accounts/" + accountId));
//
//        // then
//        actions
//                .andExpect(status().isOk())
//                .andExpect(jsonPath("$.data.email", is("user1@gmail.com")))
//                .andDo(print());
//    }
//
//    @Test
//    void 전체_계정_조회() throws Exception {
//        // given
//        List<AccountDto.Response> responseDtos = getResponseDtos();
//
//        given(accountService.getAccounts())
//                .willReturn(responseDtos);
//
//        // when
//        ResultActions actions = mockMvc.perform(
//                get("/v1/accounts/all"));
//
//        // then
//        actions
//                .andExpect(status().isOk())
//                .andExpect(jsonPath("$.data[0].email", is("user1@gmail.com")))
//                .andExpect(jsonPath("$.data[1].email", is("user2@gmail.com")))
//                .andDo(print());
//    }
//
//    @Test
//    void 계정이_작성한_게시글_조회() throws Exception {
//        // given
//        Long accountId = 1L;
//        int page = 1;
//
//        List<AccountDto.BoardResponse> responseDtos = getBoardResponseDtos();
//
//        Page<AccountDto.BoardResponse> responsePage = new PageImpl<>(responseDtos, PageRequest.of(page - 1,12), responseDtos.size());
//
//        given(accountService.getAccountBoardWritten(Mockito.anyInt(), Mockito.anyInt(), Mockito.anyLong()))
//                .willReturn(responsePage);
//
//        // when
//        ResultActions actions = mockMvc.perform(
//                get("/v1/accounts/boardWritten/" + accountId));
//
//        // then
//        actions
//                .andExpect(status().isOk())
//                .andExpect(jsonPath("$.data[0].title", is("제목1")))
//                .andExpect(jsonPath("$.data[1].title", is("제목2")))
//                .andExpect(jsonPath("$.pageInfo.page", is(page)))
//                .andExpect(jsonPath("$.pageInfo.totalElements", is(responseDtos.size())))
//                .andDo(print());
//    }
//
//    @Test
//    void 계정이_좋아요_누른_게시글_조회() throws Exception {
//        // given
//        Long accountId = 1L;
//        int page = 1;
//
//        List<AccountDto.BoardResponse> responseDtos = getBoardResponseDtos();
//
//        Page<AccountDto.BoardResponse> responsePage = new PageImpl<>(responseDtos, PageRequest.of(page - 1,12), responseDtos.size());
//
//        given(accountService.getAccountBoardLiked(Mockito.anyInt(), Mockito.anyInt(), Mockito.anyLong()))
//                .willReturn(responsePage);
//
//        // when
//        ResultActions actions = mockMvc.perform(
//                get("/v1/accounts/boardLiked/" + accountId));
//
//        // then
//        actions
//                .andExpect(status().isOk())
//                .andExpect(jsonPath("$.data[*]..likes[?(1 == @)]").exists())
//                .andExpect(jsonPath("$.pageInfo.page", is(page)))
//                .andExpect(jsonPath("$.pageInfo.totalElements", is(responseDtos.size())))
//                .andDo(print());
//    }
//
//    @Test
//    void 계정이_댓글_작성한_게시글_조회() throws Exception {
//        // given
//        Long accountId = 1L;
//        int page = 1;
//
//        List<AccountDto.BoardResponse> responseDtos = getBoardResponseDtos();
//
//        Page<AccountDto.BoardResponse> responsePage = new PageImpl<>(responseDtos, PageRequest.of(page - 1,12), responseDtos.size());
//
//        given(accountService.getAccountCommentWrittenBoard(Mockito.anyInt(), Mockito.anyInt(), Mockito.anyLong()))
//                .willReturn(responsePage);
//
//        // when
//        ResultActions actions = mockMvc.perform(
//                get("/v1/accounts/commentWritten/" + accountId));
//
//        // then
//        actions
//                .andExpect(status().isOk())
//                .andExpect(jsonPath("$.data[*].commentNums", is(not(0))))
//                .andExpect(jsonPath("$.pageInfo.page", is(page)))
//                .andExpect(jsonPath("$.pageInfo.totalElements", is(responseDtos.size())))
//                .andDo(print());
//    }
//
//    @Test
//    void 비밀번호_검증() throws Exception {
//        // given
//        AccountDto.PasswordVerify requestDto = AccountDto.PasswordVerify.builder()
//                .password("user1234")
//                .build();
//
//        Boolean isMatched = true;
//
//        given(accountService.verifyPassword(Mockito.any(AccountDto.PasswordVerify.class)))
//                .willReturn(isMatched);
//
//        // when
//        ResultActions actions = mockMvc.perform(
//                post("/v1/accounts/password/verification")
//                        .contentType("application/json")
//                        .content(gson.toJson(requestDto)));
//
//        // then
//        actions
//                .andExpect(status().isOk())
//                .andExpect(jsonPath("$.data", is(isMatched)))
//                .andDo(print());
//    }
//
//    @Test
//    void 회원탈퇴() throws Exception {
//        // given
//        willDoNothing().given(accountService).deleteAccount();
//
//        // when
//        ResultActions actions = mockMvc.perform(
//                delete("/v1/accounts"));
//
//        // then
//        actions
//                .andExpect(status().isNoContent())
//                .andDo(print());
//    }
//
//    private static AccountDto.Response getResponseDto(Long accountId, String email, String displayName) {
//        return AccountDto.Response.builder()
//                .accountId(accountId)
//                .email(email)
//                .displayName(displayName)
//                .point(Point.builder().score(500).build())
//                .build();
//    }
//
//    private static List<AccountDto.Response> getResponseDtos() {
//        List<AccountDto.Response> responseDtos = new ArrayList<>();
//
//        AccountDto.Response responseDto1 = getResponseDto(1L, "user1@gmail.com", "user1");
//        AccountDto.Response responseDto2 = getResponseDto(2L, "user2@gmail.com", "user2");
//
//        responseDtos.add(responseDto1);
//        responseDtos.add(responseDto2);
//
//        return responseDtos;
//    }
//
//    private static AccountDto.BoardResponse getBoardResponseDto(Long boardId, String title, List<Long> likes, int commentNums) {
//        return AccountDto.BoardResponse.builder()
//                .boardId(boardId)
//                .title(title)
//                .likes(likes)
//                .commentNums(commentNums)
//                .build();
//    }
//
//    private static List<AccountDto.BoardResponse> getBoardResponseDtos() {
//        List<AccountDto.BoardResponse> responseDtos = new ArrayList<>();
//
//        AccountDto.BoardResponse responseDto1 = getBoardResponseDto(1L, "제목1", List.of(1L), 1);
//        AccountDto.BoardResponse responseDto2 = getBoardResponseDto(2L, "제목2", List.of(1L, 2L), 2);
//
//        responseDtos.add(responseDto1);
//        responseDtos.add(responseDto2);
//
//        return responseDtos;
//    }
//}
