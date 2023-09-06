package coco.service;

import coco.data.dto.FacilityDetailReviewDto;
import coco.data.dto.LikedResponseDto;
import coco.data.entity.Facility;
import coco.data.entity.FacilityReview;
import coco.data.entity.User;
import coco.data.entity.UserFavoriteFacility;
import coco.data.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class FacilityDetailService {

    @Autowired
    private FacilityRepository facilityRepository;
    @Autowired
    private UserFavoriteFacilityRepository userFavoriteFacilityRepository;

    @Autowired
    private FacilityReviewRepository facilityReviewRepository;
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private FacilityDetailRepository facilityDetailRepository;

    public float calculateAverageStarsByFacilityId(int facilityId) {
        List<FacilityReview> reviews = facilityReviewRepository.findFacilityReviewsByFacilityFacilityId(facilityId);

        if (reviews.isEmpty()) {
            return 0.0f; // 리뷰가 없는 경우 기본값 반환
        }
        float sum = 0.0f;
        for (FacilityReview review : reviews) {
            sum += review.getStar(); // 리뷰에서 별점 추출
        }
        return sum / reviews.size(); // 별점의 평균 반환
    }

    @Transactional
    public FacilityDetailReviewDto getFacilityDetailAndlike(int id, Authentication authentication){
        Facility facility = facilityDetailRepository.findByFacilityId(id);
        float avgstar = calculateAverageStarsByFacilityId(id);
        facility.setAvgReview(avgstar);
        return new FacilityDetailReviewDto(facility,userFavoriteFacilityRepository.findByFacilityFacilityIdAndUserUserNumber(id,userRepository.findByUsername(authentication.getName()).getUserNumber()));
    }

    @Transactional
    public LikedResponseDto likeFacility(int facility_id, Authentication authentication){
        User user = userRepository.findByUsername(authentication.getName());
        int userNumber = user.getUserNumber();
        Optional<UserFavoriteFacility> userFavoriteFacility = userFavoriteFacilityRepository.findByFacilityFacilityIdAndUserUserNumber(facility_id,userNumber);
        int liked;

        if(userFavoriteFacility.isPresent()){
            userFavoriteFacilityRepository.deleteByFacilityFacilityIdAndUserUserNumber(facility_id,userFavoriteFacility.get().getUser().getUserNumber());
            Facility facility = facilityDetailRepository.findByFacilityId(facility_id);
            liked = facility.getLiked() - 1;
            facility.setLiked(liked);
        }
        else {
            UserFavoriteFacility userFavoritedFacility1 = new UserFavoriteFacility();
            Facility facility = facilityDetailRepository.findByFacilityId(facility_id);
            userFavoritedFacility1.setFacility(facility);
            userFavoritedFacility1.setUser(user);
            userFavoriteFacilityRepository.save(userFavoritedFacility1);
            liked = facility.getLiked() + 1;
            facility.setLiked(liked);
        }
        return new LikedResponseDto(liked);
    }
}
