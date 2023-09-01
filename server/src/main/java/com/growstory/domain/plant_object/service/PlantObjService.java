package com.growstory.domain.plant_object.service;

import com.growstory.domain.account.entity.Account;
import com.growstory.domain.account.service.AccountService;
import com.growstory.domain.leaf.entity.Leaf;
import com.growstory.domain.leaf.mapper.LeafMapper;
import com.growstory.domain.plant_object.dto.PlantObjDto;
import com.growstory.domain.plant_object.entity.PlantObj;
import com.growstory.domain.plant_object.mapper.PlantObjMapper;
import com.growstory.domain.point.entity.Point;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Transactional
@Service
public class PlantObjService {
    private final AccountService accountService;
    private final PlantObjMapper plantObjMapper;
    private final LeafMapper leafMapper;

    public PlantObjService(AccountService accountService, PlantObjMapper plantObjMapper, LeafMapper leafMapper) {
        this.accountService = accountService;
        this.plantObjMapper = plantObjMapper;
        this.leafMapper = leafMapper;
    }

    public PlantObjDto.GardenInfoResponse finAllGardenInfo(Long accountId) {
        //클라이언트에서 받은 accountId와 Auth 정보가 일치 여부를 확인하여 일치하지 않으면 405 예외를 던짐
        accountService.isAccountIdMatching(accountId);

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

    // GET : 정원 페이지의 모든 관련 정보 조회

    // POST : 유저 포인트로 오브젝트 구입

    // POST : 오브젝트 배치 (편집 완료)

    // PATCH : 오브젝트와 식물 카드 연결 / 해제 / 교체

    // PATCH : 오브젝트 되팔기
}
