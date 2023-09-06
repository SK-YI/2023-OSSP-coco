package coco.data.dto;

import coco.data.entity.PostFile;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class PostFileResponseDto {
    private int fileId;  // 파일 id

    public PostFileResponseDto(PostFile entity){
        this.fileId = entity.getId();
    }

}
