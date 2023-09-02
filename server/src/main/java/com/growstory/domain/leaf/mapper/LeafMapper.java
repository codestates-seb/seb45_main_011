package com.growstory.domain.leaf.mapper;

import com.growstory.domain.leaf.dto.LeafDto;
import com.growstory.domain.leaf.entity.Leaf;
import org.mapstruct.Mapper;

import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface LeafMapper {
    default LeafDto.LeafResponseForGardenInfo toLeafResponseForGarden(Leaf leaf) {
        return LeafDto.LeafResponseForGardenInfo
                .builder()
                .id(leaf.getLeafId())
                .name(leaf.getLeafName())
                .imageUrl(leaf.getLeafImageUrl())
                .build();
    }

}
