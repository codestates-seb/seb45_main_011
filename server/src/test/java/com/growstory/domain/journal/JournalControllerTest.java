package com.growstory.domain.journal;

import com.google.gson.Gson;
import com.growstory.domain.journal.dto.JournalDto;
import com.growstory.domain.journal.service.JournalService;
import com.growstory.domain.stubdata.Stub;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;

import java.util.List;

import static org.hamcrest.Matchers.*;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.BDDMockito.given;
import static org.mockito.BDDMockito.willDoNothing;
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

    private final String JOURNAL_DEFAULT_URL = "/v1/leaves";

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
                get(JOURNAL_DEFAULT_URL + "/{leaf-id}/journals", leafId)
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
}
