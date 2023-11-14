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

    public HashTag createHashTagIfNotExist(String tag) {
        return hashTagRepository.findByTag(tag)
                .orElseGet(() -> {
                    HashTag newHashTag = new HashTag();
                    newHashTag.setTag(tag);
                    return hashTagRepository.save(newHashTag);
                });
    }


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
