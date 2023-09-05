package coco.data.dto;

import coco.data.entity.Facility;
import coco.data.entity.FacilityReview;
import coco.data.entity.UserFavoriteFacility;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Getter
@Setter
@NoArgsConstructor
public class FacilityDetailReviewDto {
    private int facilityId;
    private String type; // Enum 타입 사용
    private int liked;
    private String name;

    private String address;

    private float latitude;

    private float longitude;

    private String equipment;

    private boolean userFavoriteFacility;

    private List<FacilityReviewDto> facilityReviewList;



    public FacilityDetailReviewDto(Facility facility, Optional<UserFavoriteFacility> userLike) {
        facilityId = facility.getFacilityId();
        type = facility.getType();
        liked = facility.getLiked();
        name = facility.getName();
        address = facility.getAddress();
        equipment = facility.getEquipment();
        latitude =facility.getLatitude();
        longitude = facility.getLongitude();

        facilityReviewList=new ArrayList<>();
        for (FacilityReview facilityReview : facility.getFacilityReviewList()){
            facilityReviewList.add(new FacilityReviewDto(facilityReview));
        }
        userFavoriteFacility=userLike.isPresent();
        System.out.println(userFavoriteFacility);
    }
    // 생성자, getter, setter 메서드
}
