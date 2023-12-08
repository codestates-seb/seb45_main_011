package com.growstory.domain.journal;

import com.google.gson.Gson;
import com.growstory.domain.journal.dto.JournalDto;
import com.growstory.domain.journal.service.JournalService;
import com.growstory.domain.stubdata.Stub;
import com.growstory.global.utils.UriCreator;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.URI;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

import static org.hamcrest.Matchers.*;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
@SpringBootTest
@AutoConfigureMockMvc
public class JournalControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private Gson gson;

    @MockBean
    private JournalService journalService;

    @MockBean
    private UriCreator uriCreator;

    private final String DEFAULT_URL = "/v1/leaves";

    @DisplayName("식물 일지 전체 조회")
    @Test
    void getJournalsTest() throws Exception {
        //given
        Long accountId = 1L;
        Long leafId = 1L;
        List<JournalDto.Response> journals = Stub.MockJournal.getStubJournalResponseDtos();
        given(journalService.findAllJournals(anyLong(), anyLong()))
                .willReturn(journals);
        //when
        ResultActions actions = mockMvc.perform(
                get(DEFAULT_URL + "/{leaf-id}/journals", leafId)
                        .param("accountId", accountId.toString())
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON)
        );

        //then
        actions.andExpect(status().isOk())
                .andExpect(jsonPath("$.data[0].journalId", is(1)))
                .andExpect(jsonPath("$.data[0].title", is(journals.get(0).getTitle())))
                .andDo(print());
    }

    @DisplayName("식물 일지 등록 기능")
    @Nested
    class PostJournalTest {

        long leafId;
//        JournalDto.LeafAuthor leafAuthor;
        JournalDto.Post requestDto;
        MockMultipartFile leafAuthorPart;
        MockMultipartFile requestDtoPart;
        MockMultipartFile imagePart;
        JournalDto.Response mockJournalResponse;

        @BeforeEach
        void init() {
            leafId = 1L;
//            leafAuthor = JournalDto.LeafAuthor.builder().accountId(1L).build();
            requestDto = JournalDto.Post.builder().title("식물 일지 제목").content("내용").build();

            // MockMultipartFile 객체화
//            leafAuthorPart = createMockMultipartFile("leafAuthor", gson.toJson(leafAuthor), "application/json");
            requestDtoPart = createMockMultipartFile("postDto", gson.toJson(requestDto), "application/json");
            imagePart = createImageMockFile("src/test/resources/images/testImage.jpg");

            //given
            mockJournalResponse = Stub.MockJournal.getStubJournalResponse1();
            given(journalService.createJournal(anyLong(), Mockito.any(JournalDto.Post.class), Mockito.any(MultipartFile.class)))
                    .willReturn(mockJournalResponse);

            URI stubUri = URI.create("/v1/leaves/1/journals/1");
            given(uriCreator.createUri_test(Mockito.any(String.class), Mockito.anyLong())).willReturn(stubUri);
        }

        private MockMultipartFile createMockMultipartFile(String name, String content, String contentType) {
            return new MockMultipartFile(name, name + ".json", contentType, content.getBytes(StandardCharsets.UTF_8));
        }

        private MockMultipartFile createImageMockFile(String pathString) {
            Path path = Paths.get(pathString);
            byte[] content;
            try {
                content = Files.readAllBytes(path);
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
            return new MockMultipartFile("image", "testImage.jpg", "image/jpeg", content);
        }

        @Test
        void 이미지_있는_식물_일지_등록() throws Exception {

            //when
            ResultActions actions = mockMvc.perform(
                    multipart(DEFAULT_URL + "/{leaf-id}/journals", leafId)
//                            .file(leafAuthorPart)
                            .file(requestDtoPart)
                            .file(imagePart)
                            .contentType("multipart/form-data")
                            .accept(MediaType.APPLICATION_JSON)
                            .characterEncoding("UTF-8")
            );

            //then
            URI expectedLocation = UriCreator.createUri(DEFAULT_URL + "/1/journals/", mockJournalResponse.getJournalId());
            actions
                    .andExpect(status().isCreated())
                    .andExpect(header().string("Location", is(expectedLocation.toString())))
                    .andDo(print());
        }

//        @Test
//        void 이미지가_없는_식물_일지_등록() throws Exception {
//            // given, imagePart를 null로 설정
//            MockMultipartFile imagePart = null;
//
//            ResultActions actions = mockMvc.perform(
//                    multipart(DEFAULT_URL + "/{leaf-id}/journals", leafId)
//                            .file(leafAuthorPart)
//                            .file(requestDtoPart)
//                            // image part를 추가하지 않음
//                            .file(imagePart)
//                            .contentType("multipart/form-data")
//                            .accept(MediaType.APPLICATION_JSON)
//                            .characterEncoding("UTF-8")
//            );
//
//            // then
//            actions
//                    .andExpect(status().isCreated()) // or isBadRequest(), depending on the expected outcome
//                    .andDo(print());
//        }

        @Test
        void 이미지가_빈_식물_일지_등록() throws Exception {
            // given, imagePart를 빈 내용으로 설정
            MockMultipartFile imagePart = new MockMultipartFile("image", "testImage.jpg", "image/jpeg", new byte[0]);

            // when
            ResultActions actions = mockMvc.perform(
                    multipart(DEFAULT_URL + "/{leaf-id}/journals", leafId)
//                            .file(leafAuthorPart)
                            .file(requestDtoPart)
                            .file(imagePart) // empty image part
                            .contentType("multipart/form-data")
                            .accept(MediaType.APPLICATION_JSON)
                            .characterEncoding("UTF-8")
            );

            // then
            actions
                    .andExpect(status().isCreated()) // or isBadRequest(), depending on the expected outcome
                    .andDo(print());
        }
    }


}
