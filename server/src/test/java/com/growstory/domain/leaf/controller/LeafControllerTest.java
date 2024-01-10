package com.growstory.domain.leaf.controller;

import com.google.gson.Gson;
import com.growstory.domain.leaf.dto.LeafDto;
import com.growstory.domain.leaf.service.LeafService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpMethod;
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
import static org.mockito.BDDMockito.given;
import static org.mockito.BDDMockito.willDoNothing;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
public class LeafControllerTest {
    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private Gson gson;

    @MockBean
    private LeafService leafService;

    @DisplayName("식물 카드를 생성한다.")
    @Test
    void postLeaf() throws Exception {
        // given
        LeafDto.Post requestDto = LeafDto.Post.builder()
                .leafName("식물1")
                .content("본문1")
                .build();

        MockMultipartFile testImage = new MockMultipartFile("leafImage",
                "testImage.jpg",
                "jpg",
                new FileInputStream("src/test/resources/images/testImage.jpg"));

        LeafDto.Response responseDto = createResponseDto("김별명", 1L, requestDto.getLeafName(), requestDto.getContent(), "s3/path");

        given(leafService.createLeaf(Mockito.any(LeafDto.Post.class), Mockito.any(MultipartFile.class)))
                .willReturn(responseDto);

        // when
        ResultActions actions = mockMvc.perform(
                multipart(HttpMethod.POST, "/v1/leaves")
                        .file(new MockMultipartFile("leafPostDto", "", "application/json", gson.toJson(requestDto).getBytes()))
                        .file(testImage));

        // then
        actions
                .andDo(print())
                .andExpect(status().isCreated())
                .andExpect(header().string("Location", is("/v1/leaves/" + responseDto.getLeafId().toString())));
    }

    @DisplayName("식물 카드 생성시 식물 카드 이름은 필수값이다.")
    @Test
    void postLeafWithoutLeafName() throws Exception {
        // given
        String nullType = null;

        LeafDto.Post requestDto = LeafDto.Post.builder()
                .leafName(nullType)
                .content("본문1")
                .build();

        MockMultipartFile testImage = new MockMultipartFile("leafImage",
                "testImage.jpg",
                "jpg",
                new FileInputStream("src/test/resources/images/testImage.jpg"));

        // when
        ResultActions actions = mockMvc.perform(
                multipart(HttpMethod.POST, "/v1/leaves")
                        .file(new MockMultipartFile("leafPostDto", "", "application/json", gson.toJson(requestDto).getBytes()))
                        .file(testImage));

        // then
        actions
                .andDo(print())
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.fieldErrors[0].field").value("leafName"))
                .andExpect(jsonPath("$.fieldErrors[0].reason").value("식물 카드 이름은 필수입니다."));
    }

    @DisplayName("식물 카드 생성시 식물 카드 내용은 필수값이다.")
    @Test
    void postLeafWithoutContent() throws Exception {
        // given
        String nullType = null;

        LeafDto.Post requestDto = LeafDto.Post.builder()
                .leafName("식물1")
                .content(nullType)
                .build();

        MockMultipartFile testImage = new MockMultipartFile("leafImage",
                "testImage.jpg",
                "jpg",
                new FileInputStream("src/test/resources/images/testImage.jpg"));

        // when
        ResultActions actions = mockMvc.perform(
                multipart(HttpMethod.POST, "/v1/leaves")
                        .file(new MockMultipartFile("leafPostDto", "", "application/json", gson.toJson(requestDto).getBytes()))
                        .file(testImage));

        // then
        actions
                .andDo(print())
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.fieldErrors[0].field").value("content"))
                .andExpect(jsonPath("$.fieldErrors[0].reason").value("식물 카드 내용은 필수입니다."));
    }

    @DisplayName("식물 카드 생성시 식물 카드 이미지는 필수이다.")
    @Test
    void postLeafWithoutImage() throws Exception {
        // given
        MockMultipartFile nullType = null;

        LeafDto.Post requestDto = LeafDto.Post.builder()
                .leafName("식물1")
                .content("본문1")
                .build();

        // when, then
        assertThatThrownBy(() -> mockMvc.perform(
                multipart(HttpMethod.POST, "/v1/leaves")
                        .file(new MockMultipartFile("leafPostDto", "", "application/json", gson.toJson(requestDto).getBytes()))
                        .file(nullType)))
                .isInstanceOf(IllegalArgumentException.class)
                .hasMessage("MultipartFile must not be null");
    }

    @DisplayName("식물 카드를 수정한다.")
    @Test
    void patchLeaf() throws Exception {
        // given
        LeafDto.Patch requestDto = LeafDto.Patch.builder()
                .leafId(1L)
                .leafName("식물1")
                .content("본문1")
                .build();

        willDoNothing().given(leafService).updateLeaf(Mockito.any(LeafDto.Patch.class), Mockito.any(MultipartFile.class));

        // when
        ResultActions actions = mockMvc.perform(
                multipart(HttpMethod.PATCH, "/v1/leaves")
                        .file(new MockMultipartFile("leafPatchDto", "", "application/json", gson.toJson(requestDto).getBytes())));

        // then
        actions
                .andDo(print())
                .andExpect(status().isNoContent());
    }

