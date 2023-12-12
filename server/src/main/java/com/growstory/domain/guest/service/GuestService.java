package com.growstory.domain.guest.service;


import com.growstory.domain.account.constants.AccountGrade;
import com.growstory.domain.account.entity.Account;
import com.growstory.domain.images.entity.JournalImage;
import com.growstory.domain.images.repository.JournalImageRepository;
import com.growstory.domain.journal.entity.Journal;
import com.growstory.domain.journal.mapper.JournalMapper;
import com.growstory.domain.journal.repository.JournalRepository;
import com.growstory.domain.leaf.entity.Leaf;
import com.growstory.domain.leaf.repository.LeafRepository;
import com.growstory.domain.plant_object.dto.PlantObjDto;
import com.growstory.domain.plant_object.entity.PlantObj;
import com.growstory.domain.plant_object.location.dto.LocationDto;
import com.growstory.domain.plant_object.location.entity.Location;
import com.growstory.domain.plant_object.location.repository.LocationRepository;
import com.growstory.domain.plant_object.location.service.LocationService;
import com.growstory.domain.plant_object.mapper.PlantObjMapper;
import com.growstory.domain.plant_object.repository.PlantObjRepository;
import com.growstory.domain.plant_object.service.PlantObjService;
import com.growstory.domain.point.entity.Point;
import com.growstory.domain.product.entity.Product;
import com.growstory.domain.product.service.ProductService;
import com.growstory.global.exception.BusinessLogicException;
import com.growstory.global.exception.ExceptionCode;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.io.File;
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class GuestService {

    // 식물 카드
    private final LeafRepository leafRepository;

    // 일지
    private final JournalRepository journalRepository;
    private final JournalMapper journalMapper;
    private final JournalImageRepository journalImageRepository;

    // 정원
    private final ProductService productService;
    private final PlantObjMapper plantObjMapper;
    private final PlantObjRepository plantObjRepository;

    // 정원 배치
    private final LocationRepository locationRepository;


    public Leaf createGuestLeaf(Account account, String leafName, String content, String imageUrl) {
        Leaf leaf = Leaf.builder()
                .leafName(leafName)
                .leafImageUrl(imageUrl)
                .content(content)
                .account(account)
                .journals(new ArrayList<>())
                .build();

        Leaf saveLeaf = leafRepository.save(leaf);

        account.addLeaf(saveLeaf);
        account.updateGrade(updateAccountGrade(account));
//        account.updateGrade(updateAccountGrade(account));

        return saveLeaf;
    }

    private AccountGrade updateAccountGrade(Account findAccount) {
        int leavesNum = findAccount.getLeaves().size();
        if (leavesNum < 50) {
            return AccountGrade.GRADE_BRONZE;
        } else if (leavesNum < 100) {
            return AccountGrade.GRADE_SILVER;
        } else {
            return AccountGrade.GRADE_GOLD;
        }
    }


    public void createGuestJournal(Leaf leaf, String title, String contents, File imageUrl) {
        Journal journal = createGuestJournalWithNoImg(leaf, title, contents);
        //image가 null이거나 비어있을 경우 ResponseDto로 변환하여 반환
        if(imageUrl==null) {
            journalMapper.toResponseFrom(journal);
            return;
        }
        //image가 null이 아닐 경우 이미지 업로드 및 DB 저장
        JournalImage savedJournalImage = createJournalImage(imageUrl, journal);
        //imageUrl 정보 Journal에 업데이트
        journal.updateImg(savedJournalImage);

        leaf.getJournals().add(journal);
        journal.updateLeaf(leaf);

        journalMapper.toResponseFrom(journalRepository.save(journal));
    }


    private Journal createGuestJournalWithNoImg(Leaf findLeaf, String title, String contents) {
        return journalRepository.save(Journal.builder()
                .title(title)
                .content(contents)
                .leaf(findLeaf)
                .journalImage(null)
                .build());
    }


    // 테이블 인스턴스 생성 및 S3 파일 업로드
    private JournalImage createJournalImage(File imageUrl, Journal journal) {
        if(imageUrl == null || journal == null)
            return null;
        JournalImage journalImage =
                JournalImage.builder()
                        .imageUrl("imageUrl.get")
                        .originName("test1")
                        .journal(journal)
                        .build();
        return journalImageRepository.save(journalImage);
    }

    // POST : 유저 포인트로 오브젝트 구입
    public PlantObjDto.TradeResponse buyProduct(Account account, Long productId) {

        // 클라이언트에서 전송된 productId 기반으로 product 정보 조회
        Product findProduct = productService.findVerifiedProduct(productId);

        // 조회한 계정, 포인트, 상품정보를 바탕으로 구입 메서드 실행
        buy(account,findProduct);

        // 구입한 오브젝트 객체 생성
        PlantObj boughtPlantObj = PlantObj.builder()
                .product(findProduct)
                .leaf(null)
                .location(new Location())
                .account(account)
                .build();

        //구입한 오브젝트를 DB에 저장 및 findAccount에 추가
        account.addPlantObj(
                plantObjRepository.save(
                        boughtPlantObj
                )
        );

        Point afterPoint = boughtPlantObj.getAccount().getPoint();

        // 이미 구입한 프로덕트,
        return plantObjMapper.toTradeResponse(boughtPlantObj, afterPoint);
    }

    private void buy(Account account, Product product) {
        Point accountPoint = account.getPoint();
        int price = product.getPrice();
        int userPointScore = account.getPoint().getScore();
        if(price > userPointScore) {
            throw new BusinessLogicException(ExceptionCode.NOT_ENOUGH_POINTS);
        } else { // price <= userPointScore
            int updatedScore = accountPoint.getScore()-price;
            accountPoint.updateScore(updatedScore);
        }
    }


    // POST : 오브젝트 배치
    public void saveLocation(PlantObjDto.Response plantObjA, PlantObjDto.Response plantObjB) {
        List<PlantObjDto.PatchLocation> patchLocationList = new ArrayList<>();
        patchLocationList.add(PlantObjDto.PatchLocation.builder()
                        .plantObjId(plantObjA.getPlantObjId())
                        .locationDto(LocationDto.Patch.builder()
                                .locationId(plantObjA.getLocation().getLocationId())
                                .x(6)
                                .y(5)
                                .isInstalled(true)
                                .build())
                .build());
        patchLocationList.add(PlantObjDto.PatchLocation.builder()
                        .plantObjId(plantObjB.getPlantObjId())
                        .locationDto(LocationDto.Patch.builder()
                                .locationId(plantObjB.getLocation().getLocationId())
                                .x(3)
                                .y(3)
                                .isInstalled(true)
                                .build())
                .build());

        patchLocationList.stream()
                .forEach(patchLocationDto -> {
                    LocationDto.Patch locationPatchDto = patchLocationDto.getLocationDto();
                    //프로덕트 id와 로케이션 id가 일치하지 않으면 예외 발생
//                    if(patchLocationDto.getPlantObjId()!=locationPatchDto.getLocationId()) {
//                        throw new BusinessLogicException(ExceptionCode.LOCATION_NOT_ALLOW);
//                    }
                    if(locationPatchDto.getX()<0 || locationPatchDto.getX()>11 ||
                            locationPatchDto.getY()<0 || locationPatchDto.getY()>7) {
                        throw new BusinessLogicException(ExceptionCode.INVALID_LOCATION);
                    }
                    // locationPatchDto와 기존 DB의 Location 정보가 일치하는지를 비교하여 다르다면 그 변화를 저장
                    updateLocation(locationPatchDto);
                });
    }

    private Location updateLocation(LocationDto.Patch locationDto) {
        Location findLocation = locationRepository.findById(locationDto.getLocationId()).orElseThrow(()-> new BusinessLogicException(ExceptionCode.LOCATION_NOT_FOUND));

        boolean isChangged =
                findLocation.getX() != locationDto.getX() || findLocation.getY() != locationDto.getY() || findLocation.isInstalled() != locationDto.isInstalled();

        if (isChangged) {
            findLocation.update(locationDto.getX(), locationDto.getY(), locationDto.isInstalled());
        }
        return findLocation;
    }

    // PATCH : 오브젝트와 식물 카드 연결 / 해제 / 교체
    public void updateLeafConnection(Long plantObjId, Long leafId) {
        PlantObj findPlantObj = findVerifiedPlantObj(plantObjId);

        if (leafId != null) {
            // leafId가 null이 아닌경우 NPE에 대한 우려 없이 DB에서 조회
            Leaf findLeaf = leafRepository.findById(leafId)
                    .orElseThrow(()-> new BusinessLogicException(ExceptionCode.LEAF_NOT_FOUND));
            findPlantObj.updateLeaf(findLeaf);
            findLeaf.updatePlantObj(findPlantObj);
        } else {
            Leaf beforeLeaf = findPlantObj.getLeaf();
            if (beforeLeaf != null) {
                beforeLeaf.updatePlantObj(null);
            }
            findPlantObj.updateLeaf(null);
        }
    }

    private PlantObj findVerifiedPlantObj(long plantObjId) {
        return plantObjRepository.findById(plantObjId).orElseThrow(() -> new BusinessLogicException(ExceptionCode.PLANT_OBJ_NOT_FOUND));
    }

}
