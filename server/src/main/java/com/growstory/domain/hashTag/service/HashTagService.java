package com.growstory.domain.hashTag.service;

import com.growstory.domain.board.entity.Board_HashTag;
import com.growstory.domain.board.repository.BoardHashTagRepository;
import com.growstory.domain.hashTag.dto.ResponseHashTagDto;
import com.growstory.domain.hashTag.entity.HashTag;
import com.growstory.domain.hashTag.repository.HashTagRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class HashTagService {

    private final HashTagRepository hashTagRepository;
    private final BoardHashTagRepository boardHashTagRepository;

    // TODO: BoardService에 게시판 추가 기능에 있는 해시태그 추가 부분 메서드로 추출하기
    public void createHashTag(String requestTag) {
        HashTag hashTag = HashTag.builder()
                .tag(requestTag)
                .build();
        hashTagRepository.save(hashTag);
    }

//    public List<HashTag> getHashTags(Long boardId) {
//        return hashTagRepository.findByHashTags_BoardId(boardId)
//                .orElseThrow(() -> new EntityNotFoundException("Not found HashTag"));
//    }

    public List<ResponseHashTagDto> getHashTagList(Long boardId) {


        List<Board_HashTag> boardHashTags = boardHashTagRepository.findAll();

        List<HashTag> hashTags = boardHashTags.stream()
                .filter(boardHashTag -> boardHashTag.getBoard().getBoardId() == boardId)
                // 입력받은 보드의 boardhashtag
//                .map(boardHashTag -> boardHashTag.getHashTag())
                .map(Board_HashTag::getHashTag)
                .collect(Collectors.toList());


//        List<HashTag> hashTags = hashTagRepository.findHashtagsByBoardId(boardId);


        List<ResponseHashTagDto> responseHashTagDto = hashTags.stream()
                .map(hashTag -> ResponseHashTagDto.builder()
                        .hashTagId(hashTag.getHashTagId())
                        .tag(hashTag.getTag())
                        .build())
                .collect(Collectors.toList());

        return responseHashTagDto;
    }
}
