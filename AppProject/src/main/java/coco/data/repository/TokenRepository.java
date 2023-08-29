package coco.data.repository;

import coco.data.entity.AccessToken;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface TokenRepository extends JpaRepository<AccessToken, String> {
    Optional<AccessToken> findByUsername(String username);
}