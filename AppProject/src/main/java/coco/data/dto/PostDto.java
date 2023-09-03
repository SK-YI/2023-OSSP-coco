package coco.data.dto;
//파일 체크 완료
import coco.data.entity.Post;
import coco.data.entity.User;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.security.core.Authentication;

import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.time.format.DateTimeFormatter;
import java.util.List;


@Getter
@Setter
@NoArgsConstructor
public class PostDto {
    private int id;
    private String title;
    private String content;
    private int liked;
    private UserDto user;
    private String createdDate;
    private int userNumber;

    @Getter
    @NoArgsConstructor
    static
    class UserDto {
        private int userNumber;
        private String username;
        //userId
        private String nickname;

        public UserDto(User user) {
            userNumber = user.getUserNumber();
            username = user.getUsername();
            nickname = user.getNickname();
        }
    }

    public PostDto(Post post){
        id=post.getId();
        title= post.getTitle();
        content=post.getContent();
        liked=post.getLiked();
        user=new UserDto(post.getUser());
        SimpleDateFormat dateFormat = new SimpleDateFormat("yy-MM-dd");
        createdDate = dateFormat.format(post.getCreatedDate());
        //createdDate=post.getCreatedDate();
    }

    public PostDto(Post post, int userNumber){
        id=post.getId();
        title= post.getTitle();
        content=post.getContent();
        liked=post.getLiked();
        SimpleDateFormat dateFormat = new SimpleDateFormat("yy-MM-dd");
        createdDate = dateFormat.format(post.getCreatedDate());
        //createdDate=post.getCreatedDate();
        this.userNumber=userNumber;
    }



}
