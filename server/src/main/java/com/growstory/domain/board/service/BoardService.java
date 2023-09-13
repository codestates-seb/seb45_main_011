package com.growstory.domain.board.service;

import com.growstory.domain.account.entity.Account;
import com.growstory.domain.board.dto.RequestBoardDto;
import com.growstory.domain.board.dto.ResponseBoardDto;
import com.growstory.domain.board.dto.ResponseBoardPageDto;
import com.growstory.domain.board.entity.Board;
import com.growstory.domain.board.entity.Board_HashTag;
import com.growstory.domain.board.repository.BoardHashTagRepository;
import com.growstory.domain.board.repository.BoardRepository;
import com.growstory.domain.comment.dto.ResponseCommentDto;
import com.growstory.domain.comment.repository.CommentRepository;
import com.growstory.domain.comment.service.CommentService;
import com.growstory.domain.hashTag.dto.ResponseHashTagDto;
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

import java.util.List;
import java.util.Objects;
import java.util.Optional;

@RequiredArgsConstructor
@Transactional
@Service
public class BoardService {

    private final BoardRepository boardRepository;
    private final HashTagService hashTagService;
    private final BoardImageService boardImageService;
    private final AuthUserUtils authUserUtils;
    private final HashTagRepository hashTagRepository;
    private final BoardHashTagRepository boardHashtagRepository;
    private final CommentService commentService;


