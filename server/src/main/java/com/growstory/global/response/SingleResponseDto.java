package com.growstory.global.response;

import com.growstory.global.constants.HttpStatusCode;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class SingleResponseDto<T> extends ApiResponse {
    private T data;

    @Builder
    public SingleResponseDto(int status, String message, T data) {
        super(status, message);
        this.data = data;
    }
    @Builder
    public SingleResponseDto(HttpStatusCode status, String message, T data) {
        super(status.getStatusCode(), message);
        this.data = data;
    }
}