    @DisplayName("식물 카드를 수정시 식물 카드 아이디는 양수이다.")
    @Test
    void patchLeafWithoutLeafId() throws Exception {
        // given
        Long negative = -1L;

        LeafDto.Patch requestDto = LeafDto.Patch.builder()
                .leafId(negative)
                .leafName("식물1")
                .content("본문1")
                .build();

        // when
        ResultActions actions = mockMvc.perform(
                multipart(HttpMethod.PATCH, "/v1/leaves")
                        .file(new MockMultipartFile("leafPatchDto", "", "application/json", gson.toJson(requestDto).getBytes())));

        // then
        actions
                .andDo(print())
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.fieldErrors[0].field").value("leafId"))
                .andExpect(jsonPath("$.fieldErrors[0].reason").value("식물 카드 아이디는 양수입니다."));
    }

    @DisplayName("식물 카드를 수정시 식물 카드 이름은 필수값이다.")
    @Test
    void patchLeafWithoutLeafName() throws Exception {
        // given
        String nullType = null;

        LeafDto.Patch requestDto = LeafDto.Patch.builder()
                .leafId(1L)
                .leafName(nullType)
                .content("본문1")
                .build();

        // when
        ResultActions actions = mockMvc.perform(
                multipart(HttpMethod.PATCH, "/v1/leaves")
                        .file(new MockMultipartFile("leafPatchDto", "", "application/json", gson.toJson(requestDto).getBytes())));

        // then
        actions
                .andDo(print())
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.fieldErrors[0].field").value("leafName"))
                .andExpect(jsonPath("$.fieldErrors[0].reason").value("식물 카드 이름은 필수입니다."));
    }

    @DisplayName("식물 카드를 수정시 식물 카드 내용은 필수값이다.")
    @Test
    void patchLeafWithoutContent() throws Exception {
        // given
        String nullType = null;

        LeafDto.Patch requestDto = LeafDto.Patch.builder()
                .leafId(1L)
                .leafName("식물1")
                .content(nullType)
                .build();

        // when
        ResultActions actions = mockMvc.perform(
                multipart(HttpMethod.PATCH, "/v1/leaves")
                        .file(new MockMultipartFile("leafPatchDto", "", "application/json", gson.toJson(requestDto).getBytes())));

        // then
        actions
                .andDo(print())
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.fieldErrors[0].field").value("content"))
                .andExpect(jsonPath("$.fieldErrors[0].reason").value("식물 카드 내용은 필수입니다."));
    }

    @DisplayName("로그인된 회원의 모든 식물 카드를 조회한다.")
    @Test
    void getLeaves() throws Exception {
        // given
        Long accountId = 1L;

        List<LeafDto.Response> responseDtos = createResponseDtos();

        given(leafService.findLeaves(Mockito.anyLong()))
                .willReturn(responseDtos);

        // when
        ResultActions actions = mockMvc.perform(
                get("/v1/leaves/account/" + accountId));

        // then
        actions
                .andDo(print())
                .andExpect(status().isOk());
    }

    @DisplayName("입력받은 id의 식물 카드를 조회한다.")
    @Test
    void getLeaf() throws Exception {
        // given
        Long leafId = 1L;

        LeafDto.Response responseDto = createResponseDto("김별명", 1L, "식물1", "본문1", "s3/path1");

        given(leafService.findLeaf(Mockito.anyLong()))
                .willReturn(responseDto);

        // when
        ResultActions actions = mockMvc.perform(
                get("/v1/leaves/" + leafId));

        // then
        actions
                .andDo(print())
                .andExpect(status().isOk());
    }

    @DisplayName("입력받은 id의 식물 카드를 삭제한다.")
    @Test
    void deleteLeaf() throws Exception {
        // given
        Long leafId = 1L;

        willDoNothing().given(leafService).deleteLeaf(Mockito.anyLong());

        // when
        ResultActions actions = mockMvc.perform(
                delete("/v1/leaves/" + leafId));

        // then
        actions
                .andDo(print())
                .andExpect(status().isNoContent());
    }

    private static LeafDto.Response createResponseDto(String displayName, Long leafId, String leafName, String content, String leafImageUrl) {
        return LeafDto.Response.builder()
                .displayName(displayName)
                .leafId(leafId)
                .leafName(leafName)
                .content(content)
                .leafImageUrl(leafImageUrl)
                .build();
    }

    private static List<LeafDto.Response> createResponseDtos() {
        List<LeafDto.Response> responseDtos = new ArrayList<>();

        LeafDto.Response responseDto1 = createResponseDto("김별명", 1L, "식물1", "본문1", "s3/path1");
        LeafDto.Response responseDto2 = createResponseDto("김별명", 2L, "식물2", "본문2", "s3/path2");

        responseDtos.add(responseDto1);
        responseDtos.add(responseDto2);

        return responseDtos;
    }
}
