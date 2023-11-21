package com.growstory.global.utils;

import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;

@Component
public class UriCreator {
    public static URI createUri(String defaultUrl, long resourceId) {
        return UriComponentsBuilder
                .newInstance()
                .path(defaultUrl+ "/{resource-id}")
                .buildAndExpand(resourceId)
                .toUri();
    }

    public static URI creatUri(String defaultUrl, long resourceId1, String anotherResourceName, long resourceId2) {
        return UriComponentsBuilder
                .newInstance()
                .path(defaultUrl+"/{resource-id1}/"+anotherResourceName+"/{resource-id2}")
                .buildAndExpand(resourceId1, resourceId2)
                .toUri();
    }

    // 테스트용
    public URI createUri_test(String defaultUrl, long resourceId) {
        return UriComponentsBuilder
                .newInstance()
                .path(defaultUrl+ "/{resource-id}")
                .buildAndExpand(resourceId)
                .toUri();
    }
}