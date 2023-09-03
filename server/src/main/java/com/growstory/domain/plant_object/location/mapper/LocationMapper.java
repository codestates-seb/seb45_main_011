package com.growstory.domain.plant_object.location.mapper;

import com.growstory.domain.plant_object.location.dto.LocationDto;
import com.growstory.domain.plant_object.location.entity.Location;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface LocationMapper {
    Location toEntityFrom(LocationDto.Patch patch);
    LocationDto.Response toLocationResponseDtoFrom(Location location);
}
