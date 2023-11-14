package com.growstory.global.sse.controller;

import com.growstory.domain.alarm.constants.AlarmType;
import com.growstory.global.sse.service.SseService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

@Tag(name = "Server-Sent-Event", description = "SSE Controller")
@Validated
@RequiredArgsConstructor
@RequestMapping("/v1/sse")
@RestController
public class SseController {
    private final SseService sseService;

    @Operation(summary = "구독 연결", description = "클라이언트 측과 서버 연결")
    @GetMapping(value = "/subscribe/{account-id}", produces = "text/event-stream") // text/event-stream => sse 형식
    public SseEmitter subscribe(@PathVariable("account-id") Long accountId,
                                @RequestHeader(value = "Last-Event-ID", required = false, defaultValue = "") String lastEventId) { // lastEventId는 타임아웃 이후 재연결 요청을 할 때 헤더로 들어오는 값
        return sseService.subscribe(accountId, lastEventId);
    }

//    const eventSource = new EventSource('http://localhost:8888/v1/sse/subscribe/1');
//    eventSource.addEventListener('sse', event => {
//        console.log(event);
//    });


    // 테스트 용
    @Operation(summary = "알림 전송", description = "클라이언트 측으로 알림 전송")
    @PostMapping("/send/{account-id}")
    public void sendAlarm(@PathVariable("account-id") Long accountId) {
        sseService.notify(accountId, AlarmType.DAILY_QUIZ);
    }
}
