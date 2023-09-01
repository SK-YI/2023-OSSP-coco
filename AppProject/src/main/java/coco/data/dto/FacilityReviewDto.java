package coco.data.dto;
import coco.data.entity.Facility;
import coco.data.entity.FacilityReview;
import coco.data.entity.User;
import coco.data.entity.UserFavoriteFacility;
import lombok.*;

import java.io.Serializable;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Getter
@NoArgsConstructor
public class FacilityReviewDto {
    private int id;
    private String content;
    private Timestamp createdDate;
    private UserDto user;
    private int userId;
    private int facilityId;
    float star;

    private List<FacilityReviewDto> reviewedFacilities;

    @Getter
    @NoArgsConstructor
    static
    class UserDto{
        private int id;
        private String username;
        private String nickname;
        public UserDto(User user){
            id= user.getUserNumber();
            username = user.getUsername();
            nickname=user.getNickname();
        }
    }
    public FacilityReviewDto(FacilityReview facilityReview){
        id=facilityReview.getId();
        content= facilityReview.getContent();
        createdDate=facilityReview.getCreatedDate();
        user= new UserDto(facilityReview.getUser());
        star = facilityReview.getStar();
        facilityId=facilityReview.getFacility().getFacilityId();
        userId=user.getId();
    }
    public FacilityReviewDto(FacilityReview facilityReview, int facilityId1, int userId1){
        id=facilityReview.getId();
        content=facilityReview.getContent();
        createdDate=facilityReview.getCreatedDate();
        userId=userId1;
        star=facilityReview.getStar();
        facilityId=facilityId1;
    }
}