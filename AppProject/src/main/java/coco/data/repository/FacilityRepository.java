package coco.data.repository;

import coco.data.dto.FacilityRequestDto;
import coco.data.dto.FacilityResponseDto;
import coco.data.entity.Facility;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FacilityRepository extends JpaRepository<Facility, Integer> {
    Page<Facility> getFacilitiesByName(String name, Pageable pageable);
    @SuppressWarnings("all")
    Page<Facility> findAllByNameContaining(String name, Pageable pageable);

}
