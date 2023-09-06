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
import java.util.Optional;
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
        Leaf leaf = Leaf.builder()
                .leafName(leafPostDto.getLeafName())
                .content(leafPostDto.getContent())
                .account(findAccount)
                .build();

        String leafImageUrl = leaf.getLeafImageUrl();

        if (!leafImage.isEmpty())
            leafImageUrl = s3Uploader.uploadImageToS3(leafImage, LEAF_IMAGE_PROCESS_TYPE);

        Leaf savedLeaf = leafRepository.save(leaf.toBuilder()
                        .leafImageUrl(leafImageUrl)
                        .build());

        findAccount.addLeaf(savedLeaf);

        return LeafDto.Response.builder()
                .leafId(savedLeaf.getLeafId())
                .build();
    }

    public void updateLeaf(LeafDto.Patch leafPatchDto, MultipartFile leafImage) {
        Account findAccount = authUserUtils.getAuthUser();
        Leaf findLeaf = findVerifiedLeaf(findAccount.getAccountId(), leafPatchDto.getLeafId());
        String leafImageUrl = findLeaf.getLeafImageUrl();

        if (leafPatchDto.getIsImageUpdated()) {
            leafImageUrl = s3Uploader.uploadImageToS3(leafImage, LEAF_IMAGE_PROCESS_TYPE);
            Optional.ofNullable(leafImageUrl).ifPresent(imageUrl ->
                    s3Uploader.deleteImageFromS3(imageUrl, LEAF_IMAGE_PROCESS_TYPE));
        }

        leafRepository.save(findLeaf.toBuilder()
                .leafName(Optional.ofNullable(leafPatchDto.getLeafName()).orElse(findLeaf.getLeafName()))
                .leafImageUrl(leafImageUrl)
                .content(Optional.ofNullable(leafPatchDto.getContent()).orElse(findLeaf.getContent()))
                .build());
    }

    public List<LeafDto.Response> findLeaves() {
        Account findAccount = authUserUtils.getAuthUser();

        return leafRepository.findByAccount(findAccount).stream()
                .map(this::getLeafResponseDto)
                .collect(Collectors.toList());
    }

    public LeafDto.Response findLeaf(Long leafId) {
        Account findAccount = authUserUtils.getAuthUser();

        return getLeafResponseDto(findVerifiedLeaf(findAccount.getAccountId(), leafId));
    }

    public Leaf findLeafEntityWithNoAuth(Long leafId) {
        return leafRepository.findById(leafId).orElseThrow(() ->
                    new BusinessLogicException(ExceptionCode.LEAF_NOT_FOUND));
    }

    public Leaf findLeafEntityBy(Long leafId) {
        Account findAccount = authUserUtils.getAuthUser();
        Leaf findLeaf = findVerifiedLeaf(findAccount.getAccountId(), leafId);
        return findLeaf;
    }

    public void deleteLeaf(Long leafId) {
        Account findAccount = authUserUtils.getAuthUser();
        Leaf findLeaf = findVerifiedLeaf(findAccount.getAccountId(), leafId);

        Optional.ofNullable(findLeaf.getLeafImageUrl()).ifPresent(leafImageUrl ->
                s3Uploader.deleteImageFromS3(leafImageUrl, LEAF_IMAGE_PROCESS_TYPE));

        findAccount.getLeaves().remove(findLeaf);
    }

    private Leaf findVerifiedLeaf(Long accountId, Long leafId) {
        Leaf findLeaf = leafRepository.findById(leafId).orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.LEAF_NOT_FOUND));

        if (!Objects.equals(accountId, findLeaf.getAccount().getAccountId()))
            throw new BusinessLogicException(ExceptionCode.ACCOUNT_NOT_ALLOW);
        else return findLeaf;
    }

    private LeafDto.Response getLeafResponseDto(Leaf findLeaf) {
        return LeafDto.Response.builder()
                .leafId(findLeaf.getLeafId())
                .leafName(findLeaf.getLeafName())
                .leafImageUrl(findLeaf.getLeafImageUrl())
                .content(findLeaf.getContent())
                .createdAt(findLeaf.getCreatedAt())
                .build();
    }
}
