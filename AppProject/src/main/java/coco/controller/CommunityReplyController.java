package coco.controller;

import coco.data.dto.PostReplyDto;
import coco.data.dto.PostReplyRequestDto;
import coco.service.CommunityReplyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@CrossOrigin

@RestController
@RequestMapping("/community/{postId}")
public class CommunityReplyController {
    @Autowired
    private CommunityReplyService communityReplyService;

    // 댓글 작성 - 완료
    @PostMapping("/reply")
    public ResponseEntity<PostReplyDto> createReply(@RequestBody PostReplyRequestDto PostReplyRequestDto, @PathVariable int postId){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.getPrincipal() != "anonymousUser") {
            return ResponseEntity.ok(communityReplyService.createReply(PostReplyRequestDto,postId,authentication));
        }
        return ResponseEntity.ok(null);
    }
    // 댓글 삭제 - 완료
    @DeleteMapping("/reply/{replyId}")
    public ResponseEntity<Boolean> delete(@PathVariable int replyId,@PathVariable int postId){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.getPrincipal() != "anonymousUser") {
            return ResponseEntity.ok(communityReplyService.deleteReply(replyId,postId,authentication));
        }
        return ResponseEntity.ok(false);
    }
    // 댓글 수정 - 완료
    @PutMapping("/reply/{replyId}")
    public ResponseEntity<PostReplyDto> editReply(@PathVariable int replyId,@RequestBody PostReplyRequestDto postReplyRequestDto){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if(authentication != null && authentication.getPrincipal() != "anonymousUser"){
            return ResponseEntity.ok(communityReplyService.editReply(replyId,postReplyRequestDto,authentication));
        }
        return ResponseEntity.notFound().build();
    }


    
}

