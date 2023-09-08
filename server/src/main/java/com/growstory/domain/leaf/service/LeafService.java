package com.growstory.domain.leaf.service;

import com.growstory.domain.account.entity.Account;
import com.growstory.domain.account.service.AccountService;
import com.growstory.domain.images.service.JournalImageService;
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
    private static final String JOURNAL_IMAGE_PROCESS_TYPE = "journal_image";

    private final LeafRepository leafRepository;
    private final AccountService accountService;
    private final S3Uploader s3Uploader;
    private final AuthUserUtils authUserUtils;
    private final JournalImageService journalImageService;

    public LeafDto.Response createLeaf(LeafDto.Post leafPostDto, MultipartFile leafImage) {
        Account findAccount = authUserUtils.getAuthUser();
        Leaf leaf = Leaf.builder()
                .leafName(leafPostDto.getLeafName())
                .content(leafPostDto.getContent())
                .account(findAccount)
                .build();

        String leafImageUrl = leaf.getLeafImageUrl();

        if (Optional.ofNullable(leafImage).isPresent())
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
            Optional.ofNullable(leafImageUrl).ifPresent(imageUrl ->
                    s3Uploader.deleteImageFromS3(imageUrl, LEAF_IMAGE_PROCESS_TYPE));

            leafImageUrl = s3Uploader.uploadImageToS3(leafImage, LEAF_IMAGE_PROCESS_TYPE);
        }

        leafRepository.save(findLeaf.toBuilder()
                .leafName(Optional.ofNullable(leafPatchDto.getLeafName()).orElse(findLeaf.getLeafName()))
                .leafImageUrl(leafImageUrl)
                .content(Optional.ofNullable(leafPatchDto.getContent()).orElse(findLeaf.getContent()))
                .build());
    }

    public List<LeafDto.Response> findLeaves(Long accountId) {
        Account findAccount = accountService.findVerifiedAccount(accountId);

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

        // 저널 삭제
        findLeaf.getJournals().stream()
                .filter(journal -> journal.getJournalImage() != null)
                .forEach(journal -> {
                    journalImageService.deleteJournalImageWithS3(journal.getJournalImage(), JOURNAL_IMAGE_PROCESS_TYPE);
                });
        findLeaf.getJournals().clear();

        // plantobj 연결 해제
        Optional.ofNullable(findLeaf.getPlantObj()).ifPresent(plantObj ->
                plantObj.updateLeaf(null));

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
