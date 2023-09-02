package coco.controller;

import coco.data.dto.FacilityDetailReviewDto;
import coco.data.dto.LikedResponseDto;
import coco.service.FacilityDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
public class FacilityDetailController {

    @Autowired
    private FacilityDetailService facilityDetailService;

    @GetMapping("/user/facilities/{id}")
    @ResponseBody
    public ResponseEntity<FacilityDetailReviewDto> getFacility(@PathVariable int id){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        FacilityDetailReviewDto facilityDetailResponseDto = facilityDetailService.getFacilityDetailAndlike(id, authentication);
        return ResponseEntity.ok(facilityDetailResponseDto);
    }

    @PutMapping("/user/facilities/{facility_id}/like")
    public ResponseEntity<LikedResponseDto> likeFacility(@PathVariable int facility_id){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.getPrincipal() != "anonymousUser") {
            return ResponseEntity.ok(facilityDetailService.likeFacility(facility_id, authentication));
        }
        return ResponseEntity.notFound().build();
    }
}
