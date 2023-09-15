package com.growstory.domain.journal.mapper;

import com.growstory.domain.board.entity.Board;
import com.growstory.domain.journal.dto.JournalDto;
import com.growstory.domain.journal.entity.Journal;
import org.mapstruct.Mapper;
import org.springframework.stereotype.Component;

import javax.persistence.ManyToOne;

@Component
public class JournalMapper {
    public JournalDto.Response toResponseFrom(Journal journal) {
        String imgUrl = journal.getJournalImage() == null ?
                null : journal.getJournalImage().getImageUrl();

        return JournalDto.Response
                .builder()
                .journalId(journal.getJournalId())
                .title(journal.getTitle())
                .content(journal.getContent())
                .imageUrl(imgUrl) //nullable
                .build();
    }

//    public Journal toEntityFrom(JournalDto.Post postDto) {
//        return Journal.builder()
//                .title(postDto.getTitle())
//                .content(postDto.getContent())
//                .isConnectedToBoard(postDto.isConnectedToBoard())
//                .build();
//    }

    public Board convertToBoard(Journal journal) {
        return Board.builder()
                .title(journal.getTitle())
                .content(journal.getContent())
                .account(journal.getLeaf().getAccount())
                .build();
    }
}
