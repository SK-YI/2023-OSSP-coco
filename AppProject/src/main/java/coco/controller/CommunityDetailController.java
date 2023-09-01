package coco.controller;

import coco.data.dto.PostDetailResponseDto;
import coco.service.CommunityDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
public class CommunityDetailController {
    @Autowired
    private CommunityDetailService communityDetailService;



    //게시글 조회 - CommunityDetailService 서비스 오류
    @GetMapping("/community/{postId}")
    @ResponseBody
    public ResponseEntity<PostDetailResponseDto> getPost(@PathVariable int postId){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        PostDetailResponseDto postDto;
        if(authentication != null && authentication.getPrincipal() != "anonymousUser"){
            postDto=communityDetailService.getPostDetailAndLike(postId,authentication);
            return ResponseEntity.ok(postDto);
        }
        postDto=communityDetailService.getPostDetail(postId);
        return ResponseEntity.ok(postDto);
    }

}
