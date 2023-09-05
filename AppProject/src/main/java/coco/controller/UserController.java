package coco.controller;

import coco.data.dto.*;
import coco.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
public class UserController {

    private final UserService userService;
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/user/login")
    public ResponseEntity<TokenDto> login(@RequestBody UserRequestDto requestDto) {
        return ResponseEntity.ok(userService.login(requestDto));
    }

    @GetMapping("/user/info")
    public ResponseEntity<UserResponseDto> getMyMemberInfo() {
        UserResponseDto myInfoBySecurity = userService.getMyInfoBySecurity();
        return ResponseEntity.ok(myInfoBySecurity);
        // return ResponseEntity.ok(memberService.getMyInfoBySecurity());
    }

    @PostMapping("/user/join")
    public ResponseEntity<String> signUp(@RequestBody UserJoinDto userJoinDto) {
        userService.join(userJoinDto);
        return ResponseEntity.ok("회원가입 완료");
    }

    @PostMapping("/user/join/username")
    public ResponseEntity<Boolean> idCheck(@RequestBody UserRequestDto usernameRequestDto) {
        boolean duplicateIdExist = userService.checkDuplicateId(usernameRequestDto.getUsername());
        return ResponseEntity.ok(duplicateIdExist);
    }

    @PostMapping("/user/join/nickname")
    public ResponseEntity<Boolean> nicknameCheck(@RequestBody NicknameRequestDto nicknameRequestDto) {
        boolean duplicateNicknameExist = userService.checkDuplicateNickname(nicknameRequestDto.getNickname());
        return ResponseEntity.ok(duplicateNicknameExist);
    }

    @GetMapping("/user/logout")
    public ResponseEntity<String> logoutPage(HttpServletRequest request, HttpServletResponse response) {
        new SecurityContextLogoutHandler().logout(request, response, SecurityContextHolder.getContext().getAuthentication());
        return ResponseEntity.ok("로그아웃 완료");
    }
}
