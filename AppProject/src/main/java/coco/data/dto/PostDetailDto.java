package coco.data.dto;
//파일 체크 완료
import coco.data.entity.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

public class PostDetailDto {
    private int id;
    private String title;
    private String content;
    private int liked;
    private UserDto user;
    private List<PostReplyDto> postReplyList;
    private String createdDate;
    //private Timestamp createdDate;
    private boolean userLikePost;
    private List<PostFileDto> postFileList;

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

        postReplyList=new ArrayList<>();
        for(PostReply postReply:post.getPostReplyList()){
            postReplyList.add(new PostReplyDto(postReply));
        }

        SimpleDateFormat dateFormat = new SimpleDateFormat("yy-MM-dd");
        createdDate = dateFormat.format(post.getCreatedDate());
        //createdDate=post.getCreatedDate();
        userLikePost=userLike.isPresent();

        postFileList=new ArrayList<>();
        for(PostFile postFile:post.getPostFileList()){
            postFileList.add(new PostFileDto(postFile));
        }
    }
    //PostDetailResponseDto
    public PostDetailDto(Post post){
        id= post.getId();
        title= post.getTitle();
        content= post.getContent();
        liked= post.getLiked();

        user=new UserDto(post.getUser());

        postReplyList=new ArrayList<>();
        for(PostReply postReply:post.getPostReplyList()){
            postReplyList.add(new PostReplyDto(postReply));
        }
        SimpleDateFormat dateFormat = new SimpleDateFormat("yy-MM-dd");
        createdDate = dateFormat.format(post.getCreatedDate());
        //createdDate=post.getCreatedDate();
        userLikePost=false;

        postFileList=new ArrayList<>();
        for(PostFile postFile:post.getPostFileList()){
            postFileList.add(new PostFileDto(postFile));
        }
    }

}
