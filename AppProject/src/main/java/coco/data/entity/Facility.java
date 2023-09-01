package coco.data.entity;
import coco.data.type.facilityType;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;
import java.util.ArrayList;
import java.util.List;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
public class Facility {
    @Id
    //아래를 추가?
    //@GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "facility_id")
    private int facilityId;

    @Column(nullable = false)
    private String name;

    @Enumerated(EnumType.STRING)
    private facilityType type;

    @Column(nullable = false)
    @ColumnDefault("0")
    private int liked;

    @Column(nullable = false)
    private String address;

    @Column(nullable = false)
    private String longitude;

    @Column(nullable = false)
    private String latitude;

    @Column(nullable = false)
    private int code;

    @OneToMany(mappedBy = "facility")
    private List<FacilityReview> facilityReviewList = new ArrayList<FacilityReview>();

}