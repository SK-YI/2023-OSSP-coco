package coco.controller;

import coco.data.dto.LikedResponseDto;
import coco.data.dto.PostDto;
import coco.data.dto.PostRequestDto;
import coco.data.dto.PostResponseDto;
import coco.service.CommunityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.webjars.NotFoundException;

@CrossOrigin
@RestController
public class CommunityController {

    @Autowired
    private CommunityService communityService;
    private final int defaultPageSize = 4; //수정가능
    //게시글 생성 - 완료

    //커뮤니티 메인페이지 - 완료
    @GetMapping("/community")
    @ResponseBody
    public ResponseEntity<Page<PostResponseDto>> getPostList(@PageableDefault Pageable pageable) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Pageable modifiedPageable = PageRequest.of(pageable.getPageNumber(), defaultPageSize);
        Page<PostResponseDto> postList = communityService.getPostList(modifiedPageable, authentication);
        return ResponseEntity.ok(postList);
    }

    @PostMapping("/community")
    public ResponseEntity<PostDto> createPost(@RequestBody PostRequestDto postRequestDto){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.getPrincipal() != "anonymousUser") {
            return ResponseEntity.ok(communityService.createPost(postRequestDto,authentication));
        }
        return ResponseEntity.ok(null);
    }
    //게시글 삭제 - 완료
    @DeleteMapping("/community/{postId}")
    public ResponseEntity<String> deletePost(@PathVariable int postId){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.getPrincipal() != "anonymousUser") {
            return ResponseEntity.ok(communityService.deletePost(postId,authentication));
        }
        return ResponseEntity.ok("fail");
    }
    //게시글 수정 - 완료
    @PutMapping("/community/{postId}")
    public ResponseEntity<PostDto> editPost(@PathVariable int postId,@RequestBody PostRequestDto postRequestDto){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if(authentication != null && authentication.getPrincipal() != "anonymousUser"){
            return ResponseEntity.ok(communityService.editPost(postId,postRequestDto));
        }
        return ResponseEntity.notFound().build();
    }
    //게시글 좋아요 - 완료

    @PutMapping("/community/{postId}/like")
    public ResponseEntity<LikedResponseDto> likePost(@PathVariable int postId){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if(authentication != null && authentication.getPrincipal() != "anonymousUser"){
            return ResponseEntity.ok(communityService.likePost(postId,authentication));
        }
        return ResponseEntity.notFound().build();
    }

    //게시글 제목으로 찾기 - 완료
    @GetMapping("/community/title/{post_title}")
    @ResponseBody
    public ResponseEntity<Page<PostResponseDto>> getPostListByTitle(@PageableDefault Pageable pageable,@PathVariable String post_title){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Pageable modifiedPageable = PageRequest.of(pageable.getPageNumber(), defaultPageSize);
        Page<PostResponseDto> postList=communityService.getPostListByTitle(post_title,modifiedPageable,authentication);
        return ResponseEntity.ok(postList);
    }
        
    

}










