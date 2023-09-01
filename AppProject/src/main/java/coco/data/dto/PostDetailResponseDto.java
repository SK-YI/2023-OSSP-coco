package coco.data.dto;

import coco.data.entity.Post;
import coco.data.entity.PostReply;
import coco.data.entity.User;
import coco.data.entity.UserLikePost;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Getter
@NoArgsConstructor
public class PostDetailResponseDto {
    private int id;
    private String title;
    private String content;
    private int liked;
    private UserDto user;
    private List<PostReplyDto> PostReplyList;
    private Timestamp createdDate;
    private boolean userLikePost;
    @Getter
    @NoArgsConstructor
    static
    class UserDto{
        private int id;
        private String username;
        private String nickname;
        public UserDto(User user){
            id= user.getUserNumber();
            username = user.getUsername();
            nickname=user.getNickname();
        }
    }
    public PostDetailResponseDto(Post Post, Optional<UserLikePost> userLike){
        id= Post.getId();
        title= Post.getTitle();
        content= Post.getContent();
        liked= Post.getLiked();
        user=new UserDto(Post.getUser());
        PostReplyList=new ArrayList<>();
        for(PostReply PostReply:Post.getPostReplyList()){
            PostReplyList.add(new PostReplyDto(PostReply));
        }
        createdDate=Post.getCreatedDate();
        userLikePost=userLike.isPresent();
    }
    public PostDetailResponseDto(Post Post){
        id= Post.getId();
        title= Post.getTitle();
        content= Post.getContent();
        liked= Post.getLiked();
        user=new UserDto(Post.getUser());
        PostReplyList=new ArrayList<>();
        for(PostReply PostReply:Post.getPostReplyList()){
            PostReplyList.add(new PostReplyDto(PostReply));
        }
        createdDate=Post.getCreatedDate();
        userLikePost=false;
    }
}
