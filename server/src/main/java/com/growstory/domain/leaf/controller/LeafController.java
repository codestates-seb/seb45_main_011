package com.growstory.domain.leaf.controller;

import com.growstory.domain.leaf.dto.LeafDto;
import com.growstory.domain.leaf.service.LeafService;
import com.growstory.global.constants.HttpStatusCode;
import com.growstory.global.response.SingleResponseDto;
import com.growstory.global.utils.UriCreator;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
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
@Validated
@RequiredArgsConstructor
@Tag(name = "Leaf", description = "Leaf Controller")
@RequestMapping("/v1/leaves")
public class LeafController {
    private static final String LEAF_DEFAUTL_URL = "/v1/leaves";

    private final LeafService leafService;

    @Operation(summary = "식물카드 생성", description = "식물 정보를 입력받아 식물카드 생성")
    @PostMapping
    public ResponseEntity<HttpStatus> postLeaf(@Valid @RequestPart LeafDto.Post leafPostDto,
                                               @RequestPart MultipartFile leafImage) {
        LeafDto.Response leafResponseDto = leafService.createLeaf(leafPostDto, leafImage);
        URI location = UriCreator.createUri(LEAF_DEFAUTL_URL, leafResponseDto.getLeafId());

        return ResponseEntity.created(location).build();
    }

    @Operation(summary = "식물카드 수정", description = "입력받은 식물 정보로 식물카드 수정")
    @PatchMapping
    public ResponseEntity<HttpStatus> patchLeaf(@Valid @RequestPart LeafDto.Patch leafPatchDto,
                                                @RequestPart(required = false) MultipartFile leafImage) {
        leafService.updateLeaf(leafPatchDto, leafImage);

        return ResponseEntity.noContent().build();
    }

    @Operation(summary = "나의 식물카드 조회", description = "입력받은 사용자의 모든 식물카드 조회")
    @GetMapping("/account/{account-id}")
    public ResponseEntity<SingleResponseDto<List<LeafDto.Response>>> getLeaves(@Positive @PathVariable("account-id") Long accountId) {
        List<LeafDto.Response> leafResponseDtos = leafService.findLeaves(accountId);

        return ResponseEntity.ok(SingleResponseDto.<List<LeafDto.Response>>builder()
                .status(HttpStatusCode.OK.getStatusCode())
                .message(HttpStatusCode.OK.getMessage())
                .data(leafResponseDtos)
                .build());
    }


    @Operation(summary = "식물카드 단일 조회", description = "입력받은 식물의 식물카드 조회")
    @GetMapping("/{leaf-id}")
    public ResponseEntity<SingleResponseDto<LeafDto.Response>> getLeaf(@PathVariable("leaf-id") @Positive Long leafId) {
        LeafDto.Response leafResponseDto = leafService.findLeaf(leafId);

        return ResponseEntity.ok(SingleResponseDto.<LeafDto.Response>builder()
                .status(HttpStatusCode.OK.getStatusCode())
                .message(HttpStatusCode.OK.getMessage())
                .data(leafResponseDto)
                .build());
    }

    @Operation(summary = "식물카드 삭제", description = "입력받은 식물의 식물카드 삭제")
    @DeleteMapping("/{leaf-id}")
    public ResponseEntity<HttpStatus> deleteLeaf(@PathVariable("leaf-id") @Positive Long leafId) {
        leafService.deleteLeaf(leafId);

        return ResponseEntity.noContent().build();
    }
}