package coco.data.dto;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class LikedResponseDto {
    private int liked;
    public LikedResponseDto(int liked){
        this.liked = liked;
    }
}