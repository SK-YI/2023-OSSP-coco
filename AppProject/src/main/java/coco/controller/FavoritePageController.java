package coco.controller;


import coco.data.dto.FacilityReviewDto;
import coco.data.dto.FavoriteFacilityResponseDto;
import coco.data.entity.Facility;
import coco.data.entity.FacilityReview;
import coco.data.entity.User;
import coco.data.entity.UserFavoriteFacility;
import coco.data.repository.FacilityReviewRepository;
import coco.data.repository.UserFavoriteFacilityRepository;
import coco.data.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin
@RestController
public class FavoritePageController {

    private final UserRepository userRepository;

    private final UserFavoriteFacilityRepository userFavoriteFacilityRepository;

    private final FacilityReviewRepository facilityReviewRepository;

    @Autowired
    public FavoritePageController(UserRepository userRepository, UserFavoriteFacilityRepository userFavoriteFacilityRepository, FacilityReviewRepository facilityReviewRepository) {
        this.userRepository = userRepository;
        this.userFavoriteFacilityRepository = userFavoriteFacilityRepository;
        this.facilityReviewRepository = facilityReviewRepository;
    }

    @GetMapping("/user/favoriteFacility")
    public ResponseEntity<FavoriteFacilityResponseDto> getUserFavoriteFacilitiesByUsername() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        User user = userRepository.findByUsername(username);

        int userId = user.getUserNumber();

        List<UserFavoriteFacility> userFavoriteFacility = userFavoriteFacilityRepository.findFacilityFacilityByUserUserNumber(userId);

        List<Facility> likedFacilities = userFavoriteFacility.stream()
                .map(UserFavoriteFacility::getFacility)
                .collect(Collectors.toList());

        FavoriteFacilityResponseDto responseDto = new FavoriteFacilityResponseDto(likedFacilities, userFavoriteFacility);

        return ResponseEntity.ok(responseDto);
    }

    @GetMapping("/user/reviewedFacility")
    public ResponseEntity<List<FacilityReviewDto>> findFacilityReviewByUserUserNumber() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        User user = userRepository.findByUsername(username);
        int userNumber = user.getUserNumber();

        List<FacilityReview> reviews = facilityReviewRepository.findByUserUserNumber(userNumber);
        List<FacilityReviewDto> reviewDtos = reviews.stream()
                .map(FacilityReviewDto::new) // Convert FacilityReview to FacilityReviewDto
                .collect(Collectors.toList());

        return ResponseEntity.ok(reviewDtos);
    }

}