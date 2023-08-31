package coco.controller;


import coco.data.dto.FavoriteFacilityResponseDto;
import coco.data.entity.Facility;
import coco.data.entity.User;
import coco.data.entity.UserFavoriteFacility;
import coco.data.repository.UserFavoriteFacilityRepository;
import coco.data.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin
@RestController
public class FavoritePageController {

    private final UserRepository userRepository;

    private final UserFavoriteFacilityRepository userFavoriteFacilityRepository;

    @Autowired
    public FavoritePageController(UserRepository userRepository, UserFavoriteFacilityRepository userFavoriteFacilityRepository) {
        this.userRepository = userRepository;
        this.userFavoriteFacilityRepository = userFavoriteFacilityRepository;
    }

    @GetMapping("/user/favoriteFacility")
    public ResponseEntity<FavoriteFacilityResponseDto> geUserFavoriteFacilitiesByUsername() {
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
}