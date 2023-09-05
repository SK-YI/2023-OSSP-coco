package coco.data.dto;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class FacilityReviewRequestDto {

    String title;
    String content;
    float star;
}