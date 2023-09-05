package coco.service;

import coco.data.dto.FacilityDetailReviewDto;
import coco.data.dto.LikedResponseDto;
import coco.data.entity.Facility;
import coco.data.entity.UserFavoriteFacility;
import coco.data.repository.FacilityDetailRepository;
import coco.data.repository.FacilityRepository;
import coco.data.repository.UserFavoriteFacilityRepository;
import coco.data.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
public class FacilityDetailService {

    @Autowired
    private FacilityRepository facilityRepository;
    @Autowired
    private UserFavoriteFacilityRepository userFavoriteFacilityRepository;
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private FacilityDetailRepository facilityDetailRepository;

    @Transactional
    public FacilityDetailReviewDto getFacilityDetailAndlike(int id, Authentication authentication){
        Facility facility = facilityDetailRepository.findByFacilityId(id);
        return new FacilityDetailReviewDto(facility,userFavoriteFacilityRepository.findByFacilityFacilityIdAndUserUserNumber(id,userRepository.findByUsername(authentication.getName()).getUserNumber()));
    }

    @Transactional
    public LikedResponseDto likeFacility(int facility_id, Authentication authentication){
        int userId=userRepository.findByUsername(authentication.getName()).getUserNumber();
        Optional<UserFavoriteFacility> userFavoriteFacility = userFavoriteFacilityRepository.findByFacilityFacilityIdAndUserUserNumber(facility_id,userId);
        int liked;

        if(userFavoriteFacility.isPresent()){
            userFavoriteFacilityRepository.deleteByFacilityFacilityIdAndUserUserNumber(facility_id,userFavoriteFacility.get().getUser().getUserNumber());
            Facility facility=facilityDetailRepository.findByFacilityId(facility_id);
            liked = facility.getLiked() - 1;
            facility.setLiked(liked);
        }
        else {
            UserFavoriteFacility userFavoritedFacility1=new UserFavoriteFacility();
            userFavoritedFacility1.setFacility(facilityDetailRepository.findByFacilityId(facility_id));
            userFavoritedFacility1.setUser(userRepository.findByUserNumber(userId));
            UserFavoriteFacility userFavoritedFacility = userFavoriteFacilityRepository.save(userFavoritedFacility1);

            Facility facility=facilityDetailRepository.findByFacilityId(facility_id);
            liked = facility.getLiked() + 1;
            facility.setLiked(liked);
        }
        return new LikedResponseDto(liked);
    }
}
