package coco.data.dto;

import coco.data.entity.*;
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
    //private Timestamp createdDate;
    private String createdDate;

    private int liked;
    private int postReplyCount;
    private List<PostReplyDto> postReplyList;


    private boolean userLikePost;
    //private List<PostFileDto> postFileList;
    private List<Integer> fileId;

    @Getter
    @NoArgsConstructor
    static
    class UserDto{
        private int id;
        //private String username;
        private String nickname;
        public UserDto(User user){
            id= user.getUserNumber();
            //username = user.getUsername();
            nickname=user.getNickname();
        }
    }
    public PostDetailResponseDto(Post post, Optional<UserLikePost> userLike, List<Integer> fileId){
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

        this.fileId = fileId;

//        ArrayList<Object> postFileList;
//        postFileList=new ArrayList<>();
//        if (post.getPostFileList() != null) {
//            postFileList.addAll(post.getPostFileList());
//        }

//        postFileList=new ArrayList<>();
//
//        for(PostFile postFile:post.getPostFileList()){
//            postFileList.add(new PostFileDto(postFile));
//        }
    }
    public PostDetailResponseDto(Post post,List<Integer> fileId){
        id= post.getId();
        title= post.getTitle();
        content= post.getContent();

        user=new UserDto(post.getUser());
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

        this.fileId = fileId;

//        ArrayList<Object> postFileList;
//        postFileList=new ArrayList<>();
//        if (post.getPostFileList() != null) {
//            postFileList.addAll(post.getPostFileList());
//        }

//        postFileList=new ArrayList<>();
//
//        for(PostFile postFile:post.getPostFileList()){
//            postFileList.add(new PostFileDto(postFile));
//        }
    }
    public PostDetailResponseDto(Post post, Optional<UserLikePost> userLike, int accessUserNumber,List<Integer> fileId){
        id= post.getId();
        title= post.getTitle();
        content= post.getContent();
        user=new UserDto(post.getUser());

        postReplyList=new ArrayList<>();
        for(PostReply postReply:post.getPostReplyList()){
            postReplyList.add(new PostReplyDto(postReply,accessUserNumber));
        }
        SimpleDateFormat dateFormat = new SimpleDateFormat("yy-MM-dd");
        postReplyCount=postReplyList.size();
        liked= post.getLiked();

        createdDate = dateFormat.format(post.getCreatedDate());
        //createdDate=Post.getCreatedDate();
        userLikePost=userLike.isPresent();

        this.fileId = fileId;

//        ArrayList<Object> postFileList;
//        postFileList=new ArrayList<>();
//        if (post.getPostFileList() != null) {
//            postFileList.addAll(post.getPostFileList());
//        }


//        postFileList=new ArrayList<>();
//
//        for(PostFile postFile:post.getPostFileList()){
//            postFileList.add(new PostFileDto(postFile));
//        }
    }
}
