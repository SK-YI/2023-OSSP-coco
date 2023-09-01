package coco.data.entity;

import coco.data.type.facilityType;
import jakarta.persistence.*;
import lombok.*;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
public class Equipment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "equipment_id")
    private int equipmentId;

    @Column(nullable = false)
    private String name;

    //사실 manytomnay의 관계 - 중간테이블 만들어서 매칭하는 것이정석.
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "facility_id")
    private Facility facility;
/*
    @Enumerated(EnumType.STRING)
    private equipmentType type;*/

}
