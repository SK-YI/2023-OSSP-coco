package coco.data.repository;

import coco.data.entity.UserLikePost;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
@Repository
public interface UserLikePostRepository extends JpaRepository<UserLikePost,Integer>{

    //자꾸 userNumber 부분에서 오류.
    @SuppressWarnings("all")
    Optional<UserLikePost> findByPostIdAndUserUserNumber(int postId, int userNumber);
    List<UserLikePost> findPostsByUserUserNumber(int userNumber);
    UserLikePost save(UserLikePost userLikePost);
    void deleteByUserUserNumberAndPostId(int userNumber,int postId);

}
