package com.growstory.domain.comment.service;

import com.growstory.domain.comment.entity.Comment;
import com.growstory.domain.comment.repository.CommentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CommentService {

    private final CommentRepository commentRepository;

    public List<Comment> getComments(Long boardId) {
        return commentRepository.findCommentsByBoard_BoardId(boardId)
                .orElseThrow(() -> new EntityNotFoundException("Not found comment"));
    }
}
