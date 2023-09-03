package com.growstory.global.util;

import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;

public class UriCreator {
    public static URI createUri(String defaultUrl, long resourceId) {
        return UriComponentsBuilder
                .newInstance()
                .path(defaultUrl+ "/{resource-id}")
                .buildAndExpand(resourceId)
                .toUri();
    }

    public static URI createUri(String defaultUrl, long resourceId1, String anotherResourceName, long resourceId2) {
        return UriComponentsBuilder
                .newInstance()
                .path(defaultUrl+"/{resource-id1}/"+anotherResourceName+"/{resource-id2}")
                .buildAndExpand(resourceId1, resourceId2)
                .toUri();
    }

}