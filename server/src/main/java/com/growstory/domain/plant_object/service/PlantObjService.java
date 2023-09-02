package com.growstory.domain.plant_object.service;

import com.growstory.domain.account.entity.Account;
import com.growstory.domain.account.service.AccountService;
import com.growstory.domain.plant_object.dto.PlantObjDto;
import com.growstory.domain.plant_object.entity.PlantObj;
import com.growstory.domain.plant_object.location.dto.LocationDto;
import com.growstory.domain.plant_object.location.entity.Location;
import com.growstory.domain.plant_object.location.mapper.LocationMapper;
import com.growstory.domain.plant_object.location.service.LocationService;
import com.growstory.domain.plant_object.mapper.PlantObjMapper;
import com.growstory.domain.plant_object.repository.PlantObjRepository;
import com.growstory.domain.point.entity.Point;
import com.growstory.domain.product.entity.Product;
import com.growstory.domain.product.service.ProductService;
import com.growstory.global.exception.BusinessLogicException;
import com.growstory.global.exception.ExceptionCode;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Transactional
@Service
public class PlantObjService {
    private final PlantObjRepository plantObjRepository;
    private final ProductService productService;
    private final AccountService accountService;
    private final LocationService locationService;
    private final PlantObjMapper plantObjMapper;

    public PlantObjService(PlantObjRepository plantObjRepository, ProductService productService, AccountService accountService,
                           LocationService locationService, PlantObjMapper plantObjMapper) {
        this.plantObjRepository = plantObjRepository;
        this.productService = productService;
        this.accountService = accountService;
        this.locationService = locationService;
        this.plantObjMapper = plantObjMapper;
    }

    // GET : 정원 페이지의 모든 관련 정보 조회
    @Transactional(readOnly = true)
    public PlantObjDto.GardenInfoResponse finAllGardenInfo(Long accountId) {
        //클라이언트에서 받은 accountId와 Auth 정보가 일치 여부를 확인하여 일치하지 않으면 405 예외를 던짐
        accountService.isAuthIdMatching(accountId);

        Account findAccount = accountService.findVerifiedAccount();
        //포인트
        Point userPoint = findAccount.getPoint();
        //plantObjs를 꺼내서 responseDtoList로 매핑
        List<PlantObj> plantObjs = findAccount.getPlantObjs();
        List<PlantObjDto.Response> responseObjDtoList = plantObjMapper.toPlantObjResponseList(plantObjs);

        return PlantObjDto.GardenInfoResponse.builder()
                .objResponseList(responseObjDtoList)
                .point(userPoint)
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
        accountService.buy(findAccount,findProduct.getPrice());

        //TODO: 구입한 오브젝트를 DB에 저장하는 과정이 필요
    }

    // PATCH : 오브젝트 되팔기
    public void refundPlantObj(Long accountId, Long plantObjId) {
        accountService.isAuthIdMatching(accountId);

        Account findAccount = accountService.findVerifiedAccount();

        // 부모 객체에서 해당 PlantObj를 제거하여 고아 객체 -> 해당 인스턴스 삭제
        PlantObj plantObj = findVerifiedPlantObj(plantObjId);
        findAccount.removePlantObj(plantObj);

        Product product = plantObj.getProduct();

        accountService.resell(findAccount,product.getPrice());

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

    private PlantObj findVerifiedPlantObj (long plantObjId) {
        return plantObjRepository.findById(plantObjId).orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.PLANT_OBJ_NOT_FOUND));

    }
}
