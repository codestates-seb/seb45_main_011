package com.growstory.domain.plant_object.controller;

import com.growstory.domain.plant_object.dto.PlantObjDto;
import com.growstory.domain.plant_object.service.PlantObjService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.Positive;
import java.util.List;

@RestController
@RequestMapping("/v1/gardens")
public class PlantObjController {


    private final PlantObjService plantObjService;


    public PlantObjController(PlantObjService plantObjService) {
        this.plantObjService = plantObjService;
    }

    // GET : 정원 페이지의 모든 관련 정보 조회
    @GetMapping("/{account-id}")
    public ResponseEntity<HttpStatus> getGardenInfo(@Positive @PathVariable("account-id")Long accountId) {

        PlantObjDto.GardenInfoResponse gardenInfo = plantObjService.finAllGardenInfo(accountId);

        return ResponseEntity.ok().build();
    }

    // POST : 유저 포인트로 오브젝트 구입
    @PostMapping("/{account-id}")
    public ResponseEntity<HttpStatus> postPurchaseObj(@Positive @PathVariable("account-id") Long accountId,
                                                      @RequestParam("product-id") Long productId,
                                                      @RequestBody PlantObjDto.Post boughtObj) {
        plantObjService.buyProduct(accountId, productId);

        return ResponseEntity.noContent().build();
    }

    // DELETE : 오브젝트 되팔기
    @DeleteMapping("/{account-id}")
    public ResponseEntity<HttpStatus> deleteRefundObj(@Positive @PathVariable("account-id") Long accountId,
                                                      @RequestParam("product-id") Long productId) {
        plantObjService.refundPlantObj(accountId, productId);

        return ResponseEntity.noContent().build();
    }

    // POST : 오브젝트 배치 (편집 완료)
    @PostMapping("/{account-id}/location")
    public ResponseEntity<HttpStatus> postLocation(@Positive @PathVariable("account-id") Long accountId,
                                                   @RequestBody List<PlantObjDto.PatchLocation> patchObjLocations) {
        plantObjService.saveLocation(accountId, patchObjLocations);

        return ResponseEntity.noContent().build();
    }

    // PATCH : 오브젝트와 식물 카드 연결 / 해제 / 교체
    @PatchMapping("/{account-id}")
    public ResponseEntity<HttpStatus> patchObjConnectionToLeaf(@Positive @PathVariable("account-id")Long accountId,
                                                               @RequestParam("plantobj-id") Long plantObjId,
                                                               @RequestParam(name = "leaf-id", required = false) Long leafId) {
        plantObjService.updateLeafConnection(accountId, plantObjId, leafId);

        return ResponseEntity.noContent().build();
    }
}
