//package com.growstory.domain.leaf.controller;
//
//import com.google.gson.Gson;
//import com.growstory.domain.account.dto.AccountDto;
//import com.growstory.domain.leaf.dto.LeafDto;
//import com.growstory.domain.leaf.service.LeafService;
//import com.growstory.domain.point.entity.Point;
//import org.junit.jupiter.api.Test;
//import org.mockito.Mockito;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
//import org.springframework.boot.test.context.SpringBootTest;
//import org.springframework.boot.test.mock.mockito.MockBean;
//import org.springframework.http.HttpMethod;
//import org.springframework.http.MediaType;
//import org.springframework.mock.web.MockMultipartFile;
//import org.springframework.mock.web.MockPart;
//import org.springframework.test.web.servlet.MockMvc;
//import org.springframework.test.web.servlet.ResultActions;
//import org.springframework.web.multipart.MultipartFile;
//
//import javax.servlet.http.Part;
//import java.io.FileInputStream;
//import java.util.ArrayList;
//import java.util.List;
//
//import static org.hamcrest.Matchers.is;
//import static org.mockito.BDDMockito.given;
//import static org.mockito.BDDMockito.willDoNothing;
//import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
//import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
//import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
//import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
//import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
//
//@SpringBootTest
//@AutoConfigureMockMvc
//public class LeafControllerTest {
//    @Autowired
//    private MockMvc mockMvc;
//
//    @Autowired
//    private Gson gson;
//
//    @MockBean
//    private LeafService leafService;
//
//    @Test
//    void 식물카드_생성() throws Exception {
//        // given
//        Long leafId = 1L;
//
//        LeafDto.Post requestDto = LeafDto.Post.builder()
//                .leafName("식물1")
//                .content("본문1")
//                .build();
//
//        LeafDto.Response responseDto = getResponseDto("김별명", leafId, requestDto.getLeafName(), requestDto.getContent(), "s3/path");
//
//        MockMultipartFile testImage = new MockMultipartFile("leafImage",
//                "testImage.jpg",
//                "jpg",
//                new FileInputStream("src/test/resources/images/testImage.jpg"));
//
//
//        given(leafService.createLeaf(Mockito.any(LeafDto.Post.class), Mockito.any(MultipartFile.class)))
//                .willReturn(responseDto);
//
//        // when
//        ResultActions actions = mockMvc.perform(
//                multipart(HttpMethod.POST, "/v1/leaves")
//                        .file(testImage)
//                        .file(new MockMultipartFile("leafPostDto", "", "application/json", gson.toJson(requestDto).getBytes())));
//
//        // then
//        actions
//                .andExpect(status().isCreated())
//                .andExpect(header().string("Location", is("/v1/leaves/" + responseDto.getLeafId().toString())))
//                .andDo(print());
//    }
//
//    @Test
//    void 식물카드_수정() throws Exception {
//        // given
//        LeafDto.Patch requestDto = LeafDto.Patch.builder()
//                .leafId(1L)
//                .leafName("식물1")
//                .content("본문1")
//                .build();
//
//        MockMultipartFile testImage = new MockMultipartFile("leafImage",
//                "testImage.jpg",
//                "jpg",
//                new FileInputStream("src/test/resources/images/testImage.jpg"));
//
//        willDoNothing().given(leafService).updateLeaf(Mockito.any(LeafDto.Patch.class), Mockito.any(MultipartFile.class));
//
//        // when
//        ResultActions actions = mockMvc.perform(
//                multipart(HttpMethod.PATCH, "/v1/leaves")
//                        .file(testImage)
//                        .file(new MockMultipartFile("leafPatchDto", "", "application/json", gson.toJson(requestDto).getBytes())));
//
//        // then
//        actions
//                .andExpect(status().isNoContent())
//                .andDo(print());
//    }
//
//    @Test
//    void 나의_식물카드_조회() throws Exception {
//        // given
//        Long accountId = 1L;
//
//        List<LeafDto.Response> responseDtos = getResponseDtos();
//
//        given(leafService.findLeaves(Mockito.anyLong()))
//                .willReturn(responseDtos);
//
//        // when
//        ResultActions actions = mockMvc.perform(
//                get("/v1/leaves/account/" + accountId));
//
//        // then
//        actions
//                .andExpect(status().isOk())
//                .andExpect(jsonPath("$.data[0].leafName", is("식물1")))
//                .andExpect(jsonPath("$.data[1].leafName", is("식물2")))
//                .andDo(print());
//    }
//
//    @Test
//    void 식물카드_단일_조회() throws Exception {
//        // given
//        Long leafId = 1L;
//
//        LeafDto.Response responseDto = getResponseDto("김별명", 1L, "식물1", "본문1", "s3/path1");
//
//        given(leafService.findLeaf(Mockito.anyLong()))
//                .willReturn(responseDto);
//
//        // when
//        ResultActions actions = mockMvc.perform(
//                get("/v1/leaves/" + leafId));
//
//        // then
//        actions
//                .andExpect(status().isOk())
//                .andExpect(jsonPath("$.data.leafName", is("식물1")))
//                .andDo(print());
//    }
//
//    @Test
//    void 식물카드_삭제() throws Exception {
//        // given
//        Long leafId = 1L;
//
//        willDoNothing().given(leafService).deleteLeaf(Mockito.anyLong());
//
//        // when
//        ResultActions actions = mockMvc.perform(
//                delete("/v1/leaves/" + leafId));
//
//        // then
//        actions
//                .andExpect(status().isNoContent())
//                .andDo(print());
//    }
//
//    private static LeafDto.Response getResponseDto(String displayName, Long leafId, String leafName, String content, String leafImageUrl) {
//        return LeafDto.Response.builder()
//                .displayName(displayName)
//                .leafId(leafId)
//                .leafName(leafName)
//                .content(content)
//                .leafImageUrl(leafImageUrl)
//                .build();
//    }
//
//    private static List<LeafDto.Response> getResponseDtos() {
//        List<LeafDto.Response> responseDtos = new ArrayList<>();
//
//        LeafDto.Response responseDto1 = getResponseDto("김별명", 1L, "식물1", "본문1", "s3/path1");
//        LeafDto.Response responseDto2 = getResponseDto("김별명", 2L, "식물2", "본문2", "s3/path2");
//
//        responseDtos.add(responseDto1);
//        responseDtos.add(responseDto2);
//
//        return responseDtos;
//    }
//}
