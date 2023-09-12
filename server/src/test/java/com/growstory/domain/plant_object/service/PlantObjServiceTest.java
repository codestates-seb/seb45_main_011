package com.growstory.domain.plant_object.service;

import com.growstory.domain.account.entity.Account;
import com.growstory.domain.account.service.AccountService;
import com.growstory.domain.leaf.service.LeafService;
import com.growstory.domain.plant_object.entity.PlantObj;
import com.growstory.domain.plant_object.location.service.LocationService;
import com.growstory.domain.plant_object.mapper.PlantObjMapper;
import com.growstory.domain.plant_object.repository.PlantObjRepository;
import com.growstory.domain.point.entity.Point;
import com.growstory.domain.product.entity.Product;
import com.growstory.domain.product.service.ProductService;
import com.growstory.domain.stubdata.TestStubData;
import com.growstory.global.auth.utils.AuthUserUtils;
import com.growstory.global.customUser.annotation.WithMockCustomUser;
import com.growstory.global.exception.BusinessLogicException;
import com.growstory.global.exception.ExceptionCode;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.Spy;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Optional;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.*;
import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.BDDMockito.*;


@ExtendWith(MockitoExtension.class)
public class PlantObjServiceTest {

    @InjectMocks
    private PlantObjService plantObjService;
    @Mock
    private PlantObjRepository plantObjRepository;
    @Mock
    private ProductService productService;
    @Mock
    private AccountService accountService;
    @Mock
    private LocationService locationService;
    @Mock
    private LeafService leafService;
    @Mock
    private PlantObjMapper plantObjMapper;
    @Mock
    private AuthUserUtils authUserUtils;

    @BeforeEach
    public void init() {
        System.out.println("=".repeat(10) +"PlantObjServiceTest init"+"=".repeat(10));
    }

    @DisplayName("buyProduct Test : 구매 금액이 충분할 때")
//    @WithMockCustomUser(accountId = 3L, displayName = "관리자", email = "admin@gmail.com", password = "1234", profileImageUrl = "112", roles = "{ADMIN, USER}")
    @Test
    public void testBuyProduct_구매금액_충분() {
        //given
        Long gardenAccountId = 1L;
        Long productId = 1L;
        // 물건을 구입할 계정은 500 포인트를 가지고 있음
        Account findAccount = TestStubData.MockAccount.getStubAccount();
        Point mockPoint = TestStubData.MockPoint.getStubPointResponseDtoWith500Score();
        findAccount.updatePoint(mockPoint);
        // 가격이 500원인 Product
        Product boughtProduct = TestStubData.MockProduct.getStubProduct1();
        PlantObj boughtPlantObj = TestStubData.MockPlantObj.getStubPlantObj1();

        // Mock 리턴
        willDoNothing().given(accountService).isAuthIdMatching(Mockito.anyLong());
        given(authUserUtils.getAuthUser()).willReturn(findAccount);
        given(productService.findVerifiedProduct(Mockito.anyLong()))
                .willReturn(boughtProduct);
        given(plantObjRepository.save(Mockito.any(PlantObj.class)))
                .willReturn(boughtPlantObj);

        //when
        plantObjService.buyProduct(gardenAccountId, productId);

        //then
        verify(plantObjRepository).save(Mockito.any(PlantObj.class));
        assertThat(findAccount.getPlantObjs(), hasItem(boughtPlantObj));
        assertThat(findAccount.getPoint().getScore(), is(0));
    }

    @DisplayName("buyProduct Test : 구매 금액이 충분하지 않을 때")
    @WithMockCustomUser(accountId = 1L, displayName = "관리자", email = "admin@gmail.com", password = "1234", profileImageUrl = "112", roles = "{ADMIN, USER}")
    @Test
    public void testBuyProduct_구매금액_불충분() {
        //given
        Long gardenAccountId = 1L;
        Long productId = 1L;
        // 물건을 구입할 계정은 0 포인트를 가지고 있음
        Account findAccount = TestStubData.MockAccount.getStubAccount();
        Point mockPoint = TestStubData.MockPoint.getStubPointResponseDtoWithNoScore();
        findAccount.updatePoint(mockPoint);
        // 가격이 500원인 Product
        Product boughtProduct = TestStubData.MockProduct.getStubProduct1();
        PlantObj boughtPlantObj = TestStubData.MockPlantObj.getStubPlantObj1();
        // 스텁 데이터
        given(authUserUtils.getAuthUser()).willReturn(findAccount);
        given(productService.findVerifiedProduct(Mockito.anyLong()))
                .willReturn(boughtProduct);
//        given(plantObjRepository.save(Mockito.any(PlantObj.class)))
//                .willReturn(boughtPlantObj);

        //when
        BusinessLogicException exception = assertThrows(BusinessLogicException.class,
                () -> plantObjService.buyProduct(gardenAccountId, productId));
        int httpStatusCode = exception.getExceptionCode().getStatus();

        //then
        assertThat(exception.getClass(), is(BusinessLogicException.class));
        assertThat(httpStatusCode, is(403));
    }

    @DisplayName("refundPlantObj test")
    @Test
    public void testRefundPlantObj_환불_가능_품목_존재() {
        //given
        Long accountId = 1L;
        Long plantObjId = 1L;
        Account findAccount = TestStubData.MockAccount.getStubAccount();
            // 0 Point 매핑 (이미 물건을 구입 했다고 가정)
        Point point = TestStubData.MockPoint.getStubPointResponseDtoWithNoScore();
        findAccount.updatePoint(point);
        PlantObj plantObj = TestStubData.MockPlantObj.getStubPlantObj1();
        findAccount.addPlantObj(plantObj);
        // 목 데이터 리턴
        given(authUserUtils.getAuthUser()).willReturn(findAccount);
        given(plantObjRepository.findById(Mockito.anyLong()))
                .willReturn(Optional.of(plantObj));
        //when
        plantObjService.refundPlantObj(accountId, plantObjId);
        //then
            //물건 구입가 만큼의 비용을 환불 받음
        assertThat(findAccount.getPoint().getScore(), is(plantObj.getProduct().getPrice()));
    }

    @DisplayName("findAllGardenInfo Test")
    @Test
    public void testFindAllGardenInfo() {
        //given

        //when

        //then
    }
}
