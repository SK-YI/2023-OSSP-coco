package coco.data.dto;

import coco.data.entity.Post;
import coco.data.entity.User;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Getter
@NoArgsConstructor
public class PostRequestDto {
    String title;
    String content;
    List<MultipartFile> files;

    //formdata로 받기위해 추가
    public void setPostRequestDto (String requestTitle, String requestContent) {
        title=requestTitle;
        content=requestContent;
    }
}

//파일 추가 안하는 원래버전
//public class PostRequestDto {
//    String title;
//    String content;
//
//}

