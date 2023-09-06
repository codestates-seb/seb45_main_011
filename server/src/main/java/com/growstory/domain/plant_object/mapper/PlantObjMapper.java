package com.growstory.domain.plant_object.mapper;

import com.growstory.domain.leaf.dto.LeafDto;
import com.growstory.domain.leaf.mapper.LeafMapper;
import com.growstory.domain.plant_object.dto.PlantObjDto;
import com.growstory.domain.plant_object.entity.PlantObj;
import com.growstory.domain.plant_object.location.dto.LocationDto;
import com.growstory.domain.plant_object.location.mapper.LocationMapper;
import com.growstory.domain.product.entity.Product;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class PlantObjMapper {

    private final LeafMapper leafMapper;
    private final LocationMapper locationMapper;

    public PlantObjMapper(LeafMapper leafMapper, LocationMapper locationMapper) {
        this.leafMapper = leafMapper;
        this.locationMapper = locationMapper;
    }


    // GET : GardenInfo 정보 조회용 매퍼 (단일 객체)
    public PlantObjDto.Response toPlantObjResponse(PlantObj plantObj) {
        if(plantObj == null) {
            return null;
        }

        long plantObjId = plantObj.getPlantObjId();
        String productName = plantObj.getProduct().getName();
        LocationDto.Response locationResponse = locationMapper.toLocationResponseDtoFrom(plantObj.getLocation());
        LeafDto.ResponseForGardenInfo leafResponse = leafMapper.toLeafResponseForGarden(plantObj.getLeaf());

        return PlantObjDto.Response.builder()
                .productId(plantObj.getProduct().getProductId())
                .plantObjId(plantObjId)
                .productName(productName)
                .location(locationResponse)
                .leafDto(leafResponse)
                .build();
    }

    // GET : GardenInfo 정보 조회용 매퍼 (컬렉션)
    public List<PlantObjDto.Response> toPlantObjResponseList(List<PlantObj> plantObjList) {
        return plantObjList.stream()
                .map(this::toPlantObjResponse)
                .collect(Collectors.toList());
    }

    // Patch : Location 정보 변경용 매퍼
}
