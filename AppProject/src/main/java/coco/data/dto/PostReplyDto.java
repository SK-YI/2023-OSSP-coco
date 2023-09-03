package coco.data.dto;
//파일체크 완료
import coco.data.entity.PostReply;
import coco.data.entity.User;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;
import java.text.SimpleDateFormat;

@Getter
@NoArgsConstructor
public class PostReplyDto {
    private int id;
    private String content;
    private UserDto user;
    private String createdDate;
    //private Timestamp createdDate;
    private int postId;
    private int userNumber;

    @Getter
    @NoArgsConstructor
    static
    class UserDto {
        private int userNumber;
        private String username;
        private String nickname;
        public UserDto(User user) {
            userNumber = user.getUserNumber();
            username=user.getUsername();
            nickname = user.getNickname();
        }
    }

    public PostReplyDto(PostReply postReply){
        id=postReply.getId();
        content= postReply.getContent();

        user=new UserDto(postReply.getUser());
        SimpleDateFormat dateFormat = new SimpleDateFormat("yy-MM-dd");
        createdDate = dateFormat.format(postReply.getCreatedDate());
        //createdDate=postReply.getCreatedDate();
        postId=postReply.getPost().getId();
        userNumber=postReply.getUser().getUserNumber();
    }
    public PostReplyDto(PostReply postReply,int postId,int userNumber){
        id=postReply.getId();
        content= postReply.getContent();
        SimpleDateFormat dateFormat = new SimpleDateFormat("yy-MM-dd");
        createdDate = dateFormat.format(postReply.getCreatedDate());
        //createdDate=postReply.getCreatedDate();

        this.postId=postId;
        this.userNumber=userNumber;
    }

}
