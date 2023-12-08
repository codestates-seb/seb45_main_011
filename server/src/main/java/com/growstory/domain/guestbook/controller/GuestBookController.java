package com.growstory.domain.guestbook.controller;


import com.growstory.domain.guestbook.dto.GuestBookRequestDto;
import com.growstory.domain.guestbook.dto.GuestBookResponseDto;
import com.growstory.domain.guestbook.service.GuestBookService;
import com.growstory.global.constants.HttpStatusCode;
import com.growstory.global.response.MultiResponseDto;
import com.growstory.global.utils.UriCreator;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.net.URI;

@Tag(name = "GuestBook API", description = "방명록 API")
@Validated
@RequiredArgsConstructor
@RequestMapping("/v1/guestbooks")
@RestController
public class GuestBookController {

    private final GuestBookService guestBookService;

    private final static String GUESTBOOK_DEFAULT_URL = "/v1/guestbooks";


    @Operation(summary = "Create GuestBook API", description = "방명록 추가 기능")
    @PostMapping("/{accountId}")
    public ResponseEntity<?> postGuestBook(@Positive @PathVariable("accountId") Long accountId,
                                           @Valid @RequestBody GuestBookRequestDto.Post requestDto) {
        Long guestBookId = guestBookService.saveGuestBook(accountId, requestDto);

        URI location = UriCreator.createUri(GUESTBOOK_DEFAULT_URL, guestBookId);

        return ResponseEntity.created(location).build();
    }

    @Operation(summary = "Read Page GuestBook API", description = "방명록 페이지 조회 기능")
    @GetMapping("{accountId}")
    public ResponseEntity<MultiResponseDto<GuestBookResponseDto>> readGuestBooks(@Positive @PathVariable("accountId") Long accountId,
                                                                                 @Positive @RequestParam(defaultValue = "1") int page,
                                                                                 @Positive @RequestParam(defaultValue = "12") int size) {
        Page<GuestBookResponseDto> responseDtoPage = guestBookService.getGuestbookPage(accountId, page - 1, size);

        return ResponseEntity.ok(MultiResponseDto.<GuestBookResponseDto>builder()
                        .status(HttpStatusCode.OK.getStatusCode())
                        .message(HttpStatusCode.OK.getMessage())
                        .data(responseDtoPage.getContent())
                        .page(responseDtoPage).build());
    }


    @Operation(summary = "Update GuestBook API", description = "방명록 수정 기능")
    @PatchMapping("{guestBookId}")
    public ResponseEntity<?> updateGuestBook(@Positive @PathVariable("guestBookId") Long guestBookId,
                                             @Valid @RequestBody GuestBookRequestDto.Patch requestDto) {
        guestBookService.updateGuestBook(guestBookId, requestDto);

        return ResponseEntity.noContent().build();
    }

    @Operation(summary = "Delete GuestBook API", description = "방명록 삭제 기능")
    @DeleteMapping("/{guestBookId}")
    public ResponseEntity<?> deleteGuestBook(@Positive @PathVariable("guestBookId") Long guestBookId) {
        guestBookService.deleteGuestbook(guestBookId);

        return ResponseEntity.noContent().build();
    }
}
