package coco.data.entity;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.CreationTimestamp;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "post_id")
    private int id;

    @Column(nullable = false)
    private String title;

    @Lob
    private String content;

    @ColumnDefault("0")
    @Column(nullable = false)
    private int liked;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @OneToMany(mappedBy = "post",cascade = CascadeType.REMOVE)
    private List<PostReply> postReplyList = new ArrayList<PostReply>();

    @OneToMany(mappedBy = "post",cascade = CascadeType.REMOVE)
    private List<UserLikePost> likeUserList = new ArrayList<UserLikePost>();

    @CreationTimestamp
    private Timestamp createdDate;
}