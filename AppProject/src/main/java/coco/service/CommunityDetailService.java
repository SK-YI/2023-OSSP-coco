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

import java.util.List;
import java.util.Optional;

@Service
public class CommunityDetailService {
    @Autowired
    private PostRepository postRepository;
    @Autowired
    private UserLikePostRepository userLikePostRepository;
    @Autowired
    private UserRepository userRepository;

    //게시글 조회
    @Transactional
    public PostDetailResponseDto getPostDetail(int postId, List<Integer> fileId){
        Post post= postRepository.findById(postId);
        return new PostDetailResponseDto(post, fileId);
    }

    public PostDetailResponseDto getPostDetailAndLike(int postId, Authentication authentication,List<Integer> fileId){
        Optional<UserLikePost> userLikePost=userLikePostRepository.findByPostIdAndUserUserNumber(postId,userRepository.findByUsername(authentication.getName()).getUserNumber());
        //return new PostDetailResponseDto(postRepository.findById(postId),userLikePost);
        int accessUserNumber=userRepository.findByUsername(authentication.getName()).getUserNumber();
        return new PostDetailResponseDto(postRepository.findById(postId),userLikePost,accessUserNumber,fileId);
    }

}
