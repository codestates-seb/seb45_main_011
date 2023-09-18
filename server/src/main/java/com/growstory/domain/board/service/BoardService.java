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
import com.growstory.domain.comment.service.CommentService;
import com.growstory.domain.hashTag.dto.ResponseHashTagDto;
import com.growstory.domain.hashTag.entity.HashTag;
import com.growstory.domain.hashTag.repository.HashTagRepository;
import com.growstory.domain.hashTag.service.HashTagService;
import com.growstory.domain.images.entity.BoardImage;
import com.growstory.domain.images.service.BoardImageService;
import com.growstory.domain.point.service.PointService;
import com.growstory.domain.rank.board_likes.dto.BoardLikesRankDto;
import com.growstory.domain.rank.board_likes.entity.BoardLikesRank;
import com.growstory.global.auth.utils.AuthUserUtils;
import com.growstory.global.exception.BusinessLogicException;
import com.growstory.global.exception.ExceptionCode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.*;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.concurrent.atomic.AtomicLong;
import java.util.stream.Collectors;

@Slf4j
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
    private final PointService pointService;

    @Value("${my.scheduled.cron}")
    private String cronExpression;


    public Long createBoard(RequestBoardDto.Post requestBoardDto, MultipartFile image) {
        Account findAccount = authUserUtils.getAuthUser();

        pointService.updatePoint(findAccount.getPoint(), "posting");
        Board saveBoard = boardRepository.save(requestBoardDto.toEntity(findAccount));

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
                boardHashtag.addBoard(saveBoard);
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
        List<ResponseHashTagDto> findHashTag = hashTagService.getHashTagList(boardId);
        List<ResponseCommentDto> findComment = commentService.getCommentListByBoardId(boardId);

        return getResponseBoardDto(findAccount, findBoard, findHashTag, findComment);
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

        BoardImage boardImage = findBoard.getBoardImages()
                .stream()
                .findFirst()
                .orElse(null);



        // TODO:
        //  isImageUpdate = true => 기존 이미지를 삭제하고 싶을 때
        //  isImageUpdate = false => 기존 이미지를 유지하고 싶을 때, 이미지 없어야 됨.
        if (requestBoardDto.isImageUpdate() && boardImage != null) {
            boardImageService.deleteBoardImage(boardImage);
            findBoard.getBoardImages().clear();
        }

        if (image != null) {
            boardImageService.saveBoardImage(image, findBoard);
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
        BoardImage boardImage = findBoard.getBoardImages()
                .stream()
                .findFirst()
                .orElse(null);        // delete Board Image in S3

        if (boardImage != null)
            boardImageService.deleteBoardImage(boardImage);

        List<HashTag> findHashTag = hashTagRepository.findHashtagsByBoardId(boardId);
        hashTagRepository.deleteAll(findHashTag);

        boardRepository.delete(findBoard);
    }


    public Board findVerifiedBoard(Long boardId) {
        return boardRepository.findById(boardId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.BOARD_NOT_FOUND));
    }

    private static ResponseBoardDto getResponseBoardDto(Account findAccount, Board findBoard, List<ResponseHashTagDto> findHashTag, List<ResponseCommentDto> findComment) {
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


//    @Scheduled(cron = "${my.scheduled.cron}")
    public List<BoardLikesRankDto.Response> findTop3LikedBoards() {
        log.info("# Scheduled task findTop3LikedBoards started at {}", LocalDateTime.now());
        log.info("# and Cron expression is: {}", cronExpression);
        LocalDateTime sevenDaysAgo = LocalDateTime.now().minusDays(7);
        List<Object[]> topBoardsWithLikes = boardRepository.findTop3LikedBoards(sevenDaysAgo);
        List<BoardLikesRankDto.Response> response = topBoardsWithLikes.stream().map(
                responseRankingDto -> {
                    Board board = (Board) responseRankingDto[0];
                    Long LikeCount = (Long) responseRankingDto[1];
                    return BoardLikesRankDto.Response.builder()
                            .boardId(board.getBoardId())
                            .title(board.getTitle())
                            .displayName(board.getAccount().getDisplayName())
                            .likeNum(Integer.valueOf(String.valueOf(LikeCount)))
                            .build();
                    }).limit(3)
                .collect(Collectors.toList());
        return response;
    }

    // 좋아요 기준 상위 3개의 게시글을 랭킹과 함께 반환 (🆘 추후 리팩토링)
    public List<BoardLikesRank> findTop3LikedBoardRanks() {
        LocalDateTime sevenDaysAgo = LocalDateTime.now().minusDays(7);
        List<Object[]> topBoardsWithLikes = boardRepository.findTop3LikedBoards(sevenDaysAgo);

        // 고유한 '좋아요' 수를 저장하기 위한 Set
        Set<Long> uniqueLikeCounts = new HashSet<>();

        // 조건에 부합하는 boardLikesRank를 담을 리스트 boardLikesRanks
        List<BoardLikesRank> boardLikesRanks = new ArrayList<>();

        topBoardsWithLikes.stream()
                .takeWhile(objects -> {
                    Long likeCount = (Long) objects[1];
                    uniqueLikeCounts.add(likeCount);
                    return uniqueLikeCounts.size() <= 3; // 고유한 '좋아요' 수가 3개 이하일 때까지
                })
                .forEach(objects -> {
                    Board board = (Board) objects[0];
                    Long likeCount = (Long) objects[1];

                    BoardLikesRank boardLikesRank = BoardLikesRank.builder()
                            .account(board.getAccount())
                            .board(board)
                            .likeNum(likeCount)
                            .build();
                    boardLikesRank.updateRank(uniqueLikeCounts.size());
                    boardLikesRanks.add(boardLikesRank);
                });
        return boardLikesRanks;
    }
}

