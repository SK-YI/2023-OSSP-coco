package coco.data.dto;
import coco.data.entity.Facility;
import coco.data.entity.UserFavoriteFacility;
import lombok.*;

import java.io.Serializable;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FavoriteFacilityResponseDto {

    private List<LikedFacilityDto> likedFacilityList;


    public FavoriteFacilityResponseDto(List<Facility> likeFacilities, List<UserFavoriteFacility> userFavoriteFacilities) {
        this.likedFacilityList = mapToLikeCocktailDtoList(likeFacilities, userFavoriteFacilities);
    }

    private List<LikedFacilityDto> mapToLikeCocktailDtoList(List<Facility> likeFacilities, List<UserFavoriteFacility> userFavoriteFacilities) {
        List<LikedFacilityDto> likeFacilityDtoList = new ArrayList<>();

        for (UserFavoriteFacility userLikeFacility : userFavoriteFacilities) {
            Optional<Facility> matchingFacility = likeFacilities.stream()
                    .filter(facility -> facility.getFacilityId() == userLikeFacility.getFacility().getFacilityId())
                    .findFirst();

            matchingFacility.ifPresent(facility -> {
                LikedFacilityDto likedFacilityDto = new LikedFacilityDto(facility);
                likeFacilityDtoList.add(likedFacilityDto);
            });
        }
        return likeFacilityDtoList;
    }

    @Getter
    @Setter
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class LikedFacilityDto implements Serializable {
        private int id;
        private String name;
        public LikedFacilityDto(Facility facility) {
            this.id = facility.getFacilityId();
            this.name = facility.getName();
        }
    }
}
