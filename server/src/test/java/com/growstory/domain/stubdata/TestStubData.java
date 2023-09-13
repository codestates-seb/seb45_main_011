package com.growstory.domain.stubdata;

import com.growstory.domain.account.dto.AccountDto;
import com.growstory.domain.account.entity.Account;
import com.growstory.domain.images.entity.JournalImage;
import com.growstory.domain.journal.dto.JournalDto;
import com.growstory.domain.journal.entity.Journal;
import com.growstory.domain.leaf.dto.LeafDto;
import com.growstory.domain.leaf.entity.Leaf;
import com.growstory.domain.plant_object.dto.PlantObjDto;
import com.growstory.domain.plant_object.entity.PlantObj;
import com.growstory.domain.plant_object.location.dto.LocationDto;
import com.growstory.domain.plant_object.location.entity.Location;
import com.growstory.domain.point.entity.Point;
import com.growstory.domain.product.dto.ProductDto;
import com.growstory.domain.product.entity.Product;
import org.springframework.http.HttpMethod;

import java.lang.reflect.Array;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class TestStubData {

    public static class MockAccount {
        private static Map<HttpMethod, Object> stubRequestBody;
        static {
            stubRequestBody = new HashMap<>();
            stubRequestBody.put(HttpMethod.POST, AccountDto.Post.builder()
                    .displayName("관리자")
                    .email("admin@gmail.com")
                    .password("1111")
                    .build());
        }

        public static Object getRequestBody(HttpMethod method) {
            return stubRequestBody.get(method);
        }

        public static Account getStubAccount() {
            return Account.builder()
                    .accountId(1L)
                    .displayName("김닉네임")
                    .profileImageUrl("https://growstory.s3.ap-northeast-2.amazonaws.com/image/profiles/" +
                            "e617d918-a5e4-479b-9e3d-386e5346c184book-1822474__340.jpg")
//                    .point(MockPoint.getStubPointResponseDtoWith500Score())
                    .plantObjs(new ArrayList<>())
                    .build();
        }

        public static AccountDto.Response getSingleResponseBody() {
            return AccountDto.Response
                    .builder()
                    .accountId(1L)
//                    .boardLiked(boardLikes)
//                    .boardWritten(boardWrittens)
                    .displayName("김닉네임")
                    .profileImageUrl("https://growstory.s3.ap-northeast-2.amazonaws.com/image/profiles/" +
                            "e617d918-a5e4-479b-9e3d-386e5346c184book-1822474__340.jpg")
//                    .commentWritten(commentWrittens)
                    .point(Point.builder().pointId(1L).score(500).build())
                    .build();
        }
    }

    public static class MockGarden {
        public static PlantObjDto.GardenInfoResponse getStubGardenInfo() {
            return PlantObjDto.GardenInfoResponse.builder()
                    .displayName(MockAccount.getSingleResponseBody().getDisplayName())
                    .products(MockProduct.getStubProductResponses())
//                    .plantObjs(MockPlantObj.getStubPlantObjsResponseDtos())
//                    .point(MockPoint.getStubPointResponseDto())
                    .build();
        }
    }

    public static class MockProduct {
        public static Product getStubProduct1() {
            return Product.builder()
                    .productId(1L)
                    .name("building_brown")
                    .korName("벽돌 유적")
                    .price(500)
                    .imageUrlSmall("https://growstory.s3.ap-northeast-2.amazonaws.com/image/products/building_brown_sm.svg")
                    .imageUrlLarge("https://growstory.s3.ap-northeast-2.amazonaws.com/image/products/building_brown_lg.svg")
                    .build();
        }

        public static Product getStubProduct2() {
            return Product.builder()
                    .productId(2L)
                    .name("building_yellow")
                    .korName("콜로세움")
                    .price(500)
                    .imageUrlSmall("https://growstory.s3.ap-northeast-2.amazonaws.com/image/products/building_yellow_sm.svg")
                    .imageUrlLarge("https://growstory.s3.ap-northeast-2.amazonaws.com/image/products/building_yellow_lg.svg")
                    .build();
        }

        public static ProductDto.ImageUrlTable getStubImageUrlTable1() {
            return new ProductDto.ImageUrlTable(
                    getStubProduct1().getImageUrlSmall(),
                    getStubProduct1().getImageUrlLarge());
        }

        public static ProductDto.ImageUrlTable getStubImageUrlTable2() {
            return new ProductDto.ImageUrlTable(
                    getStubProduct2().getImageUrlSmall(),
                    getStubProduct2().getImageUrlLarge());
        }

        public static List<ProductDto.Response> getStubProductResponses() {
            List<ProductDto.Response> productResponseDtos = new ArrayList<>();
            productResponseDtos.add(
                    ProductDto.Response.builder()
                            .productId(getStubProduct1().getProductId())
                            .imageUrlTable(getStubImageUrlTable1())
                            .price(getStubProduct1().getPrice())
                            .korName(getStubProduct1().getKorName())
                            .name(getStubProduct1().getName())
                            .build());
            productResponseDtos.add(
                    ProductDto.Response.builder()
                            .productId(getStubProduct2().getProductId())
                            .imageUrlTable(getStubImageUrlTable2())
                            .price(getStubProduct2().getPrice())
                            .korName(getStubProduct2().getKorName())
                            .name(getStubProduct2().getName())
                            .build());
            return productResponseDtos;
        }
    }

    public static class MockPlantObj {

        public static PlantObj getStubPlantObj1() {
            return PlantObj.builder()
                    .plantObjId(1L)
                    .product(MockProduct.getStubProduct1())
//                    .account(MockAccount.getStubAccount())
//                    .leaf(MockLeaf.getStubLeaf())
                    .build();
        }
        
        public static PlantObj getStubPlantObj2() {
            return PlantObj.builder()
                    .plantObjId(2L)
                    .product(MockProduct.getStubProduct2())
                    .build();
        }

        public static List<PlantObj> getStubPlantObjs() {
            ArrayList<PlantObj> plantObjs = new ArrayList<>();
            plantObjs.add(getStubPlantObj1());
            plantObjs.add(getStubPlantObj2());
            return plantObjs;
        }

        public static PlantObjDto.Response getStubPlantObjResponseDto1() {
           return PlantObjDto.Response.builder()
                    .productId(MockAccount.getStubAccount().getAccountId())
                    .plantObjId(MockProduct.getStubProduct1().getProductId())
                    .productName(MockProduct.getStubProduct1().getName())
                    .korName(MockProduct.getStubProduct1().getKorName())
                    .price(MockProduct.getStubProduct1().getPrice())
//                    .location(MockLocation.getStubLocationResponseDto1())
//                    .leafDto(MockLeaf.getStubLeafResponseDto())
                    .imageUrlTable(MockProduct.getStubImageUrlTable1())
                    .build();
        }
        public static PlantObjDto.Response getStubPlantObjResponseDto2() {
            return PlantObjDto.Response.builder()
                    .productId(MockAccount.getStubAccount().getAccountId())
                    .plantObjId(MockProduct.getStubProduct2().getProductId())
                    .productName(MockProduct.getStubProduct2().getName())
                    .korName(MockProduct.getStubProduct2().getKorName())
                    .price(MockProduct.getStubProduct2().getPrice())
//                    .location(MockLocation.getStubLocationResponseDto2())
//                    .leafDto(MockLeaf.getStubLeafResponseDto())
                    .imageUrlTable(MockProduct.getStubImageUrlTable2())
                    .build();
        }

        public static List<PlantObjDto.Response> getStubPlantObjsResponseDtos() {

            return List.of(getStubPlantObjResponseDto1(),
                    getStubPlantObjResponseDto2());
        }
    }

    public static class MockLocation {
        public static LocationDto.Response getStubLocationResponseDto1() {
            return LocationDto.Response.builder()
                    .locationId(1L)
                    .x(0)
                    .y(0)
                    .isInstalled(false)
                    .build();
        }
        public static LocationDto.Response getStubLocationResponseDto2() {
            return LocationDto.Response.builder()
                    .locationId(2L)
                    .x(4)
                    .y(8)
                    .isInstalled(true)
                    .build();
        }
        public static PlantObjDto.PatchLocation getStubPatchLocation1() {
            return PlantObjDto.PatchLocation.builder()
                    .plantObjId(1L)
                    .locationDto(LocationDto.Patch.builder()
                            .locationId(1L).x(5).y(6).isInstalled(true).build())
                    .build();
        }
        public static PlantObjDto.PatchLocation getStubPatchLocation2() {
            return PlantObjDto.PatchLocation.builder()
                    .plantObjId(2L)
                    .locationDto(LocationDto.Patch.builder()
                            .locationId(2L).x(0).y(0).isInstalled(false).build())
                    .build();
        }
        public static List<PlantObjDto.PatchLocation> getStubPatchLocationResponses() {
            List<PlantObjDto.PatchLocation> patchLocations = new ArrayList<>();
            patchLocations.add(getStubPatchLocation1());
            patchLocations.add(getStubPatchLocation2());

            return patchLocations;
        }

        public static Location getStubLocation() {
            PlantObjDto.PatchLocation patchLocation = getStubPatchLocation1();

            return Location.builder()
                    .locationId(patchLocation.getLocationDto().getLocationId())
                    .x(patchLocation.getLocationDto().getX())
                    .y(patchLocation.getLocationDto().getY())
                    .isInstalled(patchLocation.getLocationDto().isInstalled())
                    .build();
        }
    }

    public static class MockLeaf {
        public static Leaf getStubLeaf() {
            return Leaf.builder()
                    .leafId(1L)
                    .leafName("월동자 선인장")
                    .leafImageUrl("https://growstory.s3.ap-northeast-2.amazonaws.com/image/leaves/4b8b4998-bf12-4c1c-a6ec-dfcaa1dcd339book-1822474__340.jpg")
                    .content("나의 월동자 선인장은 귀엽다.")
//                    .account(MockAccount.getStubAccount())
                    .journals(null)
//                    .plantObj(MockPlantObj.getStubPlantObj())
                    .build();
        }
        public static LeafDto.ResponseForGardenInfo getStubLeafResponseDto() {
            return LeafDto.ResponseForGardenInfo.builder()
                    .id(getStubLeaf().getLeafId())
                    .name(getStubLeaf().getLeafName())
                    .imageUrl(getStubLeaf().getLeafImageUrl())
                    .journalCount(MockJournal.getStubJournalResponseDtos().size())
                    .build();
        }
    }

    public static class MockJournal {
        public static Journal getStubJournal1() {
            return Journal.builder()
                    .journalId(1L)
                    .title("230909 일지")
                    .content("오늘은 물을 줬다.")
//                    .journalImage(MockJournalImage.getStubJournalImage1())
                    .leaf(MockLeaf.getStubLeaf())
                    .build();
        }
        public static Journal getStubJournal2() {
            return Journal.builder()
                    .journalId(2L)
                    .title("230910 일지")
                    .content("오늘은 물을 안줬다.")
//                    .journalImage(MockJournalImage.getStubJournalImage2())
                    .leaf(MockLeaf.getStubLeaf())
                    .build();
        }
        public static JournalDto.Response getStubJournalResponse1() {
            LocalDateTime dateTime = LocalDateTime.of(2023, 9, 9, 14, 30, 0);
            return JournalDto.Response.builder()
                    .journalId(getStubJournal1().getJournalId())
                    .title(getStubJournal1().getTitle())
                    .content(getStubJournal1().getContent())
                    .imageUrl(MockJournalImage.getStubJournalImage1().getImageUrl())
                    .createdAt(dateTime)
                    .build();
        }
        public static JournalDto.Response getStubJournalResponse2() {
            LocalDateTime dateTime = LocalDateTime.of(2023, 9, 10, 14, 30, 0);
            return JournalDto.Response.builder()
                    .journalId(getStubJournal2().getJournalId())
                    .title(getStubJournal2().getTitle())
                    .content(getStubJournal2().getContent())
                    .imageUrl(MockJournalImage.getStubJournalImage2().getImageUrl())
                    .createdAt(dateTime)
                    .build();
        }
        public static List<JournalDto.Response> getStubJournalResponseDtos() {
            return List.of(getStubJournalResponse1(), getStubJournalResponse2());
        }
    }

    public static class MockJournalImage {
        public static JournalImage getStubJournalImage1() {
            return JournalImage.builder()
                    .journalImageId(1L)
                    .journal(MockJournal.getStubJournal1())
                    .originName("cdde9ac4bc61logo")
                    .imageUrl("https://growstory.s3.ap-northeast-2.amazonaws.com/image/journal_image/1a4ee5d0-3f55-40c6-aff9-cdde9ac4bc61logo.png")
                    .build();
        }
        public static JournalImage getStubJournalImage2() {
            return JournalImage.builder()
                    .journalImageId(2L)
                    .journal(MockJournal.getStubJournal2())
                    .originName("cdde9ac4bc61logo")
                    .imageUrl("https://growstory.s3.ap-northeast-2.amazonaws.com/image/journal_image/1a4ee5d0-3f55-40c6-aff9-cdde9ac4bc61logo.png")
                    .build();
        }


    }

    public static class MockPoint {
        public static Point getStubPointResponseDtoWith500Score() {
            return Point.builder()
                    .score(500)
                    .build();
        }
        public static Point getStubPointResponseDtoWithNoScore() {
            return Point.builder()
                    .score(0)
                    .build();
        }
    }
}
