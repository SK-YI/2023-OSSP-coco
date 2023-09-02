package coco.data.repository;

import coco.data.entity.Facility;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FacilityDetailRepository extends JpaRepository<Facility,Integer> {

    public Facility findByFacilityId(int id);
}