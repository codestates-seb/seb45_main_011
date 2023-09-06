package com.growstory.domain.journal.controller;

import com.growstory.domain.journal.dto.JournalDto;
import com.growstory.domain.journal.service.JournalService;
import com.growstory.global.response.SingleResponseDto;
import com.growstory.global.utils.UriCreator;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/v1/leaves")
@Validated
public class JournalController {

    private final JournalService journalService;

    private static final String DEFAULT_URL = "http://localhost8080/v1/leaves";

    public JournalController(JournalService journalService) {
        this.journalService = journalService;
    }

    @GetMapping("/{leaf-id}/journals")
    public ResponseEntity<SingleResponseDto> getJournals(@Positive  @PathVariable("leaf-id") Long leafId) {

        List<JournalDto.Response> journals = journalService.findAllJournals(leafId);

        return ResponseEntity.ok().body(SingleResponseDto.builder()
                .status(HttpStatus.OK.value())
                .message(HttpStatus.OK.getReasonPhrase())
                .data(journals).build());
    }

    @PostMapping("/{leaf-id}/journals")
    public ResponseEntity<HttpStatus> postJournal(@Positive @PathVariable("leaf-id") Long leafId,
                                                  @Valid @RequestPart JournalDto.Post postDto,
                                                  @RequestPart(required = false) MultipartFile image) {
        JournalDto.Response journal = journalService.createJournal(leafId, postDto, image);

        URI location = UriCreator.createUri(DEFAULT_URL, journal.getJournalId());

        return ResponseEntity.created(location).build();
    }

    @PatchMapping("/journals/{journal-id}")
    public ResponseEntity<HttpStatus> patchJournal(@Positive Long accountId,
                                                   @Positive @PathVariable("journal-id") Long journalId,
                                                   @Valid @RequestPart JournalDto.Patch patchDto,
                                                   @RequestPart(required = false) MultipartFile image) {

        journalService.updateJournal(accountId, journalId, patchDto, image);

        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/journals/{journal-id}")
    public ResponseEntity<HttpStatus> deleteJournal(@Positive @PathVariable("journal-id") Long journalId) {
        journalService.deleteJournal(journalId);

        return ResponseEntity.noContent().build();
    }
}
