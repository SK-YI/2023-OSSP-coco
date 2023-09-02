package coco.controller;

import coco.data.dto.FacilityDetailReviewDto;
import coco.data.dto.FacilityRequestDto;
import coco.data.dto.FacilityResponseDto;
import coco.data.dto.LikedResponseDto;
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

@CrossOrigin
@RestController
public class FacilityController {
    @Autowired
    private FacilityService facilityService;

    private final int defaultPageSize = 50;

    public FacilityController(FacilityService facilityService) {
        this.facilityService = facilityService;
    }

    @GetMapping("/main")
    @ResponseBody
    public ResponseEntity<Page<FacilityResponseDto>> getCocktailList(@PageableDefault Pageable pageable) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Pageable modifiedPageable = PageRequest.of(pageable.getPageNumber(), defaultPageSize);
        Page<FacilityResponseDto> facilities = facilityService. getFacilitiesList(modifiedPageable,authentication);
        return ResponseEntity.ok(facilities);
    }

    @GetMapping("/main/dictionary")
    public ResponseEntity<Page<FacilityResponseDto>> getCocktailListByDic(@PageableDefault Pageable pageable) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Pageable modifiedPageable = PageRequest.of(pageable.getPageNumber(), defaultPageSize);
        Page<FacilityResponseDto> facilities = facilityService.getFacilitiesByDic(modifiedPageable,authentication);
        return ResponseEntity.ok(facilities);
    }

    @GetMapping("/main/liked")
    public ResponseEntity<Page<FacilityResponseDto>> getCocktailListByLiked(@PageableDefault Pageable pageable) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Pageable modifiedPageable = PageRequest.of(pageable.getPageNumber(), defaultPageSize);
        Page<FacilityResponseDto> facilities = facilityService.getFacilitiesByLiked(modifiedPageable,authentication);
        return ResponseEntity.ok(facilities);
    }

    @GetMapping("/user/facilities/search/{name}")
    @ResponseBody
    public ResponseEntity<Page<FacilityResponseDto>> getFacilitiesByName(@PathVariable String name, @PageableDefault Pageable pageable) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Pageable modifiedPageable = PageRequest.of(pageable.getPageNumber(), defaultPageSize);
        Page<FacilityResponseDto> facilities = facilityService.getFacilitiesByName(name, modifiedPageable,authentication);
        return ResponseEntity.ok(facilities);
    }
}


