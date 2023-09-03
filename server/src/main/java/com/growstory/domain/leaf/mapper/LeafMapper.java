package com.growstory.domain.leaf.mapper;

import com.growstory.domain.leaf.dto.LeafDto;
import com.growstory.domain.leaf.entity.Leaf;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface LeafMapper {
    default LeafDto.ResponseForGardenInfo toLeafResponseForGarden(Leaf leaf) {
        return LeafDto.ResponseForGardenInfo
                .builder()
                .id(leaf.getLeafId())
                .name(leaf.getLeafName())
                .imageUrl(leaf.getLeafImageUrl())
                .build();
    }

}
