package coco.data.dto;

import coco.data.entity.Post;
import coco.data.entity.PostReply;
import coco.data.entity.User;
import coco.data.entity.UserLikePost;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Getter
@NoArgsConstructor
public class PostDetailResponseDto {
    private int id;
    private String title;
    private String content;
    private UserDto user;
    private String createdDate;

    private int liked;
    private int postReplyCount;
    private List<PostReplyDto> postReplyList;

    //private Timestamp createdDate;
    private boolean userLikePost;
    @Getter
    @NoArgsConstructor
    static
    class UserDto{
        //private int id;
        //private String username;
        private String nickname;
        public UserDto(User user){
            //id= user.getUserNumber();
            //username = user.getUsername();
            nickname=user.getNickname();
        }
    }
    public PostDetailResponseDto(Post post, Optional<UserLikePost> userLike){
        id= post.getId();
        title= post.getTitle();
        content= post.getContent();
        user=new UserDto(post.getUser());

        postReplyList=new ArrayList<>();
        for(PostReply postReply:post.getPostReplyList()){
            postReplyList.add(new PostReplyDto(postReply));
        }
        SimpleDateFormat dateFormat = new SimpleDateFormat("yy-MM-dd");
        postReplyCount=postReplyList.size();
        liked= post.getLiked();

        createdDate = dateFormat.format(post.getCreatedDate());
        //createdDate=Post.getCreatedDate();
        userLikePost=userLike.isPresent();
    }
    public PostDetailResponseDto(Post post){
        id= post.getId();
        title= post.getTitle();
        content= post.getContent();

        user=new UserDto(post.getUser());
        postReplyCount=postReplyList.size();
        postReplyList=new ArrayList<>();
        for(PostReply postReply:post.getPostReplyList()){
            postReplyList.add(new PostReplyDto(postReply));
        }
        postReplyCount=postReplyList.size();
        liked= post.getLiked();
        SimpleDateFormat dateFormat = new SimpleDateFormat("yy-MM-dd");
        createdDate = dateFormat.format(post.getCreatedDate());
        //createdDate=post.getCreatedDate();
        userLikePost=false;
    }
}
