package coco.data.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
public class FacilityRequestDto {
    private String name;

    public FacilityRequestDto() {
    }

    public FacilityRequestDto(String name) {
        this.name = name;
    }
}