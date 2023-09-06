package coco.data.dto;
//파일 체크 완료
import coco.data.entity.Post;
import coco.data.entity.PostFile;
import coco.data.entity.PostReply;
import coco.data.entity.User;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.security.core.Authentication;
import org.springframework.web.multipart.MultipartFile;

import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;


@Getter
@Setter
@NoArgsConstructor
public class PostDto {
    private int id;
    private String title;
    private String content;
    private List<PostFileDto> postFileList;
    private int liked;
    private UserDto user;
    private String createdDate;
    private int userNumber;
    private int postReplyCount;


    @Getter
    @NoArgsConstructor
    static
    class UserDto {
        private int userNumber;
        private String username;
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

        postFileList=new ArrayList<>();

        ArrayList<Object> postReplyList;
        postReplyList = new ArrayList<>();
        if (post.getPostReplyList() != null) {
            postReplyList.addAll(post.getPostReplyList());
        }
        postReplyCount = postReplyList.size();

        for(PostFile postFile:post.getPostFileList()){
            postFileList.add(new PostFileDto(postFile));
        }
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

        postFileList=new ArrayList<>();

        for(PostFile postFile:post.getPostFileList()){
            postFileList.add(new PostFileDto(postFile));
        }

        ArrayList<Object> postReplyList;
        postReplyList = new ArrayList<>();
        if (post.getPostReplyList() != null) {
            postReplyList.addAll(post.getPostReplyList());
        }
        postReplyCount = postReplyList.size();
    }



}
