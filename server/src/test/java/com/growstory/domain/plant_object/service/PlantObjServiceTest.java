package com.growstory.domain.plant_object.service;

import com.growstory.domain.account.entity.Account;
import com.growstory.domain.account.service.AccountService;
import com.growstory.domain.leaf.service.LeafService;
import com.growstory.domain.plant_object.location.service.LocationService;
import com.growstory.domain.plant_object.mapper.PlantObjMapper;
import com.growstory.domain.product.entity.Product;
import com.growstory.domain.product.service.ProductService;
import com.growstory.global.auth.utils.AuthUserUtils;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.equalTo;
import static org.hamcrest.Matchers.is;
import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.BDDMockito.*;


@ExtendWith(MockitoExtension.class)
public class PlantObjServiceTest {

    @InjectMocks
    private PlantObjService plantObjService;
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

    @DisplayName("buyProduct Test")
    @Test
    public void testBuyProduct() {
        //given
        Long gardenAccountId = 1L;
        Long productId = 1L;
        accountService.isAuthIdMatching(gardenAccountId);
        Account findAccount = authUserUtils.getAuthUser();
        Product findProduct = productService.findVerifiedProduct(productId);

        //when
        willThrow().given(accountService).isAuthIdMatching(Mockito.anyLong());
//        given()
        //then

    }

    @DisplayName("findAllGardenInfo Test")
    @Test
    public void testFindAllGardenInfo() {
        //given

        //when

        //then
    }
}
