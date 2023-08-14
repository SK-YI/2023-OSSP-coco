package Data.Entity;
import Data.Type.facilityType;
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
    @Column(name = "facility_id")
    private int id;

    @Column(nullable = false)
    private String name;

    @Enumerated(EnumType.STRING)
    private facilityType Type;

    @Column(nullable = false)
    @ColumnDefault("0")
    private int liked;

    @OneToMany(mappedBy = "facility")
    private List<FacilityReview> facilityReviewList = new ArrayList<FacilityReview>();

}