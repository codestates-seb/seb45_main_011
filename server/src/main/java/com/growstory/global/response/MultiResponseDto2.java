package com.growstory.global.response;

import lombok.Builder;
import lombok.Getter;
import org.springframework.data.domain.Page;

import java.util.List;

@Getter
public class MultiResponseDto2<T,V> extends ApiResponse {

        private List<T> data;
        private List<V> data2;
        private PageInfo pageInfo;

        @Builder
        public MultiResponseDto2(int status, String message, List<T> data, List<V> data2, Page page) {
            super(status, message);
            this.data = data;
            this.data2 = data2;
            this.pageInfo = new PageInfo(page.getNumber() + 1, page.getSize(), page.getTotalElements(), page.getTotalPages());
        }
}
