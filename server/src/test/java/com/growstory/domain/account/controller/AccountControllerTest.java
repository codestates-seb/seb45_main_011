package com.growstory.domain.account.controller;

import com.google.gson.Gson;
import com.growstory.domain.account.dto.AccountDto;
import com.growstory.domain.account.service.AccountService;
import com.growstory.domain.point.entity.Point;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.*;
import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
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

    @MockBean
    private PasswordEncoder passwordEncoder;

    @BeforeEach
    void signUpAccount() {

    }

//    @Test
//    @DisplayName("회원가입 성공")
//    void postAccountSuccessTest() throws Exception {
//        // given
//        AccountDto.Post requestDto = AccountDto.Post.builder()
//                .email("user@gmail.com")
//                .displayName("user1")
//                .password("user1234")
//                .build();
//
//        AccountDto.Response responseDto = AccountDto.Response.builder()
//                .accountId(1L)
//                .email("user@gmail.com")
//                .displayName("user1")
//                .profileImageUrl(null)
//                .point(Point.builder().score(500).build())
//                .build();
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
//                .andExpect(header().string("Location", is(("/v1/accounts/" + responseDto.getAccountId().toString()))));
//    }

//    @Test
//    @DisplayName("회원가입 실패 (이메일 중복)")
//    void postAccountFailTest() throws Exception {
//        // given
//        AccountDto.Post requestDto = AccountDto.Post.builder()
//                .email("user2@gmail.com")
//                .displayName("user2")
//                .password("user1234")
//                .build();
//
//        given(accountService.createAccount(Mockito.any(AccountDto.Post.class)))
//                .willThrow(new BusinessLogicException(ExceptionCode.ACCOUNT_ALREADY_EXISTS));
//
//        // when
//        ResultActions actions = mockMvc.perform(
//                post("/v1/accounts/signup")
//                        .contentType(MediaType.APPLICATION_JSON)
//                        .content(gson.toJson(requestDto)))
//        // then
//                .andExpect(result ->
//                        assertThat(result.getResolvedException(), is(instanceOf(BusinessLogicException.class))));
//    }

}
