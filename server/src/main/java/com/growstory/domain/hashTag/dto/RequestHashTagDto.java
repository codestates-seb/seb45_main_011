package com.growstory.domain.hashTag.dto;

import lombok.Getter;

import java.util.ArrayList;
import java.util.List;

@Getter
public class RequestHashTagDto {

    private final List<String> tags = new ArrayList<>();
}
