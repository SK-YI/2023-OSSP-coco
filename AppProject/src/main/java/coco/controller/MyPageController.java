package coco.controller;

import coco.data.dto.UserJoinDto;
import coco.data.dto.UsernameRequestDto;
import coco.service.MyPageService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.webjars.NotFoundException;

@RestController
@RequestMapping("/user")
public class MyPageController {
    private final MyPageService mypageService;

    public MyPageController(MyPageService mypageService, MyPageService mypageService1) {
        this.mypageService = mypageService1;
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
}

