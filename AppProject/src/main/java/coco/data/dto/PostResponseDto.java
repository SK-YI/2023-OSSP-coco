package coco.data.dto;

import coco.data.entity.Post;
import coco.data.entity.User;
import coco.data.entity.UserLikePost;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Timestamp;
import java.util.Optional;

@Getter
@NoArgsConstructor
@Setter
public class PostResponseDto {
    private int id;
    private String title;
    private int liked;
    private UserDto user;
    private Timestamp createdDate;
    private boolean userLikePost;
    @Getter
    @NoArgsConstructor
    static
    class UserDto{
        private int userNumber;
        private String nickname;
        private String username;
        public UserDto(User user){
            userNumber=user.getUserNumber();
            nickname=user.getNickname();
            username=user.getUsername();
        }
    }
    public PostResponseDto(Post post){
        id=post.getId();
        title=post.getTitle();
        liked=post.getLiked();
        user=new UserDto(post.getUser());
        createdDate=post.getCreatedDate();
        userLikePost=false;
    }
    public PostResponseDto(Post post, Optional<UserLikePost> userLike){
        id=post.getId();
        title=post.getTitle();
        liked=post.getLiked();
        user=new UserDto(post.getUser());
        createdDate=post.getCreatedDate();
        userLikePost=userLike.isPresent();
    }

}
