package coco.data.repository;

import coco.data.entity.PostFile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface PostFileRepository extends JpaRepository<PostFile, Integer> {

    List<PostFile> findAllByPostId(int postId);

    @Transactional
    PostFile save(PostFile postFile);

}
