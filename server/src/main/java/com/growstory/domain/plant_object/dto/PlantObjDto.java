package com.growstory.domain.plant_object.dto;

import com.growstory.domain.leaf.dto.LeafDto;
import com.growstory.domain.leaf.entity.Leaf;
import com.growstory.domain.plant_object.location.entity.Location;
import com.growstory.domain.point.entity.Point;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
public class PlantObjDto {



    // 오브젝트 위치 변경 시 입력 Dto
    public static class Post {
        private long id;
        private String name;
        private Location location;
        private boolean isInstalled;
        private Leaf leaf;

    }

    //오브젝트 위치 변경 Dto
    @Getter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class PostPosition {
       private List<PlantObjDto> plantObjDtos;
    }


    @Getter
    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
    public static class Response {
        private long plantObjId;
        private String nickName;
        private Location location;
        private LeafDto.LeafResponseForGardenInfo leafResponse;
        private boolean isInstalled;
    }

    @Getter
    @Builder
    public static class GardenInfoResponse {
        private Point point;
        private List<PlantObjDto.Response> objResponseList;

    }
}
