package Data.Repository;

import Data.Entity.Facility;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FacilityRepository extends JpaRepository<Facility, Integer> {
    Facility findById(int id);

}
