package coco.data.dto;

import coco.data.entity.Facility;
import coco.data.entity.UserFavoriteFacility;
import coco.data.repository.FacilityRepository;
import coco.data.type.facilityType;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Optional;

@Getter
@Setter
@NoArgsConstructor
public class FacilityResponseDto {
        private int facilityId;
        private facilityType type; // Enum 타입 사용
        private int liked;
        private String name;

        private String address;

        private String latitude;

        private String longitude;

        private boolean userFavoriteFacility;

        public FacilityResponseDto(Facility facility) {
                facilityId = facility.getFacilityId();
                type = facility.getType();
                liked = facility.getLiked();
                name = facility.getName();
                address = facility.getAddress();
                latitude = facility.getLatitude();
                longitude = facility.getLongitude();
                userFavoriteFacility = false;
        }

        public FacilityResponseDto(Facility facility, Optional<UserFavoriteFacility> userFavoritedFacility) {
                facilityId = facility.getFacilityId();
                type = facility.getType();
                liked = facility.getLiked();
                name = facility.getName();
                address = facility.getAddress();
                latitude = facility.getLatitude();
                longitude = facility.getLongitude();
                userFavoriteFacility = userFavoritedFacility.isPresent();
        }



        // 생성자, getter, setter 메서드
}