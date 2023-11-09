package com.growstory.domain.alarm.controller;

import com.growstory.domain.alarm.dto.AlarmDto;
import com.growstory.domain.alarm.service.AlarmService;
import com.growstory.global.constants.HttpStatusCode;
import com.growstory.global.response.SingleResponseDto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.Positive;
import java.util.List;

@Tag(name = "Alarm", description = "Alarm Controller")
@Validated
@RequiredArgsConstructor
@RequestMapping("/v1/alarms")
@RestController
public class AlarmController {
    private final AlarmService alarmService;

    @Operation(summary = "알림 전체 조회", description = "입력받은 사용자의 모든 알림 조회")
    @GetMapping("/{account-id}")
    public ResponseEntity<SingleResponseDto<List<AlarmDto.Response>>> getAlarms(@Positive @PathVariable("account-id") Long accountId) {
        List<AlarmDto.Response> responseDtos = alarmService.findAlarms(accountId);

        return ResponseEntity.ok(SingleResponseDto.<List<AlarmDto.Response>>builder()
                .status(HttpStatusCode.OK.getStatusCode())
                .message(HttpStatusCode.OK.getMessage())
                .data(responseDtos)
                .build());
    }

    @Operation(summary = "알림 개별 삭제", description = "입력받은 알림 ID의 알림 삭제")
    @DeleteMapping("/{alarm-id}")
    public ResponseEntity<HttpStatus> deleteAlarm(@PathVariable("alarm-id") @Positive Long alarmId) {
        alarmService.deleteAlarm(alarmId);

        return ResponseEntity.noContent().build();
    }

    @Operation(summary = "알림 전체 삭제", description = "입력받은 사용자의 알림 전체 삭제")
    @DeleteMapping("/all/{account-id}")
    public ResponseEntity<HttpStatus> deleteAlarms(@PathVariable("account-id") @Positive Long accountId) {
        alarmService.deleteAlarms(accountId);

        return ResponseEntity.noContent().build();
    }

    @Operation(summary = "알림 읽음 표시", description = "입력받은 사용자의 알림 읽음으로 표시")
    @PostMapping("/{account-id}")
    public ResponseEntity<HttpStatus> readAlarms(@PathVariable("account-id") @Positive Long accountId) {
        alarmService.readAlarms(accountId);

        return ResponseEntity.noContent().build();
    }
}