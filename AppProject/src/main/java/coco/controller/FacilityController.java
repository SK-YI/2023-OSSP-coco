package coco.controller;

import coco.data.dto.FacilityDetailReviewDto;
import coco.data.dto.FacilityRequestDto;
import coco.data.dto.FacilityResponseDto;
import coco.data.dto.LikedResponseDto;
import coco.service.FacilityService;
import coco.service.RecommendService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.AutoConfigureOrder;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
public class FacilityController {
    @Autowired
    private FacilityService facilityService;

    @Autowired
    private RecommendService recommendService;

    private final int defaultPageSize = 50;

    public FacilityController(FacilityService facilityService) {
        this.facilityService = facilityService;
    }

    @GetMapping("/main")
    @ResponseBody
    public ResponseEntity<Page<FacilityResponseDto>> getFacilityList(@PageableDefault Pageable pageable) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Pageable modifiedPageable = PageRequest.of(pageable.getPageNumber(), defaultPageSize);
        Page<FacilityResponseDto> facilities = recommendService.getRecommendFacilitiesList(modifiedPageable,authentication);
        return ResponseEntity.ok(facilities);
    }

    @GetMapping("/main/dictionary")
    public ResponseEntity<Page<FacilityResponseDto>> getFacilityListByDic(@PageableDefault Pageable pageable) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Pageable modifiedPageable = PageRequest.of(pageable.getPageNumber(), defaultPageSize);
        Page<FacilityResponseDto> facilities = facilityService.getFacilitiesByDic(modifiedPageable,authentication);
        return ResponseEntity.ok(facilities);
    }

    @GetMapping("/main/liked")
    public ResponseEntity<Page<FacilityResponseDto>> getFacilityListByLiked(@PageableDefault Pageable pageable) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Pageable modifiedPageable = PageRequest.of(pageable.getPageNumber(), defaultPageSize);
        Page<FacilityResponseDto> facilities = facilityService.getFacilitiesByLiked(modifiedPageable,authentication);
        return ResponseEntity.ok(facilities);
    }

    @GetMapping("/main/type/{type}")
    public ResponseEntity<Page<FacilityResponseDto>> geFacilityListByType(@PathVariable String type, @PageableDefault Pageable pageable) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Pageable modifiedPageable = PageRequest.of(pageable.getPageNumber(), defaultPageSize);
        Page<FacilityResponseDto> facilities = facilityService.getFacilitiesByType(type, modifiedPageable,authentication);
        return ResponseEntity.ok(facilities);
    }

    @GetMapping("/main/search/{name}")
    @ResponseBody
    public ResponseEntity<Page<FacilityResponseDto>> getFacilitiesByName(@PathVariable String name, @PageableDefault Pageable pageable) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Pageable modifiedPageable = PageRequest.of(pageable.getPageNumber(), defaultPageSize);
        Page<FacilityResponseDto> facilities = facilityService.getFacilitiesByName(name, modifiedPageable,authentication);
        return ResponseEntity.ok(facilities);
    }
}


