package com.growstory.domain.leaf.controller;

import com.growstory.domain.leaf.dto.LeafDto;
import com.growstory.domain.leaf.service.LeafService;
import com.growstory.global.constants.HttpStatusCode;
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
@Validated
@RequiredArgsConstructor
@RequestMapping("/v1/leaves")
public class LeafController {
    private static final String LEAF_DEFAUTL_URL = "/v1/leaves";

    private final LeafService leafService;

    // 식물카드 등록
    @PostMapping
    public ResponseEntity<HttpStatus> postLeaf(@Valid @RequestPart LeafDto.Post leafPostDto,
                                               @RequestPart MultipartFile leafImage) {
        LeafDto.Response leafResponseDto = leafService.createLeaf(leafPostDto, leafImage);
        URI location = UriCreator.createUri(LEAF_DEFAUTL_URL, leafResponseDto.getLeafId());

        return ResponseEntity.created(location).build();
    }

    // 식물카드 수정
    @PatchMapping
    public ResponseEntity<HttpStatus> patchProfileImage(@Valid @RequestPart LeafDto.Patch leafPatchDto,
                                                        @RequestPart MultipartFile leafImage) {
        leafService.updateLeaf(leafPatchDto, leafImage);

        return ResponseEntity.noContent().build();
    }

    // 사용자의 식물카드 전체 조회
    @GetMapping
    public ResponseEntity<SingleResponseDto<List<LeafDto.Response>>> getLeaves() {
        List<LeafDto.Response> leafResponseDtos = leafService.findLeaves();

        return ResponseEntity.ok(SingleResponseDto.<List<LeafDto.Response>>builder()
                .status(HttpStatusCode.OK.getStatusCode())
                .message(HttpStatusCode.OK.getMessage())
                .data(leafResponseDtos)
                .build());
    }


    // 식물카드 단일 조회
    @GetMapping("/{leaf-id}")
    public ResponseEntity<SingleResponseDto<LeafDto.Response>> getLeaf(@PathVariable("leaf-id") @Positive Long leafId) {
        LeafDto.Response leafResponseDto = leafService.findLeaf(leafId);

        return ResponseEntity.ok(SingleResponseDto.<LeafDto.Response>builder()
                .status(HttpStatusCode.OK.getStatusCode())
                .message(HttpStatusCode.OK.getMessage())
                .data(leafResponseDto)
                .build());
    }

    // 식물카드 삭제
    @DeleteMapping("/{leaf-id}")
    public ResponseEntity<HttpStatus> deleteLeaf(@PathVariable("leaf-id") @Positive Long leafId) {
        leafService.deleteLeaf(leafId);

        return ResponseEntity.noContent().build();
    }
}
