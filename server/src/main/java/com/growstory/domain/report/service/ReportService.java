package com.growstory.domain.report.service;

import com.growstory.domain.account.dto.AccountDto;
import com.growstory.domain.account.entity.Account;
import com.growstory.domain.account.service.AccountService;
import com.growstory.domain.report.dto.ReportDto;
import com.growstory.domain.report.entity.Report;
import com.growstory.domain.report.repository.ReportRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Transactional
@RequiredArgsConstructor
@Service
public class ReportService {
    private final ReportRepository reportRepository;
    private final AccountService accountService;

    public ReportDto.Response createReport(ReportDto.Post requestDto) {
        Account findAccount = accountService.findVerifiedAccount(requestDto.getAccountId());
        Account findReportedAccount = accountService.findVerifiedAccount(requestDto.getReportedAccountId());

        Report savedReport = reportRepository.save(Report.builder()
                .account(findAccount)
                .reportedAccountId(requestDto.getReportedAccountId())
                .content(requestDto.getContent())
                .build());
        findAccount.addReport(savedReport);
        findReportedAccount.updateReportsNum();

        return ReportDto.Response.builder()
                .reportId(savedReport.getReportId())
                .build();
    }

    @Transactional(readOnly = true)
    public Page<ReportDto.Response> getReports(int page, int size) {
        List<Report> reports = reportRepository.findAll();
        List<ReportDto.Response> responses = reports.stream()
                .map(report -> {
                    Account findReportedAccount = accountService.findVerifiedAccount(report.getReportedAccountId());

                    return ReportDto.Response.builder()
                            .reportId(report.getReportId())
                            .displayName(report.getAccount().getDisplayName())
                            .reportedDisplayName(findReportedAccount.getDisplayName())
                            .content(report.getContent())
                            .createdAt(report.getCreatedAt())
                            .build();
                })
                .collect(Collectors.toList());

        int startIdx = page * size;
        int endIdx = Math.min(responses.size(), (page + 1) * size);
        return new PageImpl<>(responses.subList(startIdx, endIdx), PageRequest.of(page, size), responses.size());
    }
}
