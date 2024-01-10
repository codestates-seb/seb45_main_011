package com.growstory.domain.report.controller;

import com.growstory.domain.report.dto.ReportDto;
import com.growstory.domain.report.service.ReportService;
import com.growstory.global.constants.HttpStatusCode;
import com.growstory.global.response.MultiResponseDto;
import com.growstory.global.utils.UriCreator;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.net.URI;

@Tag(name = "Report", description = "Report Controller")
@Validated
@RequiredArgsConstructor
@RequestMapping("/v1/reports")
@RestController
public class ReportController {
    private static final String REPORT_DEFAULT_URL = "/v1/reports";

    private final ReportService reportService;

    @Operation(summary = "신고 기능", description = "사용자 정보를 입력받아 그 사용자에 대한 신고 기능")
    @PostMapping
    public ResponseEntity<HttpStatus> postReport(@Valid @RequestBody ReportDto.Post reportPostDto) {
        ReportDto.Response responseDto = reportService.createReport(reportPostDto);
        URI location = UriCreator.createUri(REPORT_DEFAULT_URL, responseDto.getReportId());

        return ResponseEntity.created(location).build();
    }

    @Operation(summary = "전체 신고 조회", description = "전체 신고 조회")
    @GetMapping("/all")
    public ResponseEntity<MultiResponseDto<ReportDto.Response>> getReports(@Positive @RequestParam(defaultValue = "1") int page,
                                                                           @Positive @RequestParam(defaultValue = "10") int size) {
        Page<ReportDto.Response> responseDto = reportService.getReports(page - 1, size);

        return ResponseEntity.ok(MultiResponseDto.<ReportDto.Response>builder()
                .status(HttpStatusCode.OK.getStatusCode())
                .message(HttpStatusCode.OK.getMessage())
                .data(responseDto.getContent())
                .page(responseDto)
                .build());
    }
}
