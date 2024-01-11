package com.growstory.domain.plant_object.mapper;

import com.growstory.domain.leaf.dto.LeafDto;
import com.growstory.domain.leaf.mapper.LeafMapper;
import com.growstory.domain.plant_object.dto.PlantObjDto;
import com.growstory.domain.plant_object.entity.PlantObj;
import com.growstory.domain.plant_object.location.dto.LocationDto;
import com.growstory.domain.plant_object.location.mapper.LocationMapper;
import com.growstory.domain.point.dto.PointDto;
import com.growstory.domain.point.entity.Point;
import com.growstory.domain.product.dto.ProductDto;
import lombok.NoArgsConstructor;
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
        ProductDto.ImageUrlTable imageUrlTable =
                ProductDto.ImageUrlTable.builder()
                        .lg(plantObj.getProduct().getImageUrlLarge())
                        .sm(plantObj.getProduct().getImageUrlSmall())
                        .build();

        return PlantObjDto.Response.builder()
                .productId(plantObj.getProduct().getProductId())
                .plantObjId(plantObjId)
                .productName(productName)
                .korName(plantObj.getProduct().getKorName())
                .imageUrlTable(imageUrlTable)
                .price(plantObj.getProduct().getPrice())
                .location(locationResponse)
                .leafDto(leafResponse)
                .build();
    }

    public PlantObjDto.TradeResponse toTradeResponse(PlantObj boughtPlantObj, Point afterPoint) {
        PlantObjDto.Response plantObj = toPlantObjResponse(boughtPlantObj);
        PointDto.Response point =
                PointDto.Response.builder().score(afterPoint.getScore()).build();

        return PlantObjDto.TradeResponse.builder()
                .plantObj(plantObj)
                .point(point)
                .build();
    }

    // GET : GardenInfo 정보 조회용 매퍼 (컬렉션)
    public List<PlantObjDto.Response> toPlantObjResponseList(List<PlantObj> plantObjList) {
        return plantObjList.stream()
                .map(this::toPlantObjResponse)
                .collect(Collectors.toList());
    }


}
