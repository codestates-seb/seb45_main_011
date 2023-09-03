package com.growstory.domain.plant_object.service;

import com.growstory.domain.account.entity.Account;
import com.growstory.domain.account.service.AccountService;
import com.growstory.domain.leaf.entity.Leaf;
import com.growstory.domain.leaf.service.LeafService;
import com.growstory.domain.plant_object.dto.PlantObjDto;
import com.growstory.domain.plant_object.entity.PlantObj;
import com.growstory.domain.plant_object.location.dto.LocationDto;
import com.growstory.domain.plant_object.location.service.LocationService;
import com.growstory.domain.plant_object.mapper.PlantObjMapper;
import com.growstory.domain.plant_object.repository.PlantObjRepository;
import com.growstory.domain.point.entity.Point;
import com.growstory.domain.product.dto.ProductDto;
import com.growstory.domain.product.entity.Product;
import com.growstory.domain.product.mapper.ProductMapper;
import com.growstory.domain.product.service.ProductService;
import com.growstory.global.exception.BusinessLogicException;
import com.growstory.global.exception.ExceptionCode;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Transactional
@Service
public class PlantObjService {
    private final PlantObjRepository plantObjRepository;
    private final ProductService productService;
    private final AccountService accountService;
    private final LocationService locationService;
    private final LeafService leafService;
    private final PlantObjMapper plantObjMapper;
    private final ProductMapper productMapper;

    public PlantObjService(PlantObjRepository plantObjRepository, ProductService productService, AccountService accountService,
                           LocationService locationService, LeafService leafService, PlantObjMapper plantObjMapper, ProductMapper productMapper) {
        this.plantObjRepository = plantObjRepository;
        this.productService = productService;
        this.accountService = accountService;
        this.locationService = locationService;
        this.leafService = leafService;
        this.plantObjMapper = plantObjMapper;
        this.productMapper = productMapper;
    }

    // GET : 정원 페이지의 모든 관련 정보 조회
    @Transactional(readOnly = true)
    public PlantObjDto.GardenInfoResponse finAllGardenInfo(Long accountId) {

        Account findAccount = accountService.findVerifiedAccount(accountId);
        //point (Response)
        Point userPoint = findAccount.getPoint();
        //plantObjs (Response)
        List<PlantObj> plantObjList = findAccount.getPlantObjs();
        List<PlantObjDto.Response> responseObjDtoList = plantObjMapper.toPlantObjResponseList(plantObjList);
        //products (Response)
        List<Product> productList = productService.findAllProducts();
        List< ProductDto.Response> products
                = productList.stream().map(productMapper::toResponseFrom).collect(Collectors.toList());

        return PlantObjDto.GardenInfoResponse.builder()
                .objResponseList(responseObjDtoList)
                .point(userPoint)
                .products(products)
                .build();
    }

    // POST : 유저 포인트로 오브젝트 구입
    public void buyProduct(Long accountId, Long productId) {
        // 시큐리티 컨텍스트 인증정보 확인
        accountService.isAuthIdMatching(accountId);

        // 인증 정보를 바탕으로 Account 엔티티 조회
        Account findAccount = accountService.findVerifiedAccount();

        // 클라이언트에서 전송된 productId 기반으로 product 정보 조회
        Product findProduct = productService.findVerifiedProduct(productId);

        // 조회한 계정, 포인트, 상품정보를 바탕으로 구입 메서드 실행
        accountService.buy(findAccount,findProduct);

        //구입한 오브젝트를 DB에 저장
        plantObjRepository.save(
                PlantObj.builder()
                        .product(findProduct)
                        .leaf(null)
                        .location(null)
                        .build());
    }

    // PATCH : 오브젝트 되팔기
    public void refundPlantObj(Long accountId, Long plantObjId) {
        accountService.isAuthIdMatching(accountId);

        Account findAccount = accountService.findVerifiedAccount();
        PlantObj plantObj = findVerifiedPlantObj(plantObjId);

        accountService.resell(findAccount,plantObj);

    }


    // POST : 오브젝트 배치 (편집 완료)
    public void saveLocation(Long accountId, List<PlantObjDto.PatchLocation> patchLocationDtos) {
        accountService.isAuthIdMatching(accountId);

        patchLocationDtos.stream()
                .forEach(patchLocationDto -> {
                    LocationDto.Patch locationPatchDto = patchLocationDto.getLocationDto();
                    // locationPatchDto와 기존 DB의 Location 정보가 일치하는지를 비교하여 다르다면 그 변화를 저장
                    locationService.updateLocation(locationPatchDto);
                });
    }

    // PATCH : 오브젝트와 식물 카드 연결 / 해제 / 교체

    public void updateLeafConnection(Long accountId, Long plantObjId, Long leafId) {
        accountService.isAuthIdMatching(accountId);
        boolean isLeafNull = leafId == null;
        PlantObj findPlantObj = findVerifiedPlantObj(plantObjId);

        if(!isLeafNull) { // leafId가 null이 아닌경우 NPE에 대한 우려 없이 DB에서 조회
            Leaf findLeaf = leafService.findLeafEntityBy(leafId);
            findPlantObj.update(findLeaf);
        } else { // 전달된 leaf가 null인 경우
            Leaf nullLeaf = null;
            findPlantObj.update(nullLeaf);
        }
    }

    private PlantObj findVerifiedPlantObj (long plantObjId) {
        return plantObjRepository.findById(plantObjId).orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.PLANT_OBJ_NOT_FOUND));

    }

}
