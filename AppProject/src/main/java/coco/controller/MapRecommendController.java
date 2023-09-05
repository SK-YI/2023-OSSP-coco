package coco.controller;

import coco.data.dto.FacilityResponseDto;
import coco.data.dto.FacilityReviewDto;
import coco.data.entity.Facility;
import coco.data.entity.FacilityReview;
import coco.data.repository.FacilityRepository;
import coco.service.FacilityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin
@RestController
public class MapRecommendController {

    @Autowired
    private FacilityService facilityService;

    @Autowired
    private FacilityRepository facilityRepository;
    @GetMapping("/user/map/{longitude}/{latitude}")
    @ResponseBody
    public ResponseEntity<List<FacilityResponseDto>> getFacilitiesByPosition(@PathVariable double longitude, @PathVariable double latitude) {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        double minX = longitude - 0.015f;
        double maxX = longitude + 0.015f;

        double minY = latitude - 0.065f;
        double maxY = latitude + 0.065f;


        List<Facility> facilities = facilityRepository.findAllByLatitudeBetweenAndLongitudeBetween(minX, maxX, minY, maxY);

        List<FacilityResponseDto> responseDtos = facilities.stream()
                .map(FacilityResponseDto::new)
                .collect(Collectors.toList());

        return ResponseEntity.ok(responseDtos);
    }
}
