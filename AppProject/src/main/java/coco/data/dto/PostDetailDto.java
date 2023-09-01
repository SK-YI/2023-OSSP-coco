package coco.data.dto;
//파일 체크 완료
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

public class PostDetailDto {
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
        private int userNumber;
        private String username;
        private String nickname;
        public UserDto(User user){
            userNumber= user.getUserNumber();
            username=user.getUsername();
            nickname=user.getNickname();
        }
    }
    //PostDetailResponseDto
    public PostDetailDto(Post post, Optional<UserLikePost> userLike){
        id= post.getId();
        title= post.getTitle();
        content= post.getContent();
        liked= post.getLiked();

        user=new UserDto(post.getUser());
        PostReplyList=new ArrayList<>();

        for(PostReply postReply:post.getPostReplyList()){
            PostReplyList.add(new PostReplyDto(postReply));
        }
        createdDate=post.getCreatedDate();
        userLikePost=userLike.isPresent();
    }
    //PostDetailResponseDto
    public PostDetailDto(Post post){
        id= post.getId();
        title= post.getTitle();
        content= post.getContent();
        liked= post.getLiked();

        user=new UserDto(post.getUser());
        PostReplyList=new ArrayList<>();
        for(PostReply postReply:post.getPostReplyList()){
            PostReplyList.add(new PostReplyDto(postReply));
        }
        createdDate=post.getCreatedDate();
        userLikePost=false;
    }

}
