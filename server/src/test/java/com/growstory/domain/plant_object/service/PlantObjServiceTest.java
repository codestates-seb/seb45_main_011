//package com.growstory.domain.plant_object.service;
//
//import com.growstory.domain.account.entity.Account;
//import com.growstory.domain.account.service.AccountService;
//import com.growstory.domain.leaf.dto.LeafDto;
//import com.growstory.domain.leaf.entity.Leaf;
//import com.growstory.domain.leaf.service.LeafService;
//import com.growstory.domain.plant_object.dto.PlantObjDto;
//import com.growstory.domain.plant_object.entity.PlantObj;
//import com.growstory.domain.plant_object.location.dto.LocationDto;
//import com.growstory.domain.plant_object.location.entity.Location;
//import com.growstory.domain.plant_object.location.service.LocationService;
//import com.growstory.domain.plant_object.mapper.PlantObjMapper;
//import com.growstory.domain.plant_object.repository.PlantObjRepository;
//import com.growstory.domain.point.entity.Point;
//import com.growstory.domain.product.dto.ProductDto;
//import com.growstory.domain.product.entity.Product;
//import com.growstory.domain.product.service.ProductService;
//import com.growstory.domain.stubdata.Stub;
//import com.growstory.global.auth.utils.AuthUserUtils;
//import com.growstory.global.customUser.annotation.WithMockCustomUser;
//import com.growstory.global.exception.BusinessLogicException;
//import com.growstory.global.exception.ExceptionCode;
//import org.junit.jupiter.api.BeforeEach;
//import org.junit.jupiter.api.DisplayName;
//import org.junit.jupiter.api.Test;
//import org.junit.jupiter.api.extension.ExtendWith;
//import org.mockito.InjectMocks;
//import org.mockito.Mock;
//import org.mockito.Mockito;
//import org.mockito.junit.jupiter.MockitoExtension;
//
//import java.util.ArrayList;
//import java.util.List;
//import java.util.Optional;
//
//import static org.hamcrest.MatcherAssert.assertThat;
//import static org.hamcrest.Matchers.*;
//import static org.junit.jupiter.api.Assertions.assertThrows;
//import static org.mockito.BDDMockito.*;
//
//
//@ExtendWith(MockitoExtension.class)
//public class PlantObjServiceTest {
//
//    @InjectMocks
//    private PlantObjService plantObjService;
//    @Mock
//    private PlantObjRepository plantObjRepository;
//    @Mock
//    private ProductService productService;
//    @Mock
//    private AccountService accountService;
//    @Mock
//    private LocationService locationService;
//    @Mock
//    private LeafService leafService;
//    @Mock
//    private PlantObjMapper plantObjMapper;
//    @Mock
//    private AuthUserUtils authUserUtils;
//
//    @BeforeEach
//    public void init() {
//        System.out.println("=".repeat(10) +"PlantObjServiceTest init"+"=".repeat(10));
//    }
//
//    @DisplayName("buyProduct Test : 구매 금액이 충분하지 않을 때")
//    @WithMockCustomUser(accountId = 1L, displayName = "관리자", email = "admin@gmail.com", password = "1234", profileImageUrl = "112", roles = "{ADMIN, USER}")
//    @Test
//    public void testBuyProduct_구매금액_불충분() {
//        //given
//        Long gardenAccountId = 1L;
//        Long productId = 1L;
//        // 물건을 구입할 계정은 0 포인트를 가지고 있음
//        Account findAccount = Stub.MockAccount.getStubAccount();
//        Point mockPoint = Stub.MockPoint.getStubPointResponseDtoWithNoScore();
//        findAccount.updatePoint(mockPoint);
//        // 가격이 500원인 Product
//        Product boughtProduct = Stub.MockProduct.getStubProduct1();
//        PlantObj boughtPlantObj = Stub.MockPlantObj.getStubPlantObj1();
//        // 스텁 데이터
//        given(authUserUtils.getAuthUser()).willReturn(findAccount);
//        given(productService.findVerifiedProduct(Mockito.anyLong()))
//                .willReturn(boughtProduct);
//        //        given(plantObjRepository.save(Mockito.any(PlantObj.class)))
//        //                .willReturn(boughtPlantObj);
//
//        //when
//        BusinessLogicException exception = assertThrows(BusinessLogicException.class,
//                () -> plantObjService.buyProduct(gardenAccountId, productId));
//        int httpStatusCode = exception.getExceptionCode().getStatus();
//
//        //then
//        assertThat(exception.getClass(), is(BusinessLogicException.class));
//        assertThat(httpStatusCode, is(403));
//    }
//
//    @DisplayName("buyProduct Test : 성공")
////    @WithMockCustomUser(accountId = 3L, displayName = "관리자", email = "admin@gmail.com", password = "1234", profileImageUrl = "112", roles = "{ADMIN, USER}")
//    @Test
//    public void testBuyProduct_구매금액_충분_성공() {
//        //given
//        Long gardenAccountId = 1L;
//        Long productId = 1L;
//            // 물건을 구입할 계정은 500 포인트를 가지고 있음
//        Account findAccount = Stub.MockAccount.getStubAccount();
//        Point mockPoint = Stub.MockPoint.getStubPointResponseDtoWith500Score();
//        findAccount.updatePoint(mockPoint);
//            // 가격이 500원인 Product
//        Product boughtProduct = Stub.MockProduct.getStubProduct1();
//        PlantObj boughtPlantObj = Stub.MockPlantObj.getStubPlantObj1();
//
//            // Mock 리턴
//        willDoNothing().given(accountService).isAuthIdMatching(Mockito.anyLong());
//        given(authUserUtils.getAuthUser()).willReturn(findAccount);
//        given(productService.findVerifiedProduct(Mockito.anyLong()))
//                .willReturn(boughtProduct);
//        given(plantObjRepository.save(Mockito.any(PlantObj.class)))
//                .willReturn(boughtPlantObj);
//
//        //when
//        plantObjService.buyProduct(gardenAccountId, productId);
//
//        //then
//        verify(plantObjRepository).save(Mockito.any(PlantObj.class));
//        assertThat(findAccount.getPlantObjs(), hasItem(boughtPlantObj));
//        assertThat(findAccount.getPoint().getScore(), is(0));
//    }
//
//    @DisplayName("refundPlantObj test : 사용자 소유의 환불 가능 품목이 없을 때")
////    @WithMockUser
//    @Test
//    public void testRefundPlantObj_환불_가능_품목_없음() {
//        //given
//        willDoNothing().given(accountService).isAuthIdMatching(Mockito.anyLong());
//
//        Long accountId = 1L;
//        Long plantObjId = 1L;
//        Account findAccount = Stub.MockAccount.getStubAccount();
//            // 0 Point 매핑 (이미 물건을 구입 했다고 가정)
//        Point point = Stub.MockPoint.getStubPointResponseDtoWithNoScore();
//        findAccount.updatePoint(point);
//        PlantObj plantObj = Stub.MockPlantObj.getStubPlantObj1();
//            // findAccount.addPlantObj(plantObj)를 실행하지 않는다.
//            // 목 데이터 리턴
//        given(authUserUtils.getAuthUser()).willReturn(findAccount);
//        given(plantObjRepository.findById(Mockito.anyLong()))
//                .willReturn(Optional.of(plantObj));
//        //when
//        BusinessLogicException exception = assertThrows(BusinessLogicException.class,
//                () -> plantObjService.refundPlantObj(accountId, plantObjId));
//        //then
//        //환불 가능 품목이 존재하지 않을 때 PLANT_OBJ_NOT_FOUND 반환
//        assertThat(exception.getExceptionCode(), is(ExceptionCode.PLANT_OBJ_NOT_FOUND));
//    }
//
//    @DisplayName("refundPlantObj test : 사용자 소유의 환불 가능 품목이 존재할 때")
//    @Test
//    public void testRefundPlantObj_환불_성공() {
//        //given
//        willDoNothing().given(accountService).isAuthIdMatching(Mockito.anyLong());
//
//        Long accountId = 1L;
//        Account findAccount = Stub.MockAccount.getStubAccount();
//            // 0 Point 매핑 (이미 물건을 구입 했다고 가정)
//        Point point = Stub.MockPoint.getStubPointResponseDtoWithNoScore();
//        findAccount.updatePoint(point);
//        PlantObj plantObj1 = Stub.MockPlantObj.getStubPlantObj1();
//        PlantObj plantObj2 = Stub.MockPlantObj.getStubPlantObj2();
//        findAccount.addPlantObj(plantObj1);
//        findAccount.addPlantObj(plantObj2);
//            // 목 데이터 리턴
//        given(authUserUtils.getAuthUser()).willReturn(findAccount);
//        given(plantObjRepository.findById(Mockito.anyLong()))
//                .willReturn(Optional.of(plantObj2));
//        //when
//        plantObjService.refundPlantObj(accountId, plantObj2.getPlantObjId());
//        //then
//        assertThat(findAccount.getPoint().getScore(), is(plantObj2.getProduct().getPrice()));
//    }
//
//
//    @DisplayName("findAllGardenInfo Test : 전체 정원 정보 조회 성공")
//    @Test
//    public void testFindAllGardenInfo_전체_정원_정보조회_성공() {
//        //given
//            //정원 소유주 accountId
//        Long gardenAccountId = 1L;
//            //정원 소유자와 Point 목 데이터 매핑
//        Account findAccount = Stub.MockAccount.getStubAccount();
//        Point userPoint = Stub.MockPoint.getStubPointResponseDtoWith500Score();
//        findAccount.updatePoint(userPoint);
//            //소유 PlantObjs 목 데이터 매핑
//        List<PlantObj> plantObjList = Stub.MockPlantObj.getStubPlantObjs();
//        plantObjList.stream().forEach(findAccount::addPlantObj);
//        List<PlantObjDto.Response> plantObjResponseList = Stub.MockPlantObj.getStubPlantObjsResponseDtos();
//            //상품 리스트
//        List<ProductDto.Response> products = Stub.MockProduct.getStubProductResponses();
//            //스텁 데이터 동작 지정
//        given(accountService.findVerifiedAccount(Mockito.anyLong())).willReturn(findAccount);
//        given(productService.findAllProducts()).willReturn(products);
//        given(plantObjMapper.toPlantObjResponseList(Mockito.anyList())).willReturn(plantObjResponseList);
//
//        //when
//        PlantObjDto.GardenInfoResponse gardenInfo = plantObjService.findAllGardenInfo(gardenAccountId);
//
//        //then
//        assertThat(gardenInfo.getPoint().getScore(), is(userPoint.getScore()));
//        assertThat(gardenInfo.getDisplayName(), is(findAccount.getDisplayName()));
//        assertThat(gardenInfo.getProducts(), is(products));
//        assertThat(gardenInfo.getPlantObjs().get(0).getPlantObjId(), is(plantObjList.get(0).getPlantObjId()));
//    }
//
////    @DisplayName("saveLocation Test : 프로덕트 id와 로케이션 id 불일치")
////    @Test
////    public void testSaveLocation_프로덕트id_로케이션id_불일치() {
////        //given
////        willDoNothing().given(accountService).isAuthIdMatching(Mockito.anyLong());
////        Long accountId = 1L;
////        List<PlantObjDto.PatchLocation> patchLocations = Stub.MockLocation.getStubPatchLocationResponses();
////        patchLocations.add(PlantObjDto.PatchLocation.builder()
////                        .plantObjId(3L)
////                        .locationDto(LocationDto.Patch.builder()
////                                .locationId(99L).x(0).y(0).isInstalled(false)
////                                .build())
////                .build());
////        //when
////        BusinessLogicException exception = assertThrows(BusinessLogicException.class,
////                () -> plantObjService.saveLocation(accountId, patchLocations));
////        //then
////        assertThat(exception.getExceptionCode(), is(ExceptionCode.LOCATION_NOT_ALLOW));
////    }
//
//    @DisplayName("saveLocation Test : X축에 부적절한 위치 삽입1 (+좌표)")
//    @Test
//    public void testSaveLocation_X축_부적절한_위치_삽입() {
//        //given
//        willDoNothing().given(accountService).isAuthIdMatching(Mockito.anyLong());
//        Long accountId = 1L;
//        List<PlantObjDto.PatchLocation> patchLocations = Stub.MockLocation.getStubPatchLocationResponses();
//        patchLocations.add(PlantObjDto.PatchLocation.builder()
//                .plantObjId(3L)
//                .locationDto(LocationDto.Patch.builder()
//                        .locationId(3L).x(12).y(0).isInstalled(false)
//                        .build())
//                .build());
//        //when
//        BusinessLogicException exception = assertThrows(BusinessLogicException.class,
//                () -> plantObjService.saveLocation(accountId, patchLocations));
//        //then
//        assertThat(exception.getExceptionCode(), is(ExceptionCode.INVALID_LOCATION));
//    }
//
//    @DisplayName("saveLocation Test : X축에 부적절한 위치 삽입 (-좌표)")
//    @Test
//    public void testSaveLocation_X축_부적절한_위치_삽입2() {
//        //given
//        willDoNothing().given(accountService).isAuthIdMatching(Mockito.anyLong());
//        Long accountId = 1L;
//        List<PlantObjDto.PatchLocation> patchLocations = Stub.MockLocation.getStubPatchLocationResponses();
//        patchLocations.add(PlantObjDto.PatchLocation.builder()
//                .plantObjId(3L)
//                .locationDto(LocationDto.Patch.builder()
//                        .locationId(3L).x(-1).y(0).isInstalled(false)
//                        .build())
//                .build());
//        //when
//        BusinessLogicException exception = assertThrows(BusinessLogicException.class,
//                () -> plantObjService.saveLocation(accountId, patchLocations));
//        //then
//        assertThat(exception.getExceptionCode(), is(ExceptionCode.INVALID_LOCATION));
//    }
//
//    @DisplayName("saveLocation Test : Y축에 부적절한 위치 삽입 (+좌표)")
//    @Test
//    public void testSaveLocation_Y축_부적절한_위치_삽입1() {
//        //given
//        willDoNothing().given(accountService).isAuthIdMatching(Mockito.anyLong());
//        Long accountId = 1L;
//        List<PlantObjDto.PatchLocation> patchLocations = Stub.MockLocation.getStubPatchLocationResponses();
//        patchLocations.add(PlantObjDto.PatchLocation.builder()
//                .plantObjId(3L)
//                .locationDto(LocationDto.Patch.builder()
//                        .locationId(3L).x(0).y(99).isInstalled(false)
//                        .build())
//                .build());
//        //when
//        BusinessLogicException exception = assertThrows(BusinessLogicException.class,
//                () -> plantObjService.saveLocation(accountId, patchLocations));
//        //then
//        assertThat(exception.getExceptionCode(), is(ExceptionCode.INVALID_LOCATION));
//    }
//
//    @DisplayName("saveLocation Test : Y축에 부적절한 위치 삽입 (-좌표)")
//    @Test
//    public void testSaveLocation_Y축_부적절한_위치_삽입2() {
//        //given
//        willDoNothing().given(accountService).isAuthIdMatching(Mockito.anyLong());
//        Long accountId = 1L;
//        List<PlantObjDto.PatchLocation> patchLocations = Stub.MockLocation.getStubPatchLocationResponses();
//        patchLocations.add(PlantObjDto.PatchLocation.builder()
//                .plantObjId(3L)
//                .locationDto(LocationDto.Patch.builder()
//                        .locationId(3L).x(0).y(-1).isInstalled(false)
//                        .build())
//                .build());
//        //when
//        BusinessLogicException exception = assertThrows(BusinessLogicException.class,
//                () -> plantObjService.saveLocation(accountId, patchLocations));
//        //then
//        assertThat(exception.getExceptionCode(), is(ExceptionCode.INVALID_LOCATION));
//    }
//
//    @DisplayName("saveLocation Test : 성공")
//    @Test
//    public void testSaveLocation_성공() {
//        //given
//        willDoNothing().given(accountService).isAuthIdMatching(Mockito.anyLong());
//        Long accountId = 1L;
//        List<PlantObjDto.PatchLocation> patchLocations = new ArrayList<>();
//        PlantObjDto.PatchLocation patchLocation = Stub.MockLocation.getStubPatchLocation1();
//        patchLocations.add(patchLocation);
//            // PatchLocation 객체에 의해 저장된 Location 엔티티 객체
//        Location savedLocation = Stub.MockLocation.getStubLocation();
//        given(locationService.updateLocation(Mockito.any())).willReturn(savedLocation);
//        //when
//        plantObjService.saveLocation(accountId,patchLocations);
//        //then
//        assertThat(savedLocation.getLocationId(), is(patchLocation.getLocationDto().getLocationId()));
//        assertThat(savedLocation.getX(), is(patchLocation.getLocationDto().getX()));
//        assertThat(savedLocation.getY(), is(patchLocation.getLocationDto().getY()));
//        assertThat(savedLocation.isInstalled(), is(patchLocation.getLocationDto().isInstalled()));
//    }
//
//    @DisplayName("updateLeafConnection Test : leafId가 null일 경우 연결해제")
//    @Test
//    public void testUpdateLeafConnection_Leaf_연결해제() {
//        //given
//        willDoNothing().given(accountService).isAuthIdMatching(Mockito.anyLong());
//        Long accountId = 1L;
//        Long plantObjId = 1L;
//        Long leafId = null;
//        PlantObj findPlantObj = Stub.MockPlantObj.getStubPlantObj1();
//        findPlantObj.updateLeaf(Stub.MockLeaf.getStubLeaf());
//        given(plantObjRepository.findById(Mockito.anyLong())).willReturn(Optional.of(findPlantObj));
//        given(plantObjMapper.toPlantObjResponse(Mockito.any(PlantObj.class)))
//                .willReturn(PlantObjDto.Response.builder()
//                        .plantObjId(findPlantObj.getPlantObjId())
//                        .leafDto(null)
//                        .build());
//        //when
//        PlantObjDto.Response response = plantObjService.updateLeafConnection(accountId, plantObjId, leafId);
//
//        //then
//        verify(leafService, never()).findLeafEntityBy(Mockito.anyLong());
////        verify(mock(findPlantObj.getClass()), times(1)).updateLeaf(null);
//        assertThat(response, is(notNullValue()));
//    }
//
//    @DisplayName("updateLeafConnection Test : plantObj 미확인 예외발생")
//    @Test
//    public void testUpdateLeafConnection_Leaf_PlantObj_미확인() {
//        //given
//        willDoNothing().given(accountService).isAuthIdMatching(Mockito.anyLong());
//        Long accountId = 1L;
//        Long plantObjId = 99L;
//        Long leafId = 1L;
//        given(plantObjRepository.findById(Mockito.anyLong()))
//                .willReturn(Optional.empty());
//
//        //when
//        BusinessLogicException exception = assertThrows(BusinessLogicException.class,
//                () -> plantObjService.updateLeafConnection(accountId, plantObjId, leafId));
//
//        //then
//        assertThat(exception.getExceptionCode(), is(ExceptionCode.PLANT_OBJ_NOT_FOUND));
//    }
//
//    @DisplayName("updateLeafConnection Test : leafId가 null이 아닐 경우 연결 성공")
//    @Test
//    public void testUpdateLeafConnection_Leaf_연결성공() {
//        //given
//        willDoNothing().given(accountService).isAuthIdMatching(Mockito.anyLong());
//        Long accountId = 1L;
//        Long plantObjId = 1L;
//        Long leafId = 1L;
//        PlantObj findPlantObj = Stub.MockPlantObj.getStubPlantObj1();
//        Leaf findLeaf = Stub.MockLeaf.getStubLeaf();
//        findPlantObj.updateLeaf(findLeaf);
//        LeafDto.ResponseForGardenInfo leafResponseDto = Stub.MockLeaf.getStubLeafResponseDto();
//        given(plantObjRepository.findById(Mockito.anyLong())).willReturn(Optional.of(findPlantObj));
//        given(leafService.findLeafEntityBy(leafId)).willReturn(findLeaf);
//        given(plantObjMapper.toPlantObjResponse(Mockito.any(PlantObj.class)))
//                .willReturn(PlantObjDto.Response.builder()
//                        .plantObjId(findPlantObj.getPlantObjId())
//                        .leafDto(leafResponseDto)
//                        .build());
//        //when
//        PlantObjDto.Response response = plantObjService.updateLeafConnection(accountId, plantObjId, leafId);
//
//        //then
//        verify(leafService).findLeafEntityBy(Mockito.anyLong());
//        assertThat(response, is(notNullValue()));
//        assertThat(response.getLeafDto().getId(), is(leafId));
//    }
//}
