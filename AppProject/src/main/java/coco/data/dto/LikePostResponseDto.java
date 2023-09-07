package coco.data.dto;
import coco.data.entity.Facility;
import coco.data.entity.Post;
import coco.data.entity.UserFavoriteFacility;
import coco.data.entity.UserLikePost;
import lombok.*;

import java.io.Serializable;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LikePostResponseDto {

    private List<LikedPostDto> likedPostList;


    public LikePostResponseDto(List<Post> likePosts, List<UserLikePost> userLikePosts) {
        this.likedPostList = mapToLikePostDtoList(likePosts, userLikePosts);
    }

    private List<LikedPostDto> mapToLikePostDtoList(List<Post> likePosts, List<UserLikePost> userLikePosts) {
        List<LikedPostDto> likePostDtoList = new ArrayList<>();

        for (UserLikePost userLikePost : userLikePosts) {
            Optional<Post> matchingPost = likePosts.stream()
                    .filter(post -> post.getId() == userLikePost.getPost().getId())
                    .findFirst();

            matchingPost.ifPresent(post -> {
                LikedPostDto likedPostDto = new LikedPostDto(post);
                likePostDtoList.add(likedPostDto);
            });
        }
        return likePostDtoList;
    }

    @Getter
    @Setter
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class LikedPostDto implements Serializable {
        private int id;
        private String title;
        private String content;

        private  int liked;

        public LikedPostDto(Post post) {
            this.id = post.getId();
            this.title = post.getTitle();
            this.content = post.getContent();
            this.liked = post.getLiked();
        }
    }
}
