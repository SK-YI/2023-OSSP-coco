package coco.data.entity;
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

    @Column
    private String type;

    @Column(nullable = false)
    @ColumnDefault("0")
    private int liked;

    @Column
    @ColumnDefault("0")
    private float avgReview;

    @Column(nullable = false)
    private String address;

    @Column(nullable = false)
    private double longitude;

    @Column(nullable = false)
    private double latitude;

    @Column
    private String equipment;

    @Column(nullable = false)
    private int code;



    @OneToMany(mappedBy = "facility")
    private List<FacilityReview> facilityReviewList = new ArrayList<FacilityReview>();

}