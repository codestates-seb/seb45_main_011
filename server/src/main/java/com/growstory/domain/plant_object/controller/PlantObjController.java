package com.growstory.domain.plant_object.controller;

import com.growstory.domain.plant_object.dto.PlantObjDto;
import com.growstory.domain.plant_object.service.PlantObjService;
import com.growstory.domain.point.dto.PointDto;
import com.growstory.global.response.SingleResponseDto;
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
    public ResponseEntity<SingleResponseDto> getGardenInfo(@Positive @PathVariable("account-id")Long accountId) {

        PlantObjDto.GardenInfoResponse gardenInfo = plantObjService.findAllGardenInfo(accountId);

        return ResponseEntity.ok().body(SingleResponseDto.builder()
                .data(gardenInfo)
                .status(HttpStatus.OK.value())
                .message(HttpStatus.OK.getReasonPhrase())
                .build());
    }

    // POST : 유저 포인트로 오브젝트 구입
    @PostMapping("/{account-id}/purchase")
    public ResponseEntity<SingleResponseDto> postPurchaseObj(@Positive @PathVariable("account-id") Long accountId,
                                                      @RequestParam("product-id") Long productId) {
        PlantObjDto.Response plantObj = plantObjService.buyProduct(accountId, productId);

        return ResponseEntity.ok().body(SingleResponseDto.builder()
                        .data(plantObj)
                        .status(HttpStatus.OK.value())
                        .message(HttpStatus.OK.getReasonPhrase())
                        .build());
    }

    // DELETE : 오브젝트 되팔기
    @DeleteMapping("/{account-id}/refund")
    public ResponseEntity<SingleResponseDto<Object>> deleteRefundObj(@Positive @PathVariable("account-id") Long accountId,
                                                                     @RequestParam("plantobj-id") Long plantObjId) {
        PointDto.Response point = plantObjService.refundPlantObj(accountId, plantObjId);

        return ResponseEntity.ok().body(SingleResponseDto.builder()
                .data(point)
                .status(HttpStatus.OK.value())
                .message(HttpStatus.OK.getReasonPhrase())
                .build());
    }

    // POST : 오브젝트 배치 (편집 완료)
    @PatchMapping("/{account-id}/location")
    public ResponseEntity<SingleResponseDto> patchLocations(@Positive @PathVariable("account-id") Long accountId,
                                                    @RequestBody List<PlantObjDto.PatchLocation> patchObjLocations) {
        plantObjService.saveLocation(accountId, patchObjLocations);

        PlantObjDto.GardenInfoResponse gardenInfo = plantObjService.findAllGardenInfo(accountId);

        return ResponseEntity.ok().body(SingleResponseDto.builder()
                .data(gardenInfo)
                .status(HttpStatus.OK.value())
                .message(HttpStatus.OK.getReasonPhrase())
                .build());
    }

    // PATCH : 오브젝트와 식물 카드 연결 / 해제 / 교체
    @PatchMapping("/{account-id}/connection")
    public ResponseEntity<SingleResponseDto<Object>> patchObjConnectionToLeaf(@Positive @PathVariable("account-id")Long accountId,
                                                                              @RequestParam("plantobj-id") Long plantObjId,
                                                                              @RequestParam(name = "leaf-id", required = false) Long leafId) {
        PlantObjDto.Response plantObj = plantObjService.updateLeafConnection(accountId, plantObjId, leafId);

        return ResponseEntity.ok().body(SingleResponseDto.builder()
                .data(plantObj)
                .status(HttpStatus.OK.value())
                .message(HttpStatus.OK.getReasonPhrase())
                .build());
    }
}
