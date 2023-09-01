package com.growstory.domain.plant_object.mapper;

import com.growstory.domain.leaf.dto.LeafDto;
import com.growstory.domain.leaf.entity.Leaf;
import com.growstory.domain.leaf.mapper.LeafMapper;
import com.growstory.domain.plant_object.dto.PlantObjDto;
import com.growstory.domain.plant_object.entity.PlantObj;
import com.growstory.domain.plant_object.location.entity.Location;

import java.util.List;
import java.util.stream.Collectors;

public class PlantObjMapper {

    private final LeafMapper leafMapper;

    public PlantObjMapper(LeafMapper leafMapper) {
        this.leafMapper = leafMapper;
    }

    public PlantObjDto.Response toPlantObjResponse(PlantObj plantObj) {
        if(plantObj == null) return null;

        long plantObjId = plantObj.getPlantObjectId();
        String nickName = plantObj.getNickName();
        Location location = plantObj.getLocation();
        LeafDto.LeafResponseForGardenInfo leafResponse = leafMapper.toLeafResponseForGarden(plantObj.getLeaf());
        boolean isInstalled = location != null;

        return PlantObjDto.Response.builder()
                .plantObjId(plantObjId)
                .nickName(nickName)
                .location(location)
                .leafResponse(leafResponse)
                .isInstalled(isInstalled)
                .build();
    }

    public List<PlantObjDto.Response> toPlantObjResponseList(List<PlantObj> plantObjList) {
        return plantObjList.stream()
                .map(this::toPlantObjResponse)
                .collect(Collectors.toList());
    }
}
