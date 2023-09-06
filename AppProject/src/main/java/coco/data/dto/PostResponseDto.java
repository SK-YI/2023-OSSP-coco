package coco.data.dto;

import coco.data.entity.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.apache.commons.io.IOUtils;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
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
    private int thumbnailId;
//    private byte[] imageByteArray;

    //private List<PostFileDto> postFileList;
    @Getter
    @NoArgsConstructor
    static
    class UserDto {
        private String nickname;

        public UserDto(User user) {
            nickname = user.getNickname();
        }
    }

    public PostResponseDto(Post post) {

        id = post.getId();
        title = post.getTitle();
        liked = post.getLiked();
        user = new UserDto(post.getUser());

        //날짜 형식을 변환
        SimpleDateFormat dateFormat = new SimpleDateFormat("yy-MM-dd");
        createdDate = dateFormat.format(post.getCreatedDate());
        //createdDate=post.getCreatedDate();
        userLikePost = false;

        ArrayList<Object> postReplyList;
        postReplyList = new ArrayList<>();
        if (post.getPostReplyList() != null) {
            postReplyList.addAll(post.getPostReplyList());
        }
        postReplyCount = postReplyList.size();

//        // 화면에 이미지출력
//        // 이미지가 저장된 절대 경로 추출
//        String absolutePath =
//                new File("").getAbsolutePath() + File.separator + File.separator;
//        String path;

        if (!post.getPostFileList().isEmpty()) {  // 첨부파일 존재 o
            this.thumbnailId = post.getPostFileList().get(0).getId();  // 첫번째 이미지 반환
         //   path = post.getPostFileList().get(0).getFilePath();

        }
        else {// 첨부파일 존재 x
            this.thumbnailId = 0;  // 서버에 저장된 기본 이미지 반환
          //  path = "images" + File.separator + "thumbnail" + File.separator + "thumbnail.png";
        }
//        // 추가한 과정
//
//    // 화면에 이미지출력
//    // 이미지가 저장된 절대 경로 추출
//    String absolutePath =
//            new File("").getAbsolutePath() + File.separator + File.separator;
//    String path;
//
//    if(thumbnailId != 0) {  // 전달되어 온 이미지가 기본 썸네일이 아닐 경우;
//        PostFile postFile=new PostFile();
//        postFile=postFileService.findBy;
//        path = postFile.getFilePath();
//    }
//        else {  // 전달되어 온 이미지가 기본 썸네일일 경우
//        path = "images" + File.separator + "thumbnail" + File.separator + "thumbnail.png";
//    }
//
//    // FileInputstream의 객체를 생성하여
//    // 이미지가 저장된 경로를 byte[] 형태의 값으로 encoding
//    InputStream imageStream = new FileInputStream(absolutePath + path);
//    byte[] imageByteArray = IOUtils.toByteArray(imageStream);
//    imageStream.close();


//        ArrayList<Object> postFileList;
//        postFileList=new ArrayList<>();
//        if (post.getPostFileList() != null) {
//            postFileList.addAll(post.getPostFileList());
//        }
}


    public PostResponseDto(Post post, Optional<UserLikePost> userLike) {
        id = post.getId();
        title = post.getTitle();
        liked = post.getLiked();
        user = new UserDto(post.getUser());
        SimpleDateFormat dateFormat = new SimpleDateFormat("yy-MM-dd");
        createdDate = dateFormat.format(post.getCreatedDate());
        userLikePost = userLike.isPresent();

        ArrayList<Object> postReplyList;
        postReplyList = new ArrayList<>();
        if (post.getPostReplyList() != null) {
            postReplyList.addAll(post.getPostReplyList());
        }
        postReplyCount = postReplyList.size();

        // 화면에 이미지출력
        // 이미지가 저장된 절대 경로 추출

       // String absolutePath = new File("").getAbsolutePath() + File.separator + File.separator;
       // String path;

        if (!post.getPostFileList().isEmpty()) {  // 첨부파일 존재 o
            this.thumbnailId = post.getPostFileList().get(0).getId();  // 첫번째 이미지 반환
            //path = post.getPostFileList().get(0).getFilePath();
        } else {// 첨부파일 존재 x
            this.thumbnailId = 0;  // 서버에 저장된 기본 이미지 반환
            //path = "images" + File.separator + "thumbnail" + File.separator + "thumbnail.png";
        }


//        InputStream imageStream = new FileInputStream(absolutePath + path);
//        byte[] imageByteArray = IOUtils.toByteArray(imageStream);
//        imageStream.close();
    }

//        ArrayList<Object> postFileList;
//        postFileList=new ArrayList<>();
//        if (post.getPostFileList() != null) {
//            postFileList.addAll(post.getPostFileList());
//        }
    }


