package com.growstory.domain.account.controller;

import com.google.gson.Gson;
import com.growstory.domain.account.dto.AccountDto;
import com.growstory.domain.account.service.AccountService;
import com.growstory.domain.point.entity.Point;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.web.multipart.MultipartFile;

import java.io.FileInputStream;
import java.util.ArrayList;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.hamcrest.Matchers.is;
import static org.hamcrest.Matchers.not;
import static org.mockito.BDDMockito.given;
import static org.mockito.BDDMockito.willDoNothing;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
public class AccountControllerTest {
    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private Gson gson;

    @MockBean
    private AccountService accountService;

    @DisplayName("신규 회원을 생성한다.")
    @Test
    void postAccount() throws Exception {
        // given
        AccountDto.Post requestDto = AccountDto.Post.builder()
                .email("user1@gmail.com")
                .displayName("user1")
                .password("user1234")
                .build();

        AccountDto.Response responseDto = createResponseDto(1L, "user1@gmail.com", "user1");

        given(accountService.createAccount(Mockito.any(AccountDto.Post.class)))
                .willReturn(responseDto);

        // when
        ResultActions actions = mockMvc.perform(
                post("/v1/accounts/signup")
                        .content(gson.toJson(requestDto))
                        .contentType(MediaType.APPLICATION_JSON)); // contentType은 default가 application/octet-stream

        // then
        actions
                .andDo(print())
                .andExpect(status().isCreated())
                .andExpect(header().string("Location", is("/v1/accounts/" + responseDto.getAccountId().toString())));
    }

    @DisplayName("회원 가입시 이메일은 이메일 형식으로 입력되어야 한다.")
    @Test
    void postAccountWithNotWellFormedEmail() throws Exception {
        // given
        AccountDto.Post requestDto = AccountDto.Post.builder()
                .email("user1")
                .displayName("user1")
                .password("user1234")
                .build();

        // when
        ResultActions actions = mockMvc.perform(
                post("/v1/accounts/signup")
                        .content(gson.toJson(requestDto))
                        .contentType(MediaType.APPLICATION_JSON)); // contentType은 default가 application/octet-stream

        // then
        actions
                .andDo(print())
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.fieldErrors[0].field").value("email"))
                .andExpect(jsonPath("$.fieldErrors[0].reason").value("이메일 형식으로 입력되어야 합니다."));
    }

    @DisplayName("회원 가입시 이메일은 필수값이다.")
    @Test
    void postAccountWithoutEmail() throws Exception {
        // given
        String nullType = null;
        AccountDto.Post requestDto = AccountDto.Post.builder()
                .email(nullType)
                .displayName("user1")
                .password("user1234")
                .build();

        // when
        ResultActions actions = mockMvc.perform(
                post("/v1/accounts/signup")
                        .content(gson.toJson(requestDto))
                        .contentType(MediaType.APPLICATION_JSON)); // contentType은 default가 application/octet-stream

        // then
        actions
                .andDo(print())
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.fieldErrors[0].field").value("email"))
                .andExpect(jsonPath("$.fieldErrors[0].reason").value("이메일은 필수입니다."));
    }

    @DisplayName("회원 가입시 닉네임은 필수값이다.")
    @Test
    void postAccountWithoutDisplayName() throws Exception {
        // given
        String nullType = null;
        AccountDto.Post requestDto = AccountDto.Post.builder()
                .email("user1@gmail.com")
                .displayName(nullType)
                .password("user1234")
                .build();

        // when
        ResultActions actions = mockMvc.perform(
                post("/v1/accounts/signup")
                        .content(gson.toJson(requestDto))
                        .contentType(MediaType.APPLICATION_JSON)); // contentType은 default가 application/octet-stream

        // then
        actions
                .andDo(print())
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.fieldErrors[0].field").value("displayName"))
                .andExpect(jsonPath("$.fieldErrors[0].reason").value("닉네임은 필수입니다."));
    }

    @DisplayName("회원 가입시 비밀번호는 영문, 숫자 포함 6자리 이상이여야 한다.")
    @Test
    void postAccountWithNotWellFormedPassword() throws Exception {
        // given
        AccountDto.Post requestDto = AccountDto.Post.builder()
                .email("user1@gmail.com")
                .displayName("user1")
                .password("useruser")
                .build();

        // when
        ResultActions actions = mockMvc.perform(
                post("/v1/accounts/signup")
                        .content(gson.toJson(requestDto))
                        .contentType(MediaType.APPLICATION_JSON)); // contentType은 default가 application/octet-stream

        // then
        actions
                .andDo(print())
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.fieldErrors[0].field").value("password"))
                .andExpect(jsonPath("$.fieldErrors[0].reason").value("영문, 숫자 포함 6글자 이상의 패스워드만 허용합니다."));
    }

    @DisplayName("회원 가입시 비밀번호는 필수값이다.")
    @Test
    void postAccountWithoutPassword() throws Exception {
        // given
        String nullType = null;
        AccountDto.Post requestDto = AccountDto.Post.builder()
                .email("user1@gmail.com")
                .displayName("user1")
                .password(nullType)
                .build();

        // when
        ResultActions actions = mockMvc.perform(
                post("/v1/accounts/signup")
                        .content(gson.toJson(requestDto))
                        .contentType(MediaType.APPLICATION_JSON)); // contentType은 default가 application/octet-stream

        // then
        actions
                .andDo(print())
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.fieldErrors[0].field").value("password"))
                .andExpect(jsonPath("$.fieldErrors[0].reason").value("비밀번호는 필수입니다."));
    }

    @DisplayName("신규 게스트 회원을 생성한다.")
    @Test
    void postGuestAccount() throws Exception {
        // given
        String accessToken = "AccessToken";
        String refreshToken = "RefreshToken";
        Long accountId = 1L;
        List<String> responses = List.of(accessToken, refreshToken, String.valueOf(accountId));

        given(accountService.createAccount())
                .willReturn(responses);

        // when
        ResultActions actions = mockMvc.perform(
                post("/v1/accounts/guest"));

        // then
        actions
                .andDo(print())
                .andExpect(status().isCreated())
                .andExpect(header().string("Authorization", is(accessToken)))
                .andExpect(header().string("Refresh", is(refreshToken)))
                .andExpect(header().string("Location", is("/v1/accounts/" + String.valueOf(accountId))));
    }

    @DisplayName("회원의 프로필 사진을 수정한다.")
    @Test
    void patchProfileImage() throws Exception {
        // given
        MockMultipartFile profileImage = new MockMultipartFile("profileImage",
                "testImage.jpg",
                "jpg",
                new FileInputStream("src/test/resources/images/testImage.jpg"));

        willDoNothing().given(accountService).updateProfileImage(Mockito.any(MultipartFile.class));

        // when
        ResultActions actions = mockMvc.perform(
                multipart(HttpMethod.PATCH, "/v1/accounts/profileimage")
                        .file(profileImage));

        // then
        actions
                .andDo(print())
                .andExpect(status().isNoContent());
    }

    @DisplayName("프로필 사진 수정 시 이미지는 필수이다.")
    @Test
    void patchProfileImageWithoutImage() throws Exception {
        // given
        MockMultipartFile nullType = null;

        // when, then
        assertThatThrownBy(() -> mockMvc.perform(
                multipart(HttpMethod.PATCH, "/v1/accounts/profileimage")
                        .file(nullType)))
                .isInstanceOf(IllegalArgumentException.class)
                .hasMessage("MultipartFile must not be null");
    }

    @DisplayName("회원의 닉네임을 수정한다.")
    @Test
    void patchDisplayName() throws Exception {
        // given
        AccountDto.DisplayNamePatch requestDto = AccountDto.DisplayNamePatch.builder()
                .displayName("user1")
                .build();

        // when
        ResultActions actions = mockMvc.perform(
                patch("/v1/accounts/displayname")
                        .content(gson.toJson(requestDto))
                        .contentType("application/json"));

        // then
        actions
                .andDo(print())
                .andExpect(status().isNoContent());
    }

    @DisplayName("닉네임 수정 시 닉네임은 필수값이다.")
    @Test
    void patchDisplayNameWithoutDisplayName() throws Exception {
        // given
        String nullType = null;
        AccountDto.DisplayNamePatch requestDto = AccountDto.DisplayNamePatch.builder()
                .displayName(nullType)
                .build();

        // when
        ResultActions actions = mockMvc.perform(
                patch("/v1/accounts/displayname")
                        .content(gson.toJson(requestDto))
                        .contentType("application/json"));

        // then
        actions
                .andDo(print())
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.fieldErrors[0].field").value("displayName"))
                .andExpect(jsonPath("$.fieldErrors[0].reason").value("닉네임은 필수입니다."));
    }

    @DisplayName("회원의 비밀번호를 변경한다.")
    @Test
    void patchPassword() throws Exception {
        // given
        AccountDto.PasswordPatch requestDto = AccountDto.PasswordPatch.builder()
                .presentPassword("user1234")
                .changedPassword("user4321")
                .build();

        // when
        ResultActions actions = mockMvc.perform(
                patch("/v1/accounts/password")
                        .content(gson.toJson(requestDto))
                        .contentType("application/json"));

        // then
        actions
                .andDo(print())
                .andExpect(status().isNoContent());
    }

    @DisplayName("비밀번호 변경 시 현재 비밀번호는 필수값이다.")
    @Test
    void patchPasswordWithoutPresentPassword() throws Exception {
        // given
        String nullType = null;
        AccountDto.PasswordPatch requestDto = AccountDto.PasswordPatch.builder()
                .presentPassword(nullType)
                .changedPassword("user4321")
                .build();

        // when
        ResultActions actions = mockMvc.perform(
                patch("/v1/accounts/password")
                        .content(gson.toJson(requestDto))
                        .contentType("application/json"));

        // then
        actions
                .andDo(print())
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.fieldErrors[0].field").value("presentPassword"))
                .andExpect(jsonPath("$.fieldErrors[0].reason").value("현재 비밀번호는 필수입니다."));
    }

    @DisplayName("비밀번호 변경 시 변경할 비밀번호는 필수값이다.")
    @Test
    void patchPasswordWithoutChangedPassword() throws Exception {
        // given
        String nullType = null;
        AccountDto.PasswordPatch requestDto = AccountDto.PasswordPatch.builder()
                .presentPassword("user1234")
                .changedPassword(nullType)
                .build();

        // when
        ResultActions actions = mockMvc.perform(
                patch("/v1/accounts/password")
                        .content(gson.toJson(requestDto))
                        .contentType("application/json"));

        // then
        actions
                .andDo(print())
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.fieldErrors[0].field").value("changedPassword"))
                .andExpect(jsonPath("$.fieldErrors[0].reason").value("변경할 비밀번호는 필수입니다."));
    }

    @DisplayName("입력한 비밀번호는 영문, 숫자 포함 6자리 이상이여야 한다.")
    @Test
    void patchPasswordWithNotWellFormedPassword() throws Exception {
        // given
        AccountDto.PasswordPatch requestDto = AccountDto.PasswordPatch.builder()
                .presentPassword("us")
                .changedPassword("er")
                .build();

        // when
        ResultActions actions = mockMvc.perform(
                patch("/v1/accounts/password")
                        .content(gson.toJson(requestDto))
                        .contentType("application/json"));

        // then
        actions
                .andDo(print())
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.fieldErrors.length()").value(2))
                .andExpect(jsonPath("$.fieldErrors[0].field").value("changedPassword"))
                .andExpect(jsonPath("$.fieldErrors[1].field").value("presentPassword"))
                .andExpect(jsonPath("$.fieldErrors[0].reason").value("영문, 숫자 포함 6글자 이상의 패스워드만 허용합니다."))
                .andExpect(jsonPath("$.fieldErrors[1].reason").value("영문, 숫자 포함 6글자 이상의 패스워드만 허용합니다."));
    }

    @DisplayName("로그인된 회원의 정보를 조회한다.")
    @Test
    void getAccount() throws Exception {
        // given
        Long accountId = 1L;

        given(accountService.getAccount(Mockito.anyLong()))
                .willReturn(createResponseDto(accountId, "user1@gmail.com", "user1"));

        // when
        ResultActions actions = mockMvc.perform(
                get("/v1/accounts/" + accountId));

        // then
        actions
                .andDo(print())
                .andExpect(status().isOk());
    }

    @DisplayName("전체 회원의 정보를 조회한다.")
    @Test
    void getAccounts() throws Exception {
        // given
        List<AccountDto.Response> responseDtos = List.of();

        given(accountService.getAccounts())
                .willReturn(responseDtos);

        // when
        ResultActions actions = mockMvc.perform(
                get("/v1/accounts/all"));

        // then
        actions
                .andDo(print())
                .andExpect(status().isOk());
    }

    @DisplayName("회원이 작성한 게시글을 조회한다.")
    @Test
    void getBoardWritten() throws Exception {
        // given
        Long accountId = 1L;
        int page = 1;

        List<AccountDto.BoardResponse> responseDtos = createBoardResponseDtos();
        Page<AccountDto.BoardResponse> responsePage = new PageImpl<>(responseDtos, PageRequest.of(page - 1,12), responseDtos.size());

        given(accountService.getAccountBoardWritten(Mockito.anyInt(), Mockito.anyInt(), Mockito.anyLong()))
                .willReturn(responsePage);

        // when
        ResultActions actions = mockMvc.perform(
                get("/v1/accounts/boardWritten/" + accountId));

        // then
        actions
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.pageInfo.page", is(page)))
                .andExpect(jsonPath("$.pageInfo.totalElements", is(responseDtos.size())))
                .andExpect(jsonPath("$.data[0].title", is("제목1")))
                .andExpect(jsonPath("$.data[1].title", is("제목2")));
    }

    @DisplayName("회원이 좋아요를 누른 게시글을 조회한다.")
    @Test
    void getBoardLiked() throws Exception {
        // given
        Long accountId = 1L;
        int page = 1;

        List<AccountDto.BoardResponse> responseDtos = createBoardResponseDtos();
        Page<AccountDto.BoardResponse> responsePage = new PageImpl<>(responseDtos, PageRequest.of(page - 1,12), responseDtos.size());

        given(accountService.getAccountBoardLiked(Mockito.anyInt(), Mockito.anyInt(), Mockito.anyLong()))
                .willReturn(responsePage);

        // when
        ResultActions actions = mockMvc.perform(
                get("/v1/accounts/boardLiked/" + accountId));

        // then
        actions
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data[*]..likes[?(@ >= 1)]").exists())
                .andExpect(jsonPath("$.pageInfo.page", is(page)))
                .andExpect(jsonPath("$.pageInfo.totalElements", is(responseDtos.size())));
    }

    @DisplayName("회원이 댓글을 작성한 게시글을 조회한다.")
    @Test
    void getCommentWrittenBoard() throws Exception {
        // given
        Long accountId = 1L;
        int page = 1;

        List<AccountDto.BoardResponse> responseDtos = createBoardResponseDtos();
        Page<AccountDto.BoardResponse> responsePage = new PageImpl<>(responseDtos, PageRequest.of(page - 1,12), responseDtos.size());

        given(accountService.getAccountCommentWrittenBoard(Mockito.anyInt(), Mockito.anyInt(), Mockito.anyLong()))
                .willReturn(responsePage);

        // when
        ResultActions actions = mockMvc.perform(
                get("/v1/accounts/commentWritten/" + accountId));

        // then
        actions
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data[*].commentNums", is(not(0))))
                .andExpect(jsonPath("$.pageInfo.page", is(page)))
                .andExpect(jsonPath("$.pageInfo.totalElements", is(responseDtos.size())));
    }

    @DisplayName("회원의 현재 비밀번호를 검증한다.")
    @Test
    void verifyPassword() throws Exception {
        // given
        AccountDto.PasswordVerify requestDto = AccountDto.PasswordVerify.builder()
                .password("user1234")
                .build();

        Boolean isMatched = true;

        given(accountService.verifyPassword(Mockito.any(AccountDto.PasswordVerify.class)))
                .willReturn(isMatched);

        // when
        ResultActions actions = mockMvc.perform(
                post("/v1/accounts/password/verification")
                        .contentType("application/json")
                        .content(gson.toJson(requestDto)));

        // then
        actions
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data", is(isMatched)));
    }

    @DisplayName("비밀번호 검증시 비밀번호는 필수값이다.")
    @Test
    void verifyPasswordWithoutPassword() throws Exception {
        // given
        String nullType = null;

        AccountDto.PasswordVerify requestDto = AccountDto.PasswordVerify.builder()
                .password(nullType)
                .build();

        // when
        ResultActions actions = mockMvc.perform(
                post("/v1/accounts/password/verification")
                        .contentType("application/json")
                        .content(gson.toJson(requestDto)));

        // then
        actions
                .andDo(print())
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.fieldErrors[0].field").value("password"))
                .andExpect(jsonPath("$.fieldErrors[0].reason").value("비밀번호는 필수입니다."));
    }

    @DisplayName("입력한 비밀번호는 영문, 숫자 포함 6자리 이상이여야 한다.")
    @Test
    void verifyPasswordWithNotWellFormedPassword() throws Exception {
        // given
        AccountDto.PasswordVerify requestDto = AccountDto.PasswordVerify.builder()
                .password("pa")
                .build();

        // when
        ResultActions actions = mockMvc.perform(
                post("/v1/accounts/password/verification")
                        .contentType("application/json")
                        .content(gson.toJson(requestDto)));

        // then
        actions
                .andDo(print())
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.fieldErrors[0].field").value("password"))
                .andExpect(jsonPath("$.fieldErrors[0].reason").value("영문, 숫자 포함 6글자 이상의 패스워드만 허용합니다."));
    }

    @DisplayName("회원의 회원탈퇴를 수행한다.")
    @Test
    void deleteAccount() throws Exception {
        // given
        willDoNothing().given(accountService).deleteAccount();

        // when
        ResultActions actions = mockMvc.perform(
                delete("/v1/accounts"));

        // then
        actions
                .andDo(print())
                .andExpect(status().isNoContent());
    }

    @DisplayName("게스트의 회원탈퇴를 수행한다.")
    @Test
    void deleteGuestAccount() throws Exception {
        // given
        Long accountId = 1L;

        willDoNothing().given(accountService).deleteAccount(accountId);

        // when
        ResultActions actions = mockMvc.perform(
                delete("/v1/accounts/guest/" + accountId));

        // then
        actions
                .andDo(print())
                .andExpect(status().isNoContent());
    }

    private static AccountDto.Response createResponseDto(Long accountId, String email, String displayName) {
        return AccountDto.Response.builder()
                .accountId(accountId)
                .email(email)
                .displayName(displayName)
                .point(Point.builder().score(500).build())
                .build();
    }

    private static AccountDto.BoardResponse createBoardResponseDto(Long boardId, String title, List<Long> likes, int commentNums) {
        return AccountDto.BoardResponse.builder()
                .boardId(boardId)
                .title(title)
                .likes(likes)
                .commentNums(commentNums)
                .build();
    }

    private static List<AccountDto.BoardResponse> createBoardResponseDtos() {
        List<AccountDto.BoardResponse> responseDtos = new ArrayList<>();

        AccountDto.BoardResponse responseDto1 = createBoardResponseDto(1L, "제목1", List.of(1L), 1);
        AccountDto.BoardResponse responseDto2 = createBoardResponseDto(2L, "제목2", List.of(1L, 2L), 2);

        responseDtos.add(responseDto1);
        responseDtos.add(responseDto2);

        return responseDtos;
    }
}
