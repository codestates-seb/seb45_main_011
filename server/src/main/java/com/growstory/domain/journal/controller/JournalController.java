package com.growstory.domain.journal.controller;

import com.growstory.domain.account.service.AccountService;
import com.growstory.domain.journal.dto.JournalDto;
import com.growstory.domain.journal.service.JournalService;
import com.growstory.global.response.SingleResponseDto;
import com.growstory.global.utils.UriCreator;
import lombok.RequiredArgsConstructor;
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
@RequiredArgsConstructor
@Validated
public class JournalController {

    private final JournalService journalService;

    private static final String DEFAULT_URL = "/v1/leaves";

    // GET, 특정 식물 관리 카드와 관련된 모든 일지 조회
    @GetMapping("/{leaf-id}/journals")
    public ResponseEntity<SingleResponseDto> getJournals(
            @Positive  @PathVariable("leaf-id") Long leafId,
            @RequestParam Long accountId) {

        List<JournalDto.Response> journals = journalService.findAllJournals(accountId, leafId);

        return ResponseEntity.ok().body(SingleResponseDto.builder()
                .status(HttpStatus.OK.value())
                .message(HttpStatus.OK.getReasonPhrase())
                .data(journals).build());
    }

    // POST, 식물 일지를 등록
    @PostMapping("/{leaf-id}/journals")
    public ResponseEntity<HttpStatus> postJournal(@RequestPart JournalDto.LeafAuthor leafAuthor,
                                                  @Positive @PathVariable("leaf-id") Long leafId,
                                                  @Valid @RequestPart JournalDto.Post postDto,
                                                  @RequestPart(required = false) MultipartFile image) {
        JournalDto.Response journal = journalService.createJournal(leafAuthor.getAccountId(), leafId, postDto, image);

        URI location = UriCreator.createUri(DEFAULT_URL, journal.getJournalId());

        return ResponseEntity.created(location).build();
    }

    // PATCH, 식물 일지를 수정
    @PatchMapping("/journals/{journal-id}")
    public ResponseEntity<HttpStatus> patchJournal(@RequestPart JournalDto.LeafAuthor leafAuthor,
                                                   @Positive @PathVariable("journal-id") Long journalId,
                                                   @Valid @RequestPart JournalDto.Patch patchDto,
                                                   @RequestPart(required = false) MultipartFile image) {

        journalService.updateJournal(leafAuthor.getAccountId(), journalId, patchDto, image);

        return ResponseEntity.noContent().build();
    }

    // DELETE, 식물 일지를 삭제
    @DeleteMapping("/journals/{journal-id}")
    public ResponseEntity<HttpStatus> deleteJournal(
            @RequestBody JournalDto.LeafAuthor leafAuthor,
            @Positive @PathVariable("journal-id") Long journalId) {
        journalService.deleteJournal(leafAuthor.getAccountId(), journalId);

        return ResponseEntity.noContent().build();
    }
}
