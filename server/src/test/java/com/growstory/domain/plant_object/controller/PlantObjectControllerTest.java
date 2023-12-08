//package com.growstory.domain.plant_object.controller;
//
//import com.google.gson.Gson;
//import com.growstory.domain.plant_object.dto.PlantObjDto;
//import com.growstory.domain.plant_object.service.PlantObjService;
//import com.growstory.domain.point.dto.PointDto;
//import com.growstory.domain.stubdata.Stub;
//import org.junit.jupiter.api.DisplayName;
//import org.junit.jupiter.api.Test;
//import org.mockito.Mockito;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
//import org.springframework.boot.test.context.SpringBootTest;
//import org.springframework.boot.test.mock.mockito.MockBean;
//import org.springframework.http.MediaType;
//import org.springframework.test.web.servlet.MockMvc;
//import org.springframework.test.web.servlet.ResultActions;
//
//import java.util.List;
//
//import static org.hamcrest.Matchers.is;
//import static org.mockito.BDDMockito.anyLong;
//import static org.mockito.BDDMockito.given;
//import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
//import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
//import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
//import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
//
//@SpringBootTest
//@AutoConfigureMockMvc
//public class PlantObjectControllerTest {
//
//    @Autowired
//    private MockMvc mockMvc;
//
//    @Autowired
//    private Gson gson;
//
//    @MockBean
//    private PlantObjService plantObjService;
//
//    private final String DEFAULT_URL = "/v1/gardens";
//
//    @DisplayName("정원 전체 정보 조회 API 테스트")
//    @Test
//    void getGardenInfoTest() throws Exception {
//        //given
//        Long accountId = 1L;
//        PlantObjDto.GardenInfoResponse response = Stub.MockPlantObj.getStubGardenInfo();
//        given(plantObjService.findAllGardenInfo(Mockito.anyLong()))
//                .willReturn(response);
//        //when
//        ResultActions actions = mockMvc.perform(
//                get(DEFAULT_URL +"/{account-id}" ,accountId));
//        //then
//        actions
//                .andExpect(status().isOk())
//                .andExpect(jsonPath("$.data.plantObjs[0].plantObjId", is(1)))
//                .andExpect(jsonPath("$.data.plantObjs[1].plantObjId", is(2)))
//                .andDo(print());
//    }
//
//    @DisplayName("유저 포인트로 오브젝트 구입 API 테스트")
//    @Test
//    void postPurchaseObjTest() throws Exception {
//        //given
//        Long accountId = 1L;
//        Long productId = 1L;
//        PlantObjDto.TradeResponse response = Stub.MockPlantObj.getStubTradeResponse();
//        given(plantObjService.buyProduct(Mockito.anyLong(), Mockito.anyLong()))
//                .willReturn(response);
//
//        //when
//        ResultActions actions = mockMvc.perform(
//                post(DEFAULT_URL +"/{account-id}/purchase", accountId)
//                        .param("product-id", productId.toString())
//                        .contentType(MediaType.APPLICATION_JSON)
//                        .accept(MediaType.APPLICATION_JSON)
//        );
//
//        //then
//        actions.andExpect(status().isCreated())
//                .andExpect(jsonPath("$.data.plantObj.productId", is(productId.intValue())))
//                .andDo(print());
//    }
//
//    @DisplayName("오브젝트 되팔기 API 테스트")
//    @Test
//    void deleteRefundObj() throws Exception {
//        //given
//        Long accountId = 1L;
//        Long plantObjId = 1L;
//        PointDto.Response response = PointDto.Response.builder().score(500).build();
//        given(plantObjService.refundPlantObj(anyLong(), anyLong()))
//                .willReturn(response);
//
//        //when
//        ResultActions actions = mockMvc.perform(
//            delete(DEFAULT_URL+"/{account-id}/refund", accountId)
//                    .param("plantobj-id", plantObjId.toString())
//                    .contentType(MediaType.APPLICATION_JSON)
//                    .accept(MediaType.APPLICATION_JSON)
//        );
//
//        //then
//        actions.andExpect(status().isOk())
//                .andExpect(jsonPath("$.data.score", is(500)));
//    }
//
//    @DisplayName("오브젝트 배치 (편집 완료) API 테스트")
//    @Test
//    void patchLocationsTest() throws Exception {
//        //given
//        Long accountId = 1L;
//        List<PlantObjDto.PatchLocation> patchLocations
//                = Stub.MockLocation.getStubPatchLocationResponses();
//            //gardenInfo, patchLocations의 위치 정보를 포함하고 있는 plantObjs를 목 데이터로 가지고 있음.
//        PlantObjDto.GardenInfoResponse gardenInfo
//                = Stub.MockPlantObj.getStubGardenInfo();
//        given(plantObjService.findAllGardenInfo(anyLong())).willReturn(gardenInfo);
//        //when
//        ResultActions actions = mockMvc.perform(
//                patch(DEFAULT_URL+"/{account-id}/location", accountId)
//                        .contentType(MediaType.APPLICATION_JSON)
//                        .accept(MediaType.APPLICATION_JSON)
//                        .content(gson.toJson(patchLocations))
//        );
//        //then
//        actions.andExpect(status().isOk())
//                .andExpect(jsonPath("$.data.plantObjs[0].location.locationId",
//                        is(accountId.intValue())))
//                .andDo(print());
//    }
//
//    @DisplayName("오브젝트와 식물 카드 연결 / 해제 / 교체")
//    @Test
//    void patchObjConnectionToLeafTest() throws Exception {
//        //given
//        Long accountId = 1L;
//        Long plantObjId = 1L;
//        Long leafId = 1L;
//        PlantObjDto.Response response = Stub.MockPlantObj.getStubPlantObjResponseDto1();
//        given(plantObjService.updateLeafConnection(anyLong(), anyLong(), anyLong()))
//                .willReturn(response);
//        //when
//        ResultActions actions = mockMvc.perform(
//                patch(DEFAULT_URL+"/{account-id}/connection", accountId)
//                        .param("plantobj-id", String.valueOf(plantObjId))
//                        .param("leaf-id", String.valueOf(leafId))
//                        .contentType(MediaType.APPLICATION_JSON)
//                        .accept(MediaType.APPLICATION_JSON)
//        );
//        //then
//        actions.andExpect(status().isOk())
//                .andExpect(jsonPath("$.data.leafDto.id", is(leafId.intValue())))
//                .andDo(print());
//    }
//}
