package com.growstory.domain.plant_object.location.mapper;

import com.growstory.domain.plant_object.location.dto.LocationDto;
import com.growstory.domain.plant_object.location.entity.Location;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface LocationMapper {
    Location toEntityFrom(LocationDto.Patch patch);
    default LocationDto.Response toLocationResponseDtoFrom(Location location) {
        if(location == null) return null;

        return LocationDto.Response.builder()
                .locationId(location.getLocationId())
                .x(location.getX())
                .y(location.getY())
                .isInstalled(location.isInstalled())
                .build();
    };
}
