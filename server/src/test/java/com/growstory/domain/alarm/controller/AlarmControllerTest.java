package com.growstory.domain.alarm.controller;

import com.google.gson.Gson;
import com.growstory.domain.alarm.dto.AlarmDto;
import com.growstory.domain.alarm.service.AlarmService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;

import java.util.List;

import static org.mockito.BDDMockito.given;
import static org.mockito.BDDMockito.willDoNothing;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
class AlarmControllerTest {
    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private AlarmService alarmService;

    @DisplayName("입력받은 id의 사용자의 모든 알림을 조회한다.")
    @Test
    void getAlarms() throws Exception {
        // given
        Long accountId = 1L;

        List<AlarmDto.Response> responseDtos = List.of();

        given(alarmService.findAlarms(Mockito.anyLong()))
                .willReturn(responseDtos);

        // when
        ResultActions actions = mockMvc.perform(
                get("/v1/alarms/" + accountId));

        // then
        actions
                .andDo(print())
                .andExpect(status().isOk());
    }

    @DisplayName("입력받은 id의 알림을 삭제한다.")
    @Test
    void deleteAlarm() throws Exception {
        // given
        Long alarmId = 1L;

        willDoNothing().given(alarmService).deleteAlarm(Mockito.anyLong());

        // when
        ResultActions actions = mockMvc.perform(
                delete("/v1/alarms/" + alarmId));

        // then
        actions
                .andDo(print())
                .andExpect(status().isNoContent());
    }

    @DisplayName("입력받은 id의 사용자의 모든 알림을 삭제한다.")
    @Test
    void deleteAlarms() throws Exception {
        // given
        Long accountId = 1L;

        willDoNothing().given(alarmService).deleteAlarms(Mockito.anyLong());

        // when
        ResultActions actions = mockMvc.perform(
                delete("/v1/alarms/all/" + accountId));

        // then
        actions
                .andDo(print())
                .andExpect(status().isNoContent());
    }

    @DisplayName("입력받은 id의 사용자의 모든 알림을 읽음으로 표시한다.")
    @Test
    void readAlarms() throws Exception {
        // given
        Long accountId = 1L;

        willDoNothing().given(alarmService).deleteAlarms(Mockito.anyLong());

        // when
        ResultActions actions = mockMvc.perform(
                post("/v1/alarms/" + accountId));

        // then
        actions
                .andDo(print())
                .andExpect(status().isNoContent());
    }
}