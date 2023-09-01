package com.growstory.domain.plant_object.service;

import com.growstory.domain.account.service.AccountService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Transactional
@Service
public class PlantObjService {
    private final AccountService accountService;

    public PlantObjService(AccountService accountService) {
        this.accountService = accountService;
    }

    // GET : 정원 페이지의 모든 관련 정보 조회

    // POST : 유저 포인트로 오브젝트 구입

    // POST : 오브젝트 배치 (편집 완료)

    // PATCH : 오브젝트와 식물 카드 연결 / 해제 / 교체

    // PATCH : 오브젝트 되팔기
}
