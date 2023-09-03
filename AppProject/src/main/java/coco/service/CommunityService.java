package coco.service;

import coco.data.dto.LikedResponseDto;
import coco.data.dto.PostDto;
//import coco.data.repository.PostReplyRepository;
import coco.data.dto.PostRequestDto;
import coco.data.dto.PostResponseDto;
import coco.data.entity.Post;
import coco.data.entity.UserLikePost;
import coco.data.repository.PostReplyRepository;
import coco.data.repository.PostRepository;
import coco.data.repository.UserLikePostRepository;
import coco.data.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Timestamp;
import java.util.Optional;

@Service
public class CommunityService {
    @Autowired
    private PostRepository postRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private UserLikePostRepository userLikePostRepository;
    @Autowired
    private PostReplyRepository postReplyRepository;


    @Transactional
    public PostDto createPost(PostRequestDto postRequestDto, Authentication authentication) {
        String content=postRequestDto.getContent();
        String title=postRequestDto.getTitle();

        int userNumber=userRepository.findByUsername(authentication.getName()).getUserNumber();

        Post post=new Post();
        post.setContent(content);
        post.setCreatedDate(new Timestamp(System.currentTimeMillis()));
        post.setUser(userRepository.findByUsername(authentication.getName()));
        post.setTitle(title);
        
        Post savePost=postRepository.save(post);
        return new PostDto(savePost,userNumber);
    }

    @Transactional
    public String deletePost(int postId,Authentication authentication){
        Post post=postRepository.findById(postId);
        if(post.getUser().getUserNumber()==userRepository.findByUsername(authentication.getName()).getUserNumber()){
            postRepository.deleteById(postId);
            return "success";
        }
        return "fail";
    }

    @Transactional
    public PostDto editPost(int postId,PostRequestDto postRequestDto){
        Post post=postRepository.findById(postId);

        if(postRequestDto.getTitle()!=null){
            post.setTitle(postRequestDto.getTitle());
        }
        if(postRequestDto.getContent()!=null){
            post.setContent(postRequestDto.getContent());
        }
        postRepository.save(post);
        return new PostDto(post);
    }

    @Transactional
    public Page<PostResponseDto> getPostList(Pageable pageable, Authentication authentication) {
        if(authentication != null && authentication.getPrincipal() != "anonymousUser"){
            return postRepository.findAllByOrderByIdDesc(pageable).map(post->new PostResponseDto(post,userLikePostRepository.findByPostIdAndUserUserNumber(post.getId(),userRepository.findByUsername(authentication.getName()).getUserNumber())));
        }
        return postRepository.findAllByOrderByIdDesc(pageable).map(PostResponseDto::new);
    }

    @Transactional
    public Page<PostResponseDto> getPostListByTitle(String title, Pageable pageable, Authentication authentication) {
        if(authentication != null && authentication.getPrincipal() != "anonymousUser"){
            return postRepository.findAllByTitleContaining(title,pageable).map(post->new PostResponseDto(post,userLikePostRepository.findByPostIdAndUserUserNumber(post.getId(),userRepository.findByUsername(authentication.getName()).getUserNumber())));
        }
        return postRepository.findAllByTitleContaining(title,pageable).map(PostResponseDto::new);
    }

    @Transactional
    public LikedResponseDto likePost(int postId, Authentication authentication){
        int userNumber=userRepository.findByUsername(authentication.getName()).getUserNumber();
        Optional<UserLikePost> likedPost=userLikePostRepository.findByPostIdAndUserUserNumber(postId,userNumber);
        Post post=postRepository.findById(postId);
        int liked;
        if(likedPost.isPresent()){
            userLikePostRepository.deleteByUserUserNumberAndPostId(userNumber,postId);
            liked=post.getLiked()-1;
            post.setLiked(liked);
        }
        else{
            UserLikePost userLikePost=new UserLikePost();
            userLikePost.setPost(post);
            userLikePost.setUser(userRepository.findById(userNumber));
            UserLikePost saveUserLikePost=userLikePostRepository.save(userLikePost);
            liked=post.getLiked()+1;
            post.setLiked(liked);
        }
        return new LikedResponseDto(liked);
    } 

}
