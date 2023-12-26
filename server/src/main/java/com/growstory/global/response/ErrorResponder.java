package com.growstory.global.response;

import com.google.gson.Gson;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class ErrorResponder {
    public static void sendErrorResponse(HttpServletResponse response, HttpStatus status) throws IOException {
        Gson gson = new Gson();
        ErrorResponse errorResponse = ErrorResponse.of(status);
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        response.setStatus(status.value());
        response.getWriter().write(gson.toJson(errorResponse, ErrorResponse.class));
    }

    public static void sendErrorResponse(HttpServletResponse response, int status, String message) throws IOException {
        Gson gson = new Gson();
        ErrorResponse errorResponse = ErrorResponse.of(HttpStatus.valueOf(status), message);
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        response.setStatus(status);
        response.getWriter().write(gson.toJson(errorResponse, ErrorResponse.class));
    }
}
