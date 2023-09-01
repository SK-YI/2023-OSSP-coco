package coco.data.dto;

import coco.data.entity.Post;
import coco.data.entity.User;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.security.core.Authentication;

@Getter
@NoArgsConstructor
public class PostRequestDto {
    String title;
    String content;

    /*
    public Post toEntity(UserRequestDto userRequestDto, Authentication authentication){
        Post build = Post.builder()
                .title(title)
                .content(content)
                .user(user)
                .build();
        return build;

    }*/

}

