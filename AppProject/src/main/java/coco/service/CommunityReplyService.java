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
    public PostReplyDto createReply(PostReplyRequestDto postReplyRequestDto, int postId , Authentication authentication){
        String content=postReplyRequestDto.getContent();
        User user=userRepository.findByUsername(authentication.getName());

        PostReply PostReply=new PostReply();
        PostReply.setCreatedDate(new Timestamp(System.currentTimeMillis()));
        PostReply.setUser(user);
        PostReply.setContent(content);
        PostReply.setPost(PostRepository.findById(postId));

        PostReply saveReply=PostReplyRepository.save(PostReply);
        return new PostReplyDto(saveReply,postId,user.getUserNumber());
    }

    //댓글 삭제
    @Transactional
    public Boolean deleteReply(int replyId,int postId,Authentication authentication){
        PostReply postReply=PostReplyRepository.findById(replyId);
        if(postId==postReply.getPost().getId()&&postReply.getUser().getUserNumber()==userRepository.findByUsername(authentication.getName()).getUserNumber()){
            PostReplyRepository.deleteById(replyId);
            return true;
        }
        return false;
    }

    @Transactional
    public PostReplyDto editReply(int replyId,PostReplyRequestDto postReplyRequestDto,Authentication authentication){
        PostReply postReply=PostReplyRepository.findById(replyId);
        if(postReply.getUser().getUserNumber()!=userRepository.findByUsername(authentication.getName()).getUserNumber()){
            return null;
        }

        postReply.setContent(postReplyRequestDto.getContent());
        PostReplyRepository.save(postReply);
        return new PostReplyDto(postReply);
    }

    

}
