package com.growstory.domain.board.service;

import com.growstory.domain.account.entity.Account;
import com.growstory.domain.account.service.AccountService;
import com.growstory.domain.board.dto.RequestBoardDto;
import com.growstory.domain.board.dto.ResponseBoardDto;
import com.growstory.domain.board.entity.Board;
import com.growstory.domain.board.repository.BoardRepository;
import com.growstory.domain.hashTag.service.HashTagService;
import com.growstory.domain.images.service.BoardImageService;
import com.growstory.domain.leaf.entity.Leaf;
import com.growstory.domain.leaf.repository.LeafRepository;
import com.growstory.global.exception.BusinessLogicException;
import com.growstory.global.exception.ExceptionCode;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@RequiredArgsConstructor
@Service
public class BoardService {
    private final BoardRepository boardRepository;
    private final LeafRepository leafRepository;
    private final AccountService accountService;
    private final BoardImageService boardImageService;
    private final HashTagService hashTagService;

    public ResponseBoardDto createBoard(Long leafId, RequestBoardDto.Post requestBoardDto, Object principal, MultipartFile image) {
        Account findAccount = accountService.findByEmail((String) principal);

        Leaf findLeaf = leafRepository.findById(leafId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.LEAF_NOT_FOUND));


        // S3 Upload && save image in Board_Image
        boardImageService.uploadImageToS3(image);

        hashTagService.createHashTag(requestBoardDto.getHashTag());

        Board board = Board.builder()
                .title(requestBoardDto.getTitle())
                .content(requestBoardDto.getContent())
                .account(findAccount)
                .leaf(findLeaf)
                .isConnection(requestBoardDto.getIsConnection())
                .build();

        boardRepository.save(board);

        return ResponseBoardDto.builder()
                .boardId(board.getBoardId())
                .build();
    }

    public Page<ResponseBoardDto> findBoards(int page, int size) {
        Page<ResponseBoardDto> pageBoards = boardRepository.findAll(PageRequest.of(page, size, Sort.by("createdAt").descending()))
                .map(board -> ResponseBoardDto.builder()
                        .boardId(board.getBoardId())
                        .title(board.getTitle())
                        .imageUrl(board.getAccount().getProfileImageUrl())
                        .displayName(board.getAccount().getDisplayName())
                        .leafName(board.getLeaf().getLeafName())
                        .leafImage(board.getLeaf().getLeafImageUrl())
                        .likeNum(board.getBoardLikes().size())
//                        .createAt()
//                        .modifiedAt()
                        .build());

        return pageBoards;
    }

    public void modifyBoard(Long boardId, RequestBoardDto.Patch requestBoardDto, Object principal, MultipartFile image) {
        Account findBoard = accountService.findByEmail((String) principal);

        Leaf findLeaf = leafRepository.findById(leafId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.LEAF_NOT_FOUND));

        // image가 null일 경우 S3에 저장된 image Object 삭제 + Board_Image(DB) 삭제

        // image가 있을 경우 S3에 저장된 image Object 삭제 + Board_Image(DB) 저장

    }


    public void removeBoard(Long boardId) {
        Board findBoard = findVerifiedBoard(boardId);


        boardRepository.delete(findBoard);
    }


    private Board findVerifiedBoard(Long boardId) {
        return boardRepository.findById(boardId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.BOARD_NOT_FOUND));
    }
}

