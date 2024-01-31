package com.growstory.domain.point.controller;

import com.growstory.domain.point.service.PointService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;

import static org.mockito.BDDMockito.willDoNothing;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.patch;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
class PointControllerTest {
    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private PointService pointService;

    @DisplayName("회원 전원에게 포인트를 지급한다.")
    @Test
    void patchAllEventPoints() throws Exception {
        //given
        int pointScore = 100;
        String eventKey = "growstoryOpen";

        willDoNothing().given(pointService).updateAllEventPoint(Mockito.anyInt(), Mockito.anyString());

        // when
        ResultActions actions = mockMvc.perform(
                patch("/v1/points/all")
                        .param("point", String.valueOf(pointScore))
                        .param("event-key", eventKey)
                        .contentType(MediaType.APPLICATION_JSON));

        // then
        actions
                .andDo(print())
                .andExpect(status().isNoContent());
    }

    @DisplayName("입력받은 id의 회원에게 포인트를 지급한다.")
    @Test
    void patchEventPoint() throws Exception {
        //given
        Long accountId = 1L;
        int pointScore = 100;
        String eventKey = "growstoryOpen";

        willDoNothing().given(pointService).updateEventPoint(Mockito.anyLong(), Mockito.anyInt(), Mockito.anyString());

        // when
        ResultActions actions = mockMvc.perform(
                patch("/v1/points")
                        .param("account-id", accountId.toString())
                        .param("point", String.valueOf(pointScore))
                        .param("event-key", eventKey)
                        .contentType(MediaType.APPLICATION_JSON));

        // then
        actions
                .andDo(print())
                .andExpect(status().isNoContent());
    }
}