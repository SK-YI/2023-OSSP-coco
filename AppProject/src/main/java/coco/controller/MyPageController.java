package coco.controller;

import coco.data.dto.*;
import coco.data.entity.*;
import coco.data.repository.PostReplyRepository;
import coco.data.repository.PostRepository;
import coco.data.repository.UserRepository;
import coco.service.CommunityService;
import coco.service.MyPageService;
import coco.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.webjars.NotFoundException;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/user")
public class MyPageController {
    private final MyPageService mypageService;
    private final UserRepository userRepository;
    private final PostRepository postRepository;
    private final PostReplyRepository postReplyRepository;

    @Autowired
    public MyPageController(MyPageService mypageService, UserRepository userRepository, PostRepository postRepository, PostReplyRepository postReplyRepository) {
        this.mypageService = mypageService;
        this.userRepository = userRepository;
        this.postRepository = postRepository;
        this.postReplyRepository = postReplyRepository;
    }

    @PostMapping // 회원 정보 조회
    public ResponseEntity<?> getUserByUsername(@RequestBody UsernameRequestDto requestDto) {
        try {
            String username = requestDto.getUsername();
            UserJoinDto userJoinDto = mypageService.getUserByUsername(username);
            if (userJoinDto == null) {
                return ResponseEntity.notFound().build();
            }
            return ResponseEntity.ok(userJoinDto);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("회원 정보 조회에 실패하였습니다.");
        }
    }

    @PutMapping("/{username}") //회원 정보 수정
    public ResponseEntity<String> updateUserProfile(@PathVariable String username,
                                                    @RequestBody UserJoinDto userJoinDto) {
        try {
            mypageService.updateUserProfile(username, userJoinDto);
            return ResponseEntity.ok("회원 정보 수정에 성공하였습니다.");
        } catch (NotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("회원 정보 수정에 실패하였습니다.");
        }
    }

    @DeleteMapping("/{username}") //회원 탈퇴 기능
    public ResponseEntity<String> deleteUser(@PathVariable String username) {
        try {
            mypageService.deleteUserByUsername(username);
            return ResponseEntity.ok("회원 탈퇴가 성공적으로 진행되었습니다.");
        } catch (NotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("회원 탈퇴에 실패하였습니다.");
        }
    }

    @GetMapping("/postlist")
    public ResponseEntity<List<PostDto>> getPostList(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        User user = userRepository.findByUsername(username);
        int userNumber = user.getUserNumber();

        List<Post> postList = postRepository.findAllByUserUserNumber(userNumber);
        List<PostDto> postDtos = postList.stream()
                .map(PostDto::new)
                .collect(Collectors.toList());
        return ResponseEntity.ok(postDtos);
    }

    @GetMapping("/commentlist") //내가 작성한 댓글이 달린 게시글 불러오기
    public ResponseEntity<List<PostDto>> getCommentList(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        User user = userRepository.findByUsername(username);
        int userNumber = user.getUserNumber();

        List<Post> postList = postRepository.findAllByPostReplyListUserUserNumber(userNumber);
        List<PostDto> postDtos = postList.stream()
                .map(PostDto::new)
                .collect(Collectors.toList());
        return ResponseEntity.ok(postDtos);

    }
}

