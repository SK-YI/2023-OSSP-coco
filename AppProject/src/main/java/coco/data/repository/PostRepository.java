package coco.data.repository;

import coco.data.entity.Post;
import coco.data.entity.PostReply;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface PostRepository extends JpaRepository<Post,Integer> {
    Post findById(int id);
    //어노테이션 추가
    @Transactional
    Post save(Post post);


    // 어노테이션 추가
    @Transactional
    void deleteById(int id);
    Page<Post> findAllByOrderByIdDesc(Pageable pageable);
    Page<Post> findAllByOrderByTitle(Pageable pageable);
    //Page<Post> findAllByOrderByLikedDesc(Pageable pageable);
    Page<Post> findAllByTitleContaining(String title,Pageable pageable);
    //Page<Post> findAllByContentContaining(String content,Pageable pageable);
    List<Post> findAllByUserUserNumber(int userNumber);
    List<Post> findAllByPostReplyListUserUserNumber(int userNumber);

}
