package com.growstory.global.sse.service;

import com.growstory.domain.alarm.constants.AlarmType;
import com.growstory.domain.alarm.service.AlarmService;
import com.growstory.global.sse.repository.SseEmitterRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;

// 추가로, SSE 서비스단에 트랜잭션이 걸려있다면 SSE연결 동안 트랜잭션을 계속 물고 있어
// 커넥션 낭비가 일어날 수 있으니 SSE 서비스로직에는 트랜잭션을 걸지 않아야 합니다.
@RequiredArgsConstructor
@Service
public class SseService {
    // 연결 타임아웃(ms)
    private static final Long DEFAULT_TIMEOUT = 60 * 60 * 1000L;
//    private static final Long DEFAULT_TIMEOUT = 60L;

    private final SseEmitterRepository sseEmitterRepository;
    private final AlarmService alarmService;

    // 클라이언트와 서버 연결(구독)
    public SseEmitter subscribe(Long accountId, String lastEventId) {
        SseEmitter emitter = createEmitter(accountId);

        sendToClient(accountId, "서버와 연결 완료");

//        if (hasLostData(lastEventId)) {
//            sendLostData(lastEventId, memberId, emitterId, emitter);
//        }

        return emitter;
    }

//    private boolean hasLostData(String lastEventId) {
//        return !lastEventId.isEmpty();
//    }

//    private void sendLostData(String lastEventId, Long memberId, String emitterId, SseEmitter emitter) {
//        Map<String, Object> eventCaches = sseEmitterRepository.findAllEventCacheStartWithByMemberId(String.valueOf(memberId));
//        eventCaches.entrySet().stream()
//                .filter(entry -> lastEventId.compareTo(entry.getKey()) < 0)
//                .forEach(entry -> sendNotification(emitter, entry.getKey(), emitterId, entry.getValue()));
//    }

    // 서버의 이벤트를 클라이언트 측으로 전송하기 위해
    // 서버의 다른 서비스에서 호출
    public void notify(Long accountId, AlarmType alarmType) {
        alarmService.createAlarm(accountId, alarmType);

        sendToClient(accountId, alarmType.getStepDescription());
    }

    // 클라이언트 측으로 데이터 전송
    private void sendToClient(Long accountId, String data) {
        SseEmitter emitter = sseEmitterRepository.get(accountId);

        if (emitter != null) {
            try {
                emitter.send(SseEmitter.event()
                        .id(String.valueOf(accountId))
                        .name("sse")
                        .data(data));
            } catch (IOException exception) {
                sseEmitterRepository.deleteById(accountId);
                emitter.completeWithError(exception);
            }
        }
    }

    private SseEmitter createEmitter(Long accountId) {
        SseEmitter emitter = new SseEmitter(DEFAULT_TIMEOUT);
        sseEmitterRepository.save(accountId, emitter);

        emitter.onCompletion(() -> sseEmitterRepository.deleteById(accountId));
        emitter.onTimeout(() -> sseEmitterRepository.deleteById(accountId));

        return emitter;
    }
}
