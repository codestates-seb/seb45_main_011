package com.growstory.global.response;

import lombok.Builder;
import lombok.Getter;
import org.springframework.data.domain.Page;

@Getter
@Builder
public class PageResponse<T> {
    private int totalPage;
    private int currentPage;
    private Long totalElements;
    private int currentElements;
    private boolean hasPrevious;
    private boolean hasNext;
    private boolean isLast;
    private T data;

    // 정적 팩토리 메서드, page와 data로부터 ResponseDto 생성
    public static <T, U> PageResponse<T> of(Page<U> page, T data) {
        return PageResponse.<T>builder()
                .totalPage(page.getTotalPages())
                .currentPage(page.getNumber())
                .totalElements(page.getTotalElements())
                .currentElements(page.getNumberOfElements())
                .hasPrevious(page.hasPrevious())
                .hasNext(page.hasNext())
                .isLast(page.isLast())
                .data(data)
                .build();
    }
}
