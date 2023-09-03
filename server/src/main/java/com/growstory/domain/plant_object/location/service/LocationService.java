package com.growstory.domain.plant_object.location.service;

import com.growstory.domain.account.service.AccountService;
import com.growstory.domain.plant_object.location.dto.LocationDto;
import com.growstory.domain.plant_object.location.entity.Location;
import com.growstory.domain.plant_object.location.repository.LocationRepository;
import com.growstory.global.exception.BusinessLogicException;
import com.growstory.global.exception.ExceptionCode;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Transactional
@Service
public class LocationService {
    private final LocationRepository locationRepository;
    private final AccountService accountService;

    public LocationService(LocationRepository locationRepository, AccountService accountService) {
        this.locationRepository = locationRepository;
        this.accountService = accountService;
    }


    //기존 DB와 위치 변경 여부를 체크하여 바뀌었으면 location 정보 업데이트
    public Location updateLocation(LocationDto.Patch locationDto) {
        Location findLocation = findVerifiedLocation(locationDto.getLocationId());

        boolean isChanged =
                    findLocation.getX() == locationDto.getX() &&
                    findLocation.getY() == locationDto.getY() &&
                    findLocation.isInstalled() == locationDto.isInstalled();

        if(isChanged) {
            findLocation.update(locationDto.getX(), locationDto.getY(), locationDto.isInstalled());
        }
        return findLocation;
    }

    // locationId로 DB에 존재하는 Location 찾기
    public Location findVerifiedLocation(long locationId) {
        return locationRepository.findById(locationId).orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.LOCATION_NOT_FOUND));

    }
}
