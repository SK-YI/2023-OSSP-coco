package coco.data.repository;

import coco.data.entity.UserFavoriteFacility;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


@Repository
public interface UserFavoriteFacilityRepository extends JpaRepository<UserFavoriteFacility,Integer> {
    void deleteByFacilityFacilityIdAndUserUserNumber(int facilityId,int userId);

    @SuppressWarnings("all")
    UserFavoriteFacility save(UserFavoriteFacility userLikeFacility);
    Optional<UserFavoriteFacility> findByFacilityFacilityIdAndUserUserNumber(int facilityId, int userId);
    List<UserFavoriteFacility> findFacilityFacilityByUserUserNumber(int userId);
}