package com.growstory.domain.plant_object.dto;

import com.growstory.domain.leaf.dto.LeafDto;
import com.growstory.domain.plant_object.location.dto.LocationDto;
import com.growstory.domain.point.dto.PointDto;
import com.growstory.domain.product.dto.ProductDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.List;

@Getter
public class PlantObjDto {



    @Getter
    @Builder
    // 오브젝트 구입 시 입력 Dto
    public static class Post {
        @NotBlank
        private String nickName;
        @NotBlank
        private LocationDto.Post locationDto;
        @NotBlank
        private Long leafId;
    }

    //오브젝트 위치 변경 Dto
    @Getter
    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
    public static class PatchLocation {
       private Long plantObjId;
       @NotBlank
       private LocationDto.Patch locationDto;
    }


    @Getter
    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
    public static class Response {
        private long plantObjId;
        private String productName;
        private LocationDto.Response location;
        private LeafDto.ResponseForGardenInfo leafDto;
    }

    @Getter
    @Builder
    public static class GardenInfoResponse {
        private List<ProductDto.Response> products;
        private PointDto.Response point;
        private List<PlantObjDto.Response> plantObjs;

    }
}