    public Long createBoard(RequestBoardDto.Post requestBoardDto, MultipartFile image) {
        Account findAccount = authUserUtils.getAuthUser();


        Board board = Board.builder()
                .title(requestBoardDto.getTitle())
                .content(requestBoardDto.getContent())
                .account(findAccount)
                .build();

        Board saveBoard = boardRepository.save(board);
        // 입력 받은 이미지가 있을 경우 saveBoardImage 메서드 호출
        if (image != null) {
            // Upload image in S3 && save image in Board_Image
            boardImageService.saveBoardImage(image, saveBoard);
        }

        // Save HashTags
        if (requestBoardDto.getHashTags() != null) {
            for (String tag : requestBoardDto.getHashTags()) {
                HashTag hashTag = hashTagService.createHashTagIfNotExist(tag);

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
        List<ResponseHashTagDto> findHashTag = hashTagService.getHashTagList(boardId);
        List<ResponseCommentDto> findComment = commentService.getCommentList(boardId);

        return getResponseBoardDto(findAccount, findBoard, findBoardImage, findHashTag, findComment);
    }

    public Page<ResponseBoardPageDto> findBoards(int page, int size) {
        Page<ResponseBoardPageDto> boards = boardRepository.findAll(PageRequest.of(page, size, Sort.by("createdAt").descending()))
                .map(board -> ResponseBoardPageDto.builder()
                        .boardId(board.getBoardId())
                        .title(board.getTitle())
                        .content(board.getContent())
//                        .boardImageUrl(board.getBoardImages()==null? null : board.getBoardImages().get(0).getStoredImagePath())
                        .boardImageUrl(board.getBoardImages()
                                .stream()
                                .findFirst()
                                .map(BoardImage::getStoredImagePath)
                                .orElse(null))
                        .likeNum(board.getBoardLikes().size())
                        .commentNum(board.getBoardComments().size())
                        .build());

                // boardImage 여러 개일 경우 ResponseBoardPageDto 에서 imageUrl 타입을 List로 변경 후
//                .boardImageUrl(board.getBoardImages().stream().map(boardImage -> boardImage.getStoredImagePath()).collect(Collectors.toList()))
        return boards;
    }

    public Page<ResponseBoardPageDto> findBoardsByKeyword(int page, int size, String keyword) {
        Page<ResponseBoardPageDto> boards = boardRepository.findByKeyword(keyword, PageRequest.of(page, size, Sort.by("createdAt").descending()))
                .map(board -> ResponseBoardPageDto.builder()
                        .boardId(board.getBoardId())
                        .title(board.getTitle())
                        .content(board.getContent())
                        .boardImageUrl(board.getBoardImages()
                                .stream()
                                .findFirst()
                                .map(BoardImage::getStoredImagePath)
                                .orElse(null))
                        .likeNum(board.getBoardLikes().size())
                        .commentNum(board.getBoardComments().size())
                        .build());


        // boardImage 여러 개일 경우 ResponseBoardPageDto 에서 imageUrl 타입을 List로 변경 후
//                .boardImageUrl(board.getBoardImages().stream().map(boardImage -> boardImage.getStoredImagePath()).collect(Collectors.toList()))
        return boards;
    }

    public void modifyBoard(Long boardId, RequestBoardDto.Patch requestBoardDto, MultipartFile image) {
        Account findAccount = authUserUtils.getAuthUser();
        Board findBoard = findVerifiedBoard(boardId);

        // 로그인한 사용자의 accountId와 찾아온 board의 accountId를 비교
        if (!Objects.equals(findBoard.getAccount().getAccountId(), findAccount.getAccountId())) {
            throw new BusinessLogicException(ExceptionCode.ACCOUNT_UNAUTHORIZED);
        }

        // image가 있을 경우 S3에 저장된 image Object 삭제 + Board_Image(DB) 저장
        if (image != null) {
            BoardImage boardImage = findBoard.getBoardImages()
                    .stream()
                    .findFirst()
                    .orElse(null);
            if (boardImage != null) {
                boardImageService.deleteBoardImage(boardId);
                boardImageService.saveBoardImage(image, findBoard);
            }
            else {
                boardImageService.saveBoardImage(image, findBoard);
            }
        }
        // image가 없을 경우 S3에 저장된 image Object 삭제 + Board_Image(DB) 삭제
        else {
            boardImageService.deleteBoardImage(boardId);
        }

        // title, content 더티 체킹
        findBoard.update(requestBoardDto);

        // 해시 태그
        // 입력된 해시 태그 리스트가 있을 경우
        if (requestBoardDto.getHashTags() != null) {
            // 입력된 해시 태그가 같을 경우
            // 기존의 해시태그 리스트를 삭제 하고 새로운 해시 태그 리스트 저장

            List<HashTag> findHashTags = hashTagRepository.findHashtagsByBoardId(boardId);
            hashTagRepository.deleteAll(findHashTags);

            for (String tag : requestBoardDto.getHashTags()) {
                HashTag hashTag = hashTagService.createHashTagIfNotExist(tag);

                Board_HashTag boardHashtag = new Board_HashTag();
                boardHashtag.addBoard(findBoard);
                boardHashtag.addHashTag(hashTag);

                boardHashtagRepository.save(boardHashtag);
            }
        }
        // 입력된 해시 태그 리스트가 없을 경우
        else {
            // 저장된 해시태그 삭제 + board 테이블 업데이트
            List<HashTag> findHashTag = hashTagRepository.findHashtagsByBoardId(boardId);
            hashTagRepository.deleteAll(findHashTag);
        }
    }


    public void removeBoard(Long boardId) {
        Board findBoard = findVerifiedBoard(boardId);

        // delete Board Image in S3
        boardImageService.deleteBoardImage(findBoard.getBoardId());

        List<HashTag> findHashTag = hashTagRepository.findHashtagsByBoardId(boardId);
        hashTagRepository.deleteAll(findHashTag);

        boardRepository.delete(findBoard);
    }


    public Board findVerifiedBoard(Long boardId) {
        return boardRepository.findById(boardId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.BOARD_NOT_FOUND));
    }

    private static ResponseBoardDto getResponseBoardDto(Account findAccount, Board findBoard, BoardImage findBoardImage, List<ResponseHashTagDto> findHashTag, List<ResponseCommentDto> findComment) {
        return ResponseBoardDto.builder()
                .boardId(findBoard.getBoardId())
                .title(findBoard.getTitle())
                .content(findBoard.getContent())
                .boardImageUrl(findBoard.getBoardImages().stream().findFirst().map(BoardImage::getStoredImagePath).orElse(null))
                .isLiked(findBoard.getBoardLikes().stream().anyMatch(boardLike -> boardLike.getAccount().getAccountId() == findAccount.getAccountId()))
                .likeNum(findBoard.getBoardLikes().size())
                .createAt(findBoard.getCreatedAt())
                .modifiedAt(findBoard.getModifiedAt())
                .accountId(findBoard.getAccount().getAccountId())
                .displayName(findBoard.getAccount().getDisplayName())
                .profileImageUrl(findBoard.getAccount().getProfileImageUrl())
                .grade(findBoard.getAccount().getAccountGrade().getStepDescription())
                .hashTags(findHashTag)
                .comments(findComment)
                .build();
    }
}

