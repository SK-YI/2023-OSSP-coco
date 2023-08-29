package coco.data.entity;

import coco.data.type.UserRole;
import coco.data.type.type;
import jakarta.validation.constraints.Email;
import lombok.*;
import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_number")
    private int userNumber;

    @Column(nullable = false)
    private String username;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String nickname;

    @Column(nullable = false)
    private int age;

    @Email
    @Column(nullable = false)
    private String email;

    @Enumerated(EnumType.STRING)
    private type userType;

    @Enumerated(EnumType.STRING)
    private UserRole role; // 역할 매핑 추가

    @OneToMany(mappedBy = "user", cascade = CascadeType.REMOVE)
    private List<Post> boardList = new ArrayList<Post>();

    @OneToMany(mappedBy = "user", cascade = CascadeType.REMOVE)
    private List<PostReply> boardReplyList = new ArrayList<PostReply>();

    @OneToMany(mappedBy = "user", cascade = CascadeType.REMOVE)
    private List<FacilityReview> FacilityReviewList = new ArrayList<FacilityReview>();

    @OneToMany(mappedBy = "user", cascade = CascadeType.REMOVE)
    private List<UserLikePost> likeBoardList = new ArrayList<UserLikePost>();

    @OneToMany(mappedBy = "user", cascade = CascadeType.REMOVE)
    private List<UserFavoriteFacility> favoriteFacilities = new ArrayList<UserFavoriteFacility>();

}
