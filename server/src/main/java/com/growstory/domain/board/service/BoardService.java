package com.growstory.domain.board.service;

import com.growstory.domain.account.entity.Account;
import com.growstory.domain.board.dto.RequestBoardDto;
import com.growstory.domain.board.dto.ResponseBoardDto;
import com.growstory.domain.board.dto.ResponseBoardPageDto;
import com.growstory.domain.board.entity.Board;
import com.growstory.domain.board.repository.BoardRepository;
import com.growstory.domain.hashTag.entity.HashTag;
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
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RequiredArgsConstructor
@Service
public class BoardService {

    private static final String BOARD_IMAGE_PROCESS_TYPE = "boards";

    private final BoardRepository boardRepository;
    private final HashTagService hashTagService;
    private final BoardImageService boardImageService;
    private final AuthUserUtils authUserUtils;
//    private final CommentService commentService;


    public Long createBoard(RequestBoardDto.Post requestBoardDto, MultipartFile image) {
        Account findAccount = authUserUtils.getAuthUser();

        // TODO: image가 null일 경우 아에 saveBoardImage 실행이 되지 않도록 수정 해야 됨
        // S3 Upload && save image in Board_Image
        boardImageService.saveBoardImage(image);

        // TODO: 해시 태그 - 현재 입력 안됨. null로 비워두고 요청 보낼 것, 추후 해시 태그 부분 리팩토링
        // Save HashTags
//        if (hashTagsDto != null) {
//            for (String tag : hashTagsDto.getTags()) {
//                hashTagService.createHashTag(tag);
//            }
//        }


        Board board = Board.builder()
                .title(requestBoardDto.getTitle())
                .content(requestBoardDto.getContent())
                .account(findAccount)
                .build();

        Board saveBoard = boardRepository.save(board);

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

