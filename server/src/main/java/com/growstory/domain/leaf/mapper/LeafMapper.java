package com.growstory.domain.leaf.mapper;

import com.growstory.domain.leaf.dto.LeafDto;
import com.growstory.domain.leaf.entity.Leaf;
import org.mapstruct.Mapper;

import java.util.Optional;

@Mapper(componentModel = "spring")
public interface LeafMapper {
    default LeafDto.ResponseForGardenInfo toLeafResponseForGarden(Leaf leaf) {
        if(leaf == null) {
            return null;
        }

        int journalCount = (leaf != null) ? (int) leaf.getJournals().stream().count() : 0;
        Long leafId = (leaf != null) ? leaf.getLeafId() : null;
        String leafName = (leaf != null) ? leaf.getLeafName() : null;
        String imageUrl = (leaf != null) ? leaf.getLeafImageUrl() : null;

        return LeafDto.ResponseForGardenInfo
                .builder()
                .id(leafId)
                .name(leafName)
                .imageUrl(imageUrl)
                .journalCount(journalCount)
                .build();
    }

}
