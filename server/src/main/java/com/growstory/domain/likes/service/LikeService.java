package com.growstory.domain.likes.service;

import com.growstory.domain.account.entity.Account;
import com.growstory.domain.account.repository.AccountRepository;
import com.growstory.domain.board.entity.Board;
import com.growstory.domain.board.repository.BoardRepository;
import com.growstory.domain.likes.entity.AccountLike;
import com.growstory.domain.likes.entity.BoardLike;
import com.growstory.global.auth.utils.AuthUserUtils;
import com.growstory.global.exception.BusinessLogicException;
import com.growstory.global.exception.ExceptionCode;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Transactional
@Service
@RequiredArgsConstructor
public class LikeService {
    private final BoardRepository boardRepository;
//    private final CommentRepo
    private final AccountRepository accountRepository;
    private final AuthUserUtils authUserUtils;

    public void pressBoardLike(Long boardId) {
        Account findAccount = authUserUtils.getAuthUser(); // 좋아요 누른 사용자
        Board findBoard = boardRepository.findById(boardId).orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.BOARD_NOT_FOUND));

        Optional<BoardLike> optionalBoardLike = findBoard.getBoardLikes().stream()
                .filter(boardLike -> boardLike.getAccount().getAccountId() == findAccount.getAccountId())
                .findAny();

        optionalBoardLike.ifPresentOrElse(boardLike -> {
            findBoard.getBoardLikes().remove(boardLike);
        }, () -> {
            findBoard.addBoardLike(BoardLike.builder()
                    .account(findAccount)
                    .board(findBoard)
                    .build());
        });
    }

//    public void pressCommentLike(Long commentId) {
//        Account findAccount = authUserUtils.getAuthUser(); // 좋아요 누른 사용자
//        Account ownerAccount = accountRepository.findById(ownerAccountId).orElseThrow(() ->
//                new BusinessLogicException(ExceptionCode.ACCOUNT_NOT_FOUND));
//
//        Optional<AccountLike> optionalAccountLike = ownerAccount.getReceivingAccountLikes().stream()
//                .filter(accountLike -> accountLike.getGivingAccount().getAccountId() == findAccount.getAccountId())
//                .findAny();
//
//        optionalAccountLike.ifPresentOrElse(accountLike -> {
//            findAccount.getGivingAccountLikes().remove(accountLike);
//            ownerAccount.getReceivingAccountLikes().remove(accountLike);
//        }, () -> {
//            AccountLike accountLike = AccountLike.builder()
//                    .givingAccount(findAccount)
//                    .receivingAccount(ownerAccount)
//                    .build();
//            findAccount.addGivingAccountLike(accountLike);
//            ownerAccount.addReceivingAccountLike(accountLike);
//        });
//    }

    public void pressAccountLike(Long ownerAccountId) {
        Account findAccount = authUserUtils.getAuthUser(); // 좋아요 누른 사용자
        Account ownerAccount = accountRepository.findById(ownerAccountId).orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.ACCOUNT_NOT_FOUND));

        Optional<AccountLike> optionalAccountLike = ownerAccount.getReceivingAccountLikes().stream()
                .filter(accountLike -> accountLike.getGivingAccount().getAccountId() == findAccount.getAccountId())
                .findAny();

        optionalAccountLike.ifPresentOrElse(accountLike -> {
            findAccount.getGivingAccountLikes().remove(accountLike);
            ownerAccount.getReceivingAccountLikes().remove(accountLike);
        }, () -> {
            AccountLike accountLike = AccountLike.builder()
                    .givingAccount(findAccount)
                    .receivingAccount(ownerAccount)
                    .build();
            findAccount.addGivingAccountLike(accountLike);
            ownerAccount.addReceivingAccountLike(accountLike);
        });
    }
}
