package com.growstory.global.sse.repository;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@RequiredArgsConstructor
@Repository
public class SseEmitterRepository {
    // 동시성 문제 thread-safe한 concurrentHashMap 사용
    private final Map<Long, SseEmitter> emitters = new ConcurrentHashMap<>();

    public void save(Long accountId, SseEmitter emitter) {
        emitters.put(accountId, emitter);
    }

    public void deleteById(Long accountId) {
        emitters.remove(accountId);
    }

    public SseEmitter get(Long accountId) {
        return emitters.get(accountId);
    }
}
