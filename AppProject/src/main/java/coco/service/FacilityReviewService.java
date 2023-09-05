package coco.service;

import coco.data.dto.FacilityReviewDto;
import coco.data.dto.FacilityReviewRequestDto;
import coco.data.entity.FacilityReview;
import coco.data.repository.FacilityRepository;
import coco.data.repository.FacilityReviewRepository;
import coco.data.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.List;

@Service
public class FacilityReviewService {

    @Autowired
    private FacilityReviewRepository facilityReviewRepository;
    @Autowired
    private FacilityRepository facilityRepository;
    @Autowired
    private UserRepository userRepository;

    @Transactional
    public FacilityReviewDto createReview(FacilityReviewRequestDto facilityReviewDto, int facility_id, Authentication authentication){
        String content = facilityReviewDto.getContent();
        String title = facilityReviewDto.getTitle();
        float star = facilityReviewDto.getStar();
        int userId=userRepository.findByUsername(authentication.getName()).getUserNumber();
        FacilityReview facilityReview =new FacilityReview();
        facilityReview.setTitle(title);
        facilityReview.setContent(content);
        facilityReview.setCreatedDate(new Timestamp(System.currentTimeMillis()));
        facilityReview.setUser(userRepository.findById(userId));
        facilityReview.setFacility(facilityRepository.findById(facility_id));
        facilityReview.setStar(star);
        FacilityReview saveReview = facilityReviewRepository.save(facilityReview);
        return new FacilityReviewDto(saveReview,facility_id,userId);
    }

    @Transactional
    public String deleteReply(int reviewId,int facilityId,Authentication authentication){
        FacilityReview facilityReply = facilityReviewRepository.findById(reviewId);
        if(facilityId==facilityReply.getFacility().getFacilityId()&&facilityReply.getUser().getUserNumber()==userRepository.findByUsername(authentication.getName()).getUserNumber()){
            facilityReviewRepository.deleteById(reviewId);
            return "success";
        }
        return "fail";
    }

    @Transactional
    public FacilityReviewDto editReply(int reviewId,FacilityReviewDto facilityReviewDto){
        FacilityReview facilityReview=facilityReviewRepository.findById(reviewId);
        facilityReview.setContent(facilityReviewDto.getContent());
        facilityReview.setTitle(facilityReviewDto.getTitle());
        facilityReview.setStar(facilityReviewDto.getStar());
        facilityReviewRepository.save(facilityReview);
        return new FacilityReviewDto(facilityReview);
    }
}