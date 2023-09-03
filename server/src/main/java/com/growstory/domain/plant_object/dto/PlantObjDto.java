package com.growstory.domain.plant_object.dto;

import com.growstory.domain.leaf.dto.LeafDto;
import com.growstory.domain.plant_object.location.dto.LocationDto;
import com.growstory.domain.point.entity.Point;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
public class PlantObjDto {



    @Getter
    @Builder
    // 오브젝트 구입 시 입력 Dto
    public static class Post {
        private String nickName;
        private LocationDto.Post locationDto;
        private Long leafId;
    }

    //오브젝트 위치 변경 Dto
    @Getter
    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
    public static class PatchLocation {
       private Long plantObjId;
       private LocationDto.Patch locationDto;
    }


    @Getter
    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
    public static class Response {
        private long plantObjId;
        private String nickName;
        private LocationDto.Response locationResponse;
        private LeafDto.ResponseForGardenInfo leafResponse;
    }

    @Getter
    @Builder
    public static class GardenInfoResponse {
        private Point point;
        private List<PlantObjDto.Response> objResponseList;

    }
}
