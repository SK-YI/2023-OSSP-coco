package Data.Entity;

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
    private int user_number;

    @Column(nullable = false)
    private String id;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String username;
    @Column(nullable = false)
    private int age;
    @Column(nullable = false)
    private String email;

    @Column(nullable = false)
    private String nickname;

    @Enumerated(EnumType.STRING)
    private type role;

    @OneToMany(mappedBy = "user",cascade = CascadeType.REMOVE)
    private List<Post> boardList = new ArrayList<Post>();

    @OneToMany(mappedBy = "user",cascade = CascadeType.REMOVE)
    private List<PostReply> boardReplyList = new ArrayList<PostReply>();

    @OneToMany(mappedBy = "user",cascade = CascadeType.REMOVE)
    private List<FacilityReview> FacilityReviewList = new ArrayList<FacilityReview>();

    @OneToMany(mappedBy = "user",cascade = CascadeType.REMOVE)
    private List<UserLikePost> likeBoardList = new ArrayList<UserLikePost>();

    @OneToMany(mappedBy = "user",cascade = CascadeType.REMOVE)
    private List<UserFavoriteFacility> likeCocktailList = new ArrayList<UserFavoriteFacility>();

    public int getUser_number() {
        return user_number;
    }

    public void setUser_number(int user_number) {
        this.user_number = user_number;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getNickname() {
        return nickname;
    }

    public void setNickname(String nickname) {
        this.nickname = nickname;
    }

    public type getRole() {
        return role;
    }

    public void setRole(type role) {
        this.role = role;
    }
}