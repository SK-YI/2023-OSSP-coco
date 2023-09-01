package coco.controller;

import coco.data.dto.FacilityReviewDto;
import coco.data.dto.FacilityReviewRequestDto;
import coco.data.entity.FacilityReview;
import coco.service.FacilityReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin
@RestController
@RequestMapping("/user/{facility_id}")
public class FacilityReviewController {
    @Autowired
    private FacilityReviewService facilityReviewService;
    @PostMapping("/review")
    public ResponseEntity<FacilityReviewDto> createReply(@RequestBody FacilityReviewRequestDto facilityReviewRequestDto, @PathVariable int facility_id){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.getPrincipal() != "anonymousUser") {
            return ResponseEntity.ok(facilityReviewService.createReview(facilityReviewRequestDto,facility_id,authentication));
        }
        return ResponseEntity.ok(null);
    }
    @DeleteMapping("/review/{review_id}")
    public ResponseEntity<String> deleteReview(@PathVariable int review_id, @PathVariable int facility_id){
        System.out.println("리뷰 아이디 : " + review_id);
        System.out.println("시설 아이디 : " + facility_id);
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.getPrincipal() != "anonymousUser") {
            return ResponseEntity.ok(facilityReviewService.deleteReply(review_id,facility_id,authentication));
        }
        return ResponseEntity.ok("fail");
    }
    @PutMapping("/review/{review_id}")
    public ResponseEntity<FacilityReviewDto> editReview(@PathVariable int review_id,@RequestBody FacilityReviewDto facilityReviewDto){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if(authentication != null && authentication.getPrincipal() != "anonymousUser"){
            return ResponseEntity.ok(facilityReviewService.editReply(review_id,facilityReviewDto));
        }
        return ResponseEntity.notFound().build();
    }
}