package coco.data.dto;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class FacilityReviewRequestDto {
    String content;
    float star;
}