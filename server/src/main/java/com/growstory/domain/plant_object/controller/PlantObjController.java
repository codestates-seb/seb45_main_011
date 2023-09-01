package com.growstory.domain.plant_object.controller;

import com.growstory.domain.plant_object.service.PlantObjService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/v1/garden")
public class PlantObjController {
    private final PlantObjService plantObjService;


    public PlantObjController(PlantObjService plantObjService) {
        this.plantObjService = plantObjService;
    }

    // GET : 정원 페이지의 모든 관련 정보 조회

    // POST : 유저 포인트로 오브젝트 구입

    // POST : 오브젝트 배치 (편집 완료)

    // PATCH : 오브젝트와 식물 카드 연결 / 해제 / 교체

    // PATCH : 오브젝트 되팔기
}
