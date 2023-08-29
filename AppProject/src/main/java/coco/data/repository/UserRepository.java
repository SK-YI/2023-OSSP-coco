package coco.data.repository;

import coco.data.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Integer> {
    User findByUsername(String username);
    User findById(int id);
    boolean existsByUsername(String username);
    boolean existsByNickname(String nickname);
}
