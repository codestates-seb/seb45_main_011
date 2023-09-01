package com.growstory.domain.board.service;

import com.growstory.domain.account.entity.Account;
import com.growstory.domain.account.service.AccountService;
import com.growstory.domain.board.dto.RequestBoardDto;
import com.growstory.domain.board.dto.ResponseBoardDto;
import com.growstory.domain.board.entity.Board;
import com.growstory.domain.board.repository.BoardRepository;
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

    public ResponseBoardDto createBoard(Long leafId, RequestBoardDto.Post requestBoardDto, Object principal, MultipartFile image) {
        Leaf leaf = leafRepository.findById(leafId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.LEAF_NOT_FOUND));

        Account account = accountService.findByEmail((String) principal);

        boardImageService.uploadImageToS3(image);



        Board board = Board.builder()
                .title(requestBoardDto.getTitle())
                .content(requestBoardDto.getContent())
//                .boardHashTags(requestBoardDto.getHashTag())
                .account(account)
                .leaf(leaf)
                .isConnection(requestBoardDto.getIsConnection())
                .build();

        boardRepository.save(board);

        return ResponseBoardDto.builder()
                .boardId(board.getBoardId())
                .build();
    }
}

