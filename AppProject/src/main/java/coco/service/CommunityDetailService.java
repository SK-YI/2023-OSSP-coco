package coco.service;

import coco.data.dto.PostDetailResponseDto;

import coco.data.entity.Post;
import coco.data.entity.UserLikePost;

import coco.data.repository.PostRepository;
import coco.data.repository.UserLikePostRepository;
import coco.data.repository.UserRepository;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CommunityDetailService {
    @Autowired
    private PostRepository postRepository;
    @Autowired
    private UserLikePostRepository userLikePostRepository;
    @Autowired
    private UserRepository userRepository;


    //findById 작동 X ㅋㅋㅋ
    //게시글 조회
    @Transactional
    public PostDetailResponseDto getPostDetail(int postId){
        // postReply와 같은구조인데 왜 안될까?
        Post post= postRepository.findById(postId);
        return new PostDetailResponseDto(post);
    }

    public PostDetailResponseDto getPostDetailAndLike(int postId, Authentication authentication){
        Optional<UserLikePost> userLikePost=userLikePostRepository.findByPostIdAndUserUserNumber(postId,userRepository.findByUsername(authentication.getName()).getUserNumber());
        return new PostDetailResponseDto(postRepository.findById(postId),userLikePost);
    }


}
