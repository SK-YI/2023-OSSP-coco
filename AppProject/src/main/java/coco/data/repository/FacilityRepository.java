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

    Facility findById(int id);
    @SuppressWarnings("all")
    Page<Facility> findAll(Pageable pageable);
    Page<Facility> findAllByOrderByName(Pageable pageable);

    Page<Facility> findAllByType(String type, Pageable pageable);

    Page<Facility> findAllByType(String type1, String type2, Pageable pageable);

    Page<Facility> findAllByTypeAndEquipmentContaining(String type, String equipment1, String equipment2, Pageable pageable);

    Page<Facility> findAllByTypeAndEquipmentContaining(String type1, String type2, String equipment1, String equipment2, Pageable pageable);

    Page<Facility> findAllByOrderByLikedDesc(Pageable pageable);
    Page<Facility> getFacilitiesByName(String name, Pageable pageable);
    @SuppressWarnings("all")
    Page<Facility> findAllByNameContaining(String name, Pageable pageable);

    List<Facility> findAllByLatitudeBetweenAndLongitudeBetween(float minX, float maxX, float minY, float maxY);

}
