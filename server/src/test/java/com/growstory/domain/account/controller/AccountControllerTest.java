package com.growstory.domain.account.controller;

import com.google.gson.Gson;
import com.growstory.domain.account.dto.AccountDto;
import com.growstory.domain.account.service.AccountService;
import com.growstory.domain.point.entity.Point;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.web.multipart.MultipartFile;

import java.io.FileInputStream;

import static org.hamcrest.Matchers.is;
import static org.mockito.BDDMockito.given;
import static org.mockito.BDDMockito.willDoNothing;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.header;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


@SpringBootTest
@AutoConfigureMockMvc
public class AccountControllerTest {
    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private Gson gson;

    @MockBean
    private AccountService accountService;

    @Test
    void 회원가입() throws Exception {
        // given
        AccountDto.Post requestDto = AccountDto.Post.builder()
                .email("user1@gmail.com")
                .displayName("user1")
                .password("user1234")
                .build();

        AccountDto.Response responseDto = AccountDto.Response.builder()
                .accountId(1L)
                .email("user1@gmail.com")
                .displayName("user1")
                .profileImageUrl(null)
                .point(Point.builder().score(500).build())
                .build();

        given(accountService.createAccount(Mockito.any(AccountDto.Post.class)))
                .willReturn(responseDto);

        // when
        ResultActions actions = mockMvc.perform(
                post("/v1/accounts/signup")
                        .contentType(MediaType.APPLICATION_JSON) // contentType은 default가 application/octet-stream
                        .content(gson.toJson(requestDto)));

        // then
        actions
                .andExpect(status().isCreated())
                .andExpect(header().string("Location", is(("/v1/accounts/" + responseDto.getAccountId().toString()))));
    }

    @Test
    void 프로필_사진_변경() throws Exception {
        // given
        MockMultipartFile testImage = new MockMultipartFile("profileImage",
                "testImage.jpg",
                "jpg",
                new FileInputStream("src/test/resources/images/testImage.jpg"));

        willDoNothing().given(accountService).updateProfileImage(Mockito.any(MultipartFile.class));

        // when
        ResultActions actions = mockMvc.perform(
                multipart(HttpMethod.PATCH, "/v1/accounts/profileimage")
                        .file(testImage));

        // then
        actions
                .andExpect(status().isNoContent());
    }

    @Test
    void 닉네임_수정() throws Exception {
        // given
        AccountDto.DisplayNamePatch requestDto = AccountDto.DisplayNamePatch.builder()
                .displayName("user2")
                .build();

        willDoNothing().given(accountService).updateDisplayName(Mockito.any(AccountDto.DisplayNamePatch.class));

        // when
        ResultActions actions = mockMvc.perform(
                patch("/v1/accounts/displayname")
                        .contentType("application/json")
                        .content(gson.toJson(requestDto)));

        // then
        actions
                .andExpect(status().isNoContent());
    }

    @Test
    void 비밀번호_수정() throws Exception {
        // given
        AccountDto.PasswordPatch requestDto = AccountDto.PasswordPatch.builder()
                .presentPassword("user1234")
                .changedPassword("user4321")
                .build();

        willDoNothing().given(accountService).updatePassword(Mockito.any(AccountDto.PasswordPatch.class));

        // when
        ResultActions actions = mockMvc.perform(
                patch("/v1/accounts/password")
                        .contentType("application/json")
                        .content(gson.toJson(requestDto)));

        // then
        actions
                .andExpect(status().isNoContent());
    }

//    @Test
//    void 나의_계정_조회() throws Exception {
//        // given
//        AccountDto.Response responseDto = AccountDto.Response.builder()
//                .accountId(1L)
//                .email("user1@gmail.com")
//                .displayName("user1")
//                .profileImageUrl(null)
//                .point(Point.builder().score(500).build())
//                .build();
//
////        given(accountService.getAccount())
////                .willReturn(responseDto);
//
//        // when
//        ResultActions actions = mockMvc.perform(
//                get("/v1/accounts"));
//
//        // then
//        actions
//                .andExpect(status().isOk());
////                .andExpect()
//    }


}
