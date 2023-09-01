package coco.data.repository;

import coco.data.entity.FacilityReview;
import coco.data.entity.User;
import coco.data.entity.UserFavoriteFacility;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface FacilityReviewRepository extends JpaRepository<FacilityReview,Integer> {
    @SuppressWarnings("all")
    FacilityReview save(FacilityReview facilityReview);
    @Transactional
    void deleteById(int id);
    FacilityReview findById(int replyId);

    List<FacilityReview> findByUserUserNumber(int userNumber);
}