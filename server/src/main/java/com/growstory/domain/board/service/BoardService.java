package com.growstory.domain.board.service;

import com.growstory.domain.account.entity.Account;
import com.growstory.domain.board.dto.RequestBoardDto;
import com.growstory.domain.board.dto.ResponseBoardDto;
import com.growstory.domain.board.dto.ResponseBoardPageDto;
import com.growstory.domain.board.entity.Board;
import com.growstory.domain.board.entity.Board_HashTag;
import com.growstory.domain.board.repository.BoardHashTagResitory;
import com.growstory.domain.board.repository.BoardRepository;
import com.growstory.domain.comment.service.CommentService;
import com.growstory.domain.hashTag.dto.RequestHashTagDto;
import com.growstory.domain.hashTag.entity.HashTag;
import com.growstory.domain.hashTag.repository.HashTagRepository;
import com.growstory.domain.hashTag.service.HashTagService;
import com.growstory.domain.images.entity.BoardImage;
import com.growstory.domain.images.service.BoardImageService;
import com.growstory.global.auth.utils.AuthUserUtils;
import com.growstory.global.exception.BusinessLogicException;
import com.growstory.global.exception.ExceptionCode;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Transactional
@Service
public class BoardService {

    private static final String BOARD_IMAGE_PROCESS_TYPE = "boards";

    private final BoardRepository boardRepository;
    private final HashTagService hashTagService;
    private final BoardImageService boardImageService;
    private final AuthUserUtils authUserUtils;
    private final HashTagRepository hashTagRepository;
    private final BoardHashTagResitory boardHashtagRepository;
//    private final CommentService commentService;


    public Long createBoard(RequestBoardDto.Post requestBoardDto, MultipartFile image) {
        Account findAccount = authUserUtils.getAuthUser();

        // 입력 받은 이미지가 있을 경우 saveBoardImage 메서드 호출
        if (!image.isEmpty()) {
            // Upload image in S3 && save image in Board_Image
            boardImageService.saveBoardImage(image);
        }

        Board board = Board.builder()
                .title(requestBoardDto.getTitle())
                .content(requestBoardDto.getContent())
                .account(findAccount)
                .build();
        Board saveBoard = boardRepository.save(board);

        // Save HashTags
        if (requestBoardDto.getHashTags() != null) {
            for (String tag : requestBoardDto.getHashTags()) {
                HashTag hashTag = hashTagRepository.findByTag(tag);
                if (hashTag == null) {
                    hashTag = new HashTag();
                    hashTag.setTag(tag);
                    hashTagRepository.save(hashTag);
                }

                Board_HashTag boardHashtag = new Board_HashTag();
                boardHashtag.addBoard(board);
                boardHashtag.addHashTag(hashTag);

                boardHashtagRepository.save(boardHashtag);
            }
        }



        return saveBoard.getBoardId();
    }
//
    public ResponseBoardDto getBoard(Long boardId) {
        Account findAccount = authUserUtils.getAuthUser();

        Board findBoard = findVerifiedBoard(boardId);

        BoardImage findBoardImage = boardImageService.verifyExistBoardImage(boardId);

        List<HashTag> findHashTag = hashTagService.getHashTags(boardId);

//        List<Comment> findComment = commentService.getComments(boardId);

        return getResponseBoardDto(findBoard, findBoardImage, findAccount, findHashTag);
//        return getResponseBoardDto(findBoard, findBoardImage, findAccount, findHashTag, findComment);
    }

    public Page<ResponseBoardPageDto> findBoards(int page, int size) {
        Page<ResponseBoardPageDto> boards = boardRepository.findAll(PageRequest.of(page, size, Sort.by("createdAt").descending()))
                .map(board -> ResponseBoardPageDto.builder()
                        .boardId(board.getBoardId())
                        .title(board.getTitle())
                        .content(board.getContent())
                        .boardImageUrl(board.getBoardImages().get(0).getStoredImagePath())
                        .likeNum(board.getBoardLikes().size())
                        .commentNum(board.getBoardComments().size())
                        .build());
                // boardImage 여러 개일 경우 ResponseBoardPageDto 에서 imageUrl 타입을 List로 변경 후
//                .boardImageUrl(board.getBoardImages().stream().map(boardImage -> boardImage.getStoredImagePath()).collect(Collectors.toList()))

        return boards;
    }
//
//    public void modifyBoard(Long boardId, RequestBoardDto.Patch requestBoardDto, MultipartFile image) {
//        Account findBoard = authUserUtils.getAuthUser();
//
////        Leaf findLeaf = leafRepository.findById(leafId)
////                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.LEAF_NOT_FOUND));
//
//        // image가 null일 경우 S3에 저장된 image Object 삭제 + Board_Image(DB) 삭제
//
//        // image가 있을 경우 S3에 저장된 image Object 삭제 + Board_Image(DB) 저장
//
//    }
//
//
    public void removeBoard(Long boardId) {
        Board findBoard = findVerifiedBoard(boardId);

        // delete Board Image in S3
        boardImageService.deleteBoardImage(findBoard.getBoardId());

        boardRepository.delete(findBoard);
    }


    public Board findVerifiedBoard(Long boardId) {
        return boardRepository.findById(boardId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.BOARD_NOT_FOUND));
    }

    private static ResponseBoardDto getResponseBoardDto(Board findBoard, BoardImage findBoardImage, Account findAccount, List<HashTag> findHashTag) {
        return ResponseBoardDto.builder()
                .boardId(findBoard.getBoardId())
                .title(findBoard.getTitle())
                .content(findBoard.getContent())
                .boardImageUrl(findBoardImage.getStoredImagePath())
                .likeNum(findBoard.getBoardLikes().size())
                .createAt(findBoard.getCreatedAt())
                .modifiedAt(findBoard.getModifiedAt())
                .accountId(findAccount.getAccountId())
                .displayName(findAccount.getDisplayName())
                .profileImageUrl(findAccount.getProfileImageUrl())
                .hashTags(findHashTag)
//                .comments(findComment)
                .build();
    }
}

