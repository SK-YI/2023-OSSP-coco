package coco.data.idClass;

import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@EqualsAndHashCode
@NoArgsConstructor
public class UserFavoriteFacilityId implements Serializable {
    private int user;
    private int facility;
}
