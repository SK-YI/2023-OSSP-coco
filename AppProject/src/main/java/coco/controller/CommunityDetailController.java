package coco.controller;

import coco.data.dto.PostDetailResponseDto;
import coco.data.dto.PostFileResponseDto;
import coco.service.CommunityDetailService;
import coco.service.PostFileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@CrossOrigin
@RestController
public class CommunityDetailController {
    @Autowired
    private CommunityDetailService communityDetailService;

    @Autowired
    private PostFileService postFileService;

    //게시글 조회 - 성공
    @GetMapping("/community/{postId}")
    @ResponseBody
    public ResponseEntity<PostDetailResponseDto> getPost(@PathVariable int postId){

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        PostDetailResponseDto postDto;

        // 게시글 id로 해당 게시글 첨부파일 전체 조회
        List<PostFileResponseDto> postFileResponseDtoList =
                postFileService.findAllByBoard(postId);
        // 게시글 첨부파일 id 담을 List 객체 생성
        List<Integer> postFileId = new ArrayList<>();
        // 각 첨부파일 id 추가
        for(PostFileResponseDto postFileResponseDto : postFileResponseDtoList)
            postFileId.add(postFileResponseDto.getFileId());

        if(authentication != null && authentication.getPrincipal() != "anonymousUser"){
            postDto=communityDetailService.getPostDetailAndLike(postId,authentication,postFileId);
            return ResponseEntity.ok(postDto);
        }
        postDto=communityDetailService.getPostDetail(postId,postFileId);
        return ResponseEntity.ok(postDto);
    }

}
