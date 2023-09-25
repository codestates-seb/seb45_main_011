package com.growstory.domain.point.controller;

import com.growstory.domain.point.service.PointService;
import com.growstory.global.response.SingleResponseDto;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.constraints.Positive;

@RequiredArgsConstructor
@RequestMapping("/v1/points")
@RestController
public class PointController {

    private final PointService pointService;

    @Operation(summary = "Patch All Event Point", description = "Points awarded through events to everyone")
    @PatchMapping("/all")
    public ResponseEntity<HttpStatus> patchAllEventPoints(@Positive @RequestParam("point") int pointScore,
                                                          @RequestParam("event-key") String eventKey) {

        pointService.updateAllEventPoint(pointScore, eventKey);

        return ResponseEntity.noContent().build();
    }

    @Operation(summary = "Patch Someone Event Point", description = "Points awarded through events to someone")
    @PatchMapping
    public ResponseEntity<HttpStatus> patchEventPoint(
            @Positive @RequestParam("account-id") Long accountId,
            @Positive @RequestParam("point") int point,
            @RequestParam("event-key")String eventKey) {

        pointService.updateEventPoint(accountId, point, eventKey);

        return ResponseEntity.noContent().build();
    }
}
