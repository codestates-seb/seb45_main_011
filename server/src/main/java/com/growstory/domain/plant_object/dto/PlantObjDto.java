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
       @NotBlank
       private Long plantObjId;
       @NotBlank
       private LocationDto.Patch locationDto;
    }


    @Getter
    @AllArgsConstructor
    @Builder
    public static class Response {
        private long productId;
        private long plantObjId;
        private String productName;
        private String korName;
        private int price;
        private LocationDto.Response location;
        private LeafDto.ResponseForGardenInfo leafDto;
        private ProductDto.ImageUrlTable imageUrlTable;
    }

    @Getter
    @Builder
    public static class TradeResponse {
        private PlantObjDto.Response plantObj;
        private PointDto.Response point;
    }

    @Getter
    @Builder
    public static class GardenInfoResponse {
        private String displayName;
        private PointDto.Response point;
        private List<PlantObjDto.Response> plantObjs;
        private List<ProductDto.Response> products;

    }
}
