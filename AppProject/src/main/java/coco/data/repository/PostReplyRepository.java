package coco.data.repository;

import coco.data.entity.Post;
import coco.data.entity.PostReply;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
@Repository
public interface PostReplyRepository extends JpaRepository<PostReply, Integer> {
    @Transactional
    PostReply save(PostReply postReply);
    List<PostReply> findAllByPostId(int id);
    @Transactional
    void deleteById(int id);
    PostReply findById(int id);

}
