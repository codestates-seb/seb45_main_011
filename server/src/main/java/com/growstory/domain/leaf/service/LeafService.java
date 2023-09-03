package com.growstory.domain.leaf.service;

import com.growstory.domain.account.entity.Account;
import com.growstory.domain.leaf.dto.LeafDto;
import com.growstory.domain.leaf.entity.Leaf;
import com.growstory.domain.leaf.repository.LeafRepository;
import com.growstory.global.auth.utils.AuthUserUtils;
import com.growstory.global.aws.service.S3Uploader;
import com.growstory.global.exception.BusinessLogicException;
import com.growstory.global.exception.ExceptionCode;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Transactional
@Service
@RequiredArgsConstructor
public class LeafService {
    private static final String LEAF_IMAGE_PROCESS_TYPE = "leaves";

    private final LeafRepository leafRepository;
    private final S3Uploader s3Uploader;
    private final AuthUserUtils authUserUtils;

    public LeafDto.Response createLeaf(LeafDto.Post leafPostDto, MultipartFile leafImage) {
        Account findAccount = authUserUtils.getAuthUser();
        String leafImageUrl = s3Uploader.uploadImageToS3(leafImage, LEAF_IMAGE_PROCESS_TYPE);

        Leaf savedLeaf = leafRepository.save(Leaf.builder()
                .leafName(leafPostDto.getLeafName())
                .leafImageUrl(leafImageUrl)
                .place(leafPostDto.getPlace())
                .content(leafPostDto.getContent())
                .account(findAccount)
                .build());

        findAccount.addLeaf(savedLeaf);

        return LeafDto.Response.builder()
                .leafId(savedLeaf.getLeafId())
                .build();
    }

    public void updateLeaf(LeafDto.Patch leafPatchDto, MultipartFile leafImage) {
        Account findAccount = authUserUtils.getAuthUser();
        Leaf findLeaf = findVerifiedLeaf(findAccount.getAccountId(), leafPatchDto.getLeafId());

        s3Uploader.deleteImageFromS3(findLeaf.getLeafImageUrl(), LEAF_IMAGE_PROCESS_TYPE);

        leafRepository.save(findLeaf.toBuilder()
                .leafName(leafPatchDto.getLeafName())
                .leafImageUrl(s3Uploader.uploadImageToS3(leafImage, LEAF_IMAGE_PROCESS_TYPE))
                .place(leafPatchDto.getPlace())
                .content(leafPatchDto.getContent())
                .build());
    }

    public List<LeafDto.Response> findLeaves() {
        Account findAccount = authUserUtils.getAuthUser();

        return leafRepository.findByAccount(findAccount).stream()
                .map(leaf -> getLeafResponseDto(leaf))
                .collect(Collectors.toList());
    }

    public LeafDto.Response findLeaf(Long leafId) {
        Account findAccount = authUserUtils.getAuthUser();

        return getLeafResponseDto(findVerifiedLeaf(findAccount.getAccountId(), leafId));
    }

    public Leaf findLeafEntityBy(Long leafId) {
        Account findAccount = authUserUtils.getAuthUser();
        Leaf findLeaf = findVerifiedLeaf(findAccount.getAccountId(), leafId);
        return findLeaf;
    }

    public void deleteLeaf(Long leafId) {
        Account findAccount = authUserUtils.getAuthUser();
        Leaf findLeaf = findVerifiedLeaf(findAccount.getAccountId(), leafId);

        s3Uploader.deleteImageFromS3(findLeaf.getLeafImageUrl(), LEAF_IMAGE_PROCESS_TYPE);
        // account에서 leaf 삭제하면 cascade로 인해 leafRepo.delete() 없이 db에서 자동 삭제
        findAccount.getLeaves().remove(findLeaf);
    }

    private Leaf findVerifiedLeaf(Long accountId, Long leafId) {
        Leaf findLeaf = leafRepository.findById(leafId).orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.LEAF_NOT_FOUND));

        if (!Objects.equals(accountId, findLeaf.getAccount().getAccountId()))
            throw new BusinessLogicException(ExceptionCode.ACCOUNT_NOT_ALLOW);
        else return findLeaf;
    }

    private static LeafDto.Response getLeafResponseDto(Leaf findLeaf) {
        return LeafDto.Response.builder()
                .leafId(findLeaf.getLeafId())
                .leafImageUrl(findLeaf.getLeafImageUrl())
                .place(findLeaf.getPlace())
                .content(findLeaf.getContent())
                .build();
    }
}
