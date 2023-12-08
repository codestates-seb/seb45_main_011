package com.growstory.domain.comment.service;

import com.growstory.domain.account.entity.Account;
import com.growstory.domain.board.entity.Board;
import com.growstory.domain.board.repository.BoardRepository;
import com.growstory.domain.comment.dto.CommentDto;
import com.growstory.domain.comment.dto.ResponseCommentDto;
import com.growstory.domain.comment.entity.Comment;
import com.growstory.domain.comment.repository.CommentRepository;
import com.growstory.global.auth.utils.AuthUserUtils;
import com.growstory.global.exception.BusinessLogicException;
import com.growstory.global.exception.ExceptionCode;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class CommentService {

    private final CommentRepository commentRepository;
    private final BoardRepository boardRepository;
    private final AuthUserUtils authUserUtils;

    public Long saveComment(Long boardId, CommentDto.Post commentDto) {
        Account account = authUserUtils.getAuthUser();
        Board board = boardRepository.findById(boardId)
                .orElseThrow(()-> new BusinessLogicException(ExceptionCode.BOARD_NOT_FOUND));
        Comment comment = commentRepository.save(commentDto.toEntity(account, board));

        return comment.getCommentId();
    }

    public List<ResponseCommentDto> getCommentListByBoardId(Long boardId) {
        List<Comment> comments = commentRepository.findCommentsByBoard_BoardId(boardId)
                .orElseThrow(()-> new BusinessLogicException(ExceptionCode.COMMENT_NOT_FOUND));

        return getResponseCommentDtoList(comments);
    }

    private static List<ResponseCommentDto> getResponseCommentDtoList(List<Comment> comments) {
        List<ResponseCommentDto> responseCommentDtoList = comments.stream().map(comment -> ResponseCommentDto.builder()
                .commentId(comment.getCommentId())
                .content(comment.getContent())
                .accountId(comment.getAccount().getAccountId())
                .displayName(comment.getAccount().getDisplayName())
                .profileUrl(comment.getAccount().getProfileImageUrl())
                .grade(comment.getAccount().getAccountGrade().getStepDescription())
                .commentLikeNum(comment.getCommentLikes().size())
                .createdAt(comment.getCreatedAt())
                .modifiedAt(comment.getModifiedAt())
                .build())
                .collect(Collectors.toList());
        return responseCommentDtoList;
    }


    public void updateComment(Long commentId, CommentDto.Patch commentDto) {
        findCommentsMatchCommentId(commentId);

        Comment comment = getVerifiedCommentByCommentId(commentId);
        comment.update(commentDto.getContent());

    }

    public void deleteComment(Long commentId) {
        findCommentsMatchCommentId(commentId);
        Comment findComment = getVerifiedCommentByCommentId(commentId);
//        commentRepository.deleteById(commentId);
        commentRepository.delete(findComment);

        // comment 삭제 후 Account, Board 테이블 업데이트
        findComment.getAccount().getComments().remove(findComment);
        findComment.getBoard().getBoardComments().remove(findComment);
    }

    // 로그인한 사용자가 작성한 댓글인 지 검증하는 메서드
    // 토큰 값을 통해 인증된 사용자의 commentId와 입력받은 commentId를 대조하여 검증함.
    private void findCommentsMatchCommentId(Long commentId) {
        Account account = authUserUtils.getAuthUser();

        //commentId와 일치하는 댓글 탐색
        boolean isComment = account.getComments().stream()
                .map(Comment::getCommentId)
                .anyMatch(id -> Objects.equals(id, commentId));

        // 해당 댓글을 찾지 못한 경우 예외 발생
        if (!isComment)
            throw new BusinessLogicException(ExceptionCode.COMMENT_NOT_FOUND);
    }

    private Comment getVerifiedCommentByCommentId(Long commentId) {
        return commentRepository.findById(commentId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.COMMENT_NOT_FOUND));
    }
}
