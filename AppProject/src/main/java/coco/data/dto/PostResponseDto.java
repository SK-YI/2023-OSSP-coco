package coco.data.dto;

import coco.data.entity.Post;
import coco.data.entity.PostReply;
import coco.data.entity.User;
import coco.data.entity.UserLikePost;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Getter
@NoArgsConstructor
@Setter
public class PostResponseDto {
    private int id;
    private String title;
    private UserDto user;
    private String createdDate;

    private int liked;
    private int postReplyCount;
    //private List<PostReplyDto> postReplyList;

    //private Timestamp createdDate;
    private boolean userLikePost;
    @Getter
    @NoArgsConstructor
    static
    class UserDto{
        //private int userNumber;
        private String nickname;
        //private String username;
        public UserDto(User user){
            //userNumber=user.getUserNumber();
            nickname=user.getNickname();
            //username=user.getUsername();
        }
    }
    public PostResponseDto(Post post){

        id=post.getId();
        title=post.getTitle();


        liked=post.getLiked();
        user=new UserDto(post.getUser());

        //날짜 형식을 변환
        SimpleDateFormat dateFormat = new SimpleDateFormat("yy-MM-dd");
        createdDate = dateFormat.format(post.getCreatedDate());
        //createdDate=post.getCreatedDate();
        userLikePost=false;

        ArrayList<Object> postReplyList;
        postReplyList = new ArrayList<>();
        if (post.getPostReplyList() != null) {
            postReplyList.addAll(post.getPostReplyList());
        }
        postReplyCount = postReplyList.size();
    }

    public PostResponseDto(Post post, Optional<UserLikePost> userLike){
        id=post.getId();
        title=post.getTitle();
        liked=post.getLiked();
        user=new UserDto(post.getUser());
        SimpleDateFormat dateFormat = new SimpleDateFormat("yy-MM-dd");
        createdDate = dateFormat.format(post.getCreatedDate());
        userLikePost=userLike.isPresent();

        ArrayList<Object> postReplyList;
        postReplyList = new ArrayList<>();
        if (post.getPostReplyList() != null) {
            postReplyList.addAll(post.getPostReplyList());
        }
        postReplyCount = postReplyList.size();
    }

}
