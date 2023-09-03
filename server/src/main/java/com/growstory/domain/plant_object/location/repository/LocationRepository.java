package com.growstory.domain.plant_object.location.repository;

import com.growstory.domain.plant_object.location.entity.Location;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LocationRepository extends JpaRepository<Location, Long> {
}
