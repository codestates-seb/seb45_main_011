package com.growstory.global.response;

import lombok.Builder;
import lombok.Getter;
import org.springframework.data.domain.Page;

import java.util.List;

@Getter
public class MultiResponseDto<T> extends ApiResponse {
    private List<T> data;
    private PageInfo pageInfo;

    @Builder
    public MultiResponseDto(int status, String message, List<T> data, Page page) {
        super(status, message);
        this.data = data;
        this.pageInfo = new PageInfo(page.getNumber() + 1, page.getSize(), page.getTotalElements(), page.getTotalPages());
    }
}
