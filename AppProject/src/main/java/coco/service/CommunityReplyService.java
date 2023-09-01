package coco.service;

import coco.data.dto.PostReplyDto;
import coco.data.dto.PostReplyRequestDto;
import coco.data.entity.PostReply;
import coco.data.entity.User;
import coco.data.repository.UserRepository;
import coco.data.repository.PostRepository;
import coco.data.repository.PostReplyRepository;


import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;


@Service
public class CommunityReplyService {
    @Autowired
    private PostReplyRepository PostReplyRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PostRepository PostRepository;

    //댓글 작성
    @Transactional
    public PostReplyDto createReply(PostReplyRequestDto PostReplyRequestDto, int Post_id , Authentication authentication){
        String content=PostReplyRequestDto.getContent();
        User user=userRepository.findByUsername(authentication.getName());
        PostReply PostReply=new PostReply();
        PostReply.setCreatedDate(new Timestamp(System.currentTimeMillis()));
        PostReply.setUser(user);
        PostReply.setContent(content);
        PostReply.setPost(PostRepository.findById(Post_id));
        PostReply saveReply=PostReplyRepository.save(PostReply);
        return new PostReplyDto(saveReply,Post_id,user.getUserNumber());
    }

    //댓글 삭제
    @Transactional
    public String deleteReply(int replyId,int PostId,Authentication authentication){
        PostReply PostReply=PostReplyRepository.findById(replyId);
        if(PostId==PostReply.getPost().getId()&&PostReply.getUser().getUserNumber()==userRepository.findByUsername(authentication.getName()).getUserNumber()){
            PostReplyRepository.deleteById(replyId);
            return "success";
        }
        return "fail";
    }

    @Transactional
    public PostReplyDto editReply(int replyId,PostReplyRequestDto PostReplyRequestDto,Authentication authentication){
        PostReply PostReply=PostReplyRepository.findById(replyId);
        if(PostReply.getUser().getUserNumber()!=userRepository.findByUsername(authentication.getName()).getUserNumber()){
            return null;
        }

        PostReply.setContent(PostReplyRequestDto.getContent());
        PostReplyRepository.save(PostReply);
        return new PostReplyDto(PostReply);
    }

    

}
