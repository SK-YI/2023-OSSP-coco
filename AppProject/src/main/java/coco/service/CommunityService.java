package coco.service;

import coco.data.dto.LikedResponseDto;
import coco.data.dto.PostDto;
//import coco.data.repository.PostReplyRepository;
import coco.data.dto.PostRequestDto;
import coco.data.dto.PostResponseDto;

import coco.data.entity.Post;
import coco.data.entity.PostFile;

import coco.data.entity.UserLikePost;
import coco.data.repository.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.sql.Timestamp;
import java.util.List;
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
    @Autowired
    private PostFileRepository postFileRepository;
    @Autowired
    private FileHandler fileHandler;


    //이미지 받는  ver
    @Transactional
    public PostDto createPost(PostRequestDto postRequestDto, Authentication authentication, List<MultipartFile> files) throws Exception{
        String content=postRequestDto.getContent();
        String title=postRequestDto.getTitle();

        Post post=new Post();
        post.setContent(content);
        post.setCreatedDate(new Timestamp(System.currentTimeMillis()));
        post.setUser(userRepository.findByUsername(authentication.getName()));
        post.setTitle(title);

        List<PostFile> postFileList = fileHandler.parseFileInfo(post,files);
        int userNumber=userRepository.findByUsername(authentication.getName()).getUserNumber();

        // 파일이 존재할 때에만 처리
        if(!postFileList.isEmpty()) {
            for(PostFile postFile : postFileList) {
                // 파일을 DB에 저장
                post.addPostFile(postFileRepository.save(postFile));
                //PostFile saveFile=PostFileRepository.save(postFile);
            }
            post.setPostFileList(postFileList);

        }
            Post savePost=postRepository.save(post);
            return new PostDto(savePost,userNumber);

    }

    //이미지 안받는 원래 ver
//    @Transactional
//    public PostDto createPost(PostRequestDto postRequestDto, Authentication authentication) {
//        String content=postRequestDto.getContent();
//        String title=postRequestDto.getTitle();
//
//        int userNumber=userRepository.findByUsername(authentication.getName()).getUserNumber();
//
//        Post post=new Post();
//        post.setContent(content);
//        post.setCreatedDate(new Timestamp(System.currentTimeMillis()));
//        post.setUser(userRepository.findByUsername(authentication.getName()));
//        post.setTitle(title);
//
//        Post savePost=postRepository.save(post);
//        return new PostDto(savePost,userNumber);
//    }

    @Transactional
    public Boolean deletePost(int postId,Authentication authentication){
        Post post=postRepository.findById(postId);
        if(post.getUser().getUserNumber()==userRepository.findByUsername(authentication.getName()).getUserNumber()){
            postRepository.deleteById(postId);
            return true;
        }
        return false;
    }

    //이미지를 안받는 버전
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

    //게시판 수정 이미지를 받는 버전
    @Transactional
    public PostDto editPost(int postId,PostRequestDto postRequestDto,List<MultipartFile> files) throws Exception{
        Post post=postRepository.findById(postId);

        if(postRequestDto.getTitle()!=null){
            post.setTitle(postRequestDto.getTitle());
        }
        if(postRequestDto.getContent()!=null){
            post.setContent(postRequestDto.getContent());
        }
        List<PostFile> postFileList = fileHandler.parseFileInfo(post, files);
        if(!postFileList.isEmpty()){
            for(PostFile postFile : postFileList) {
                postFileRepository.save(postFile);
            }
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
    public Page<PostResponseDto> getPostListByTitle(String title, Pageable pageable, Authentication authentication){
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
