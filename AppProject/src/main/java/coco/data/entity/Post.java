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
    private List<PostReply> postReplyList = new ArrayList<>();

    @OneToMany(mappedBy = "post",cascade = CascadeType.REMOVE)
    private List<UserLikePost> likeUserList = new ArrayList<>();
    //    private List<UserLikePost> likeUserList = new ArrayList<UserLikePost>();
    @CreationTimestamp
    private Timestamp createdDate;

    @OneToMany(mappedBy = "post",cascade = CascadeType.REMOVE)
    private List<PostFile> postFileList = new ArrayList<>();

    // Board에서 파일 처리 위함
    public void addPostFile(PostFile postFile) {
        this.postFileList.add(postFile);

        // 게시글에 파일이 저장되어있지 않은 경우
        if(postFile.getPost() != this)
            // 파일 저장
            postFile.setPost(this);
    }

}