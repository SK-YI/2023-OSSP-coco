package coco.data.entity;

import jakarta.persistence.*;
import lombok.*;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
public class type {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column
    private String 대분류;

    @Column
    private String 중분류;

    @Column
    private String 소분류;

}
