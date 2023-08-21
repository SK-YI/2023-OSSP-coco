package Data.Entity;

import Data.Type.UserRole;
import Data.Type.type;
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
    private String nickname;

    @Column(nullable = false)
    private String loginId;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private int age;

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
    private List<UserFavoriteFacility> likeCocktailList = new ArrayList<UserFavoriteFacility>();

    @Builder
    public User(int userNumber, String loginId, String password, String name, int age, String email, String nickname, type userType, UserRole role) {
        this.userNumber = userNumber;
        this.loginId = loginId;
        this.password = password;
        this.name = name;
        this.age = age;
        this.email = email;
        this.nickname = nickname;
        this.userType = userType;
        this.role = role;
    }
}
