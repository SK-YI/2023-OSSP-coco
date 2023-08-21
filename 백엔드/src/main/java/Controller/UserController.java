package Controller;

import Data.DTO.JoinRequestDto;
import Data.DTO.LoginRequestDto;
import Data.DTO.TokenDto;
import Data.DTO.UserResponseDto;
import Data.JwtConfig.JwtTokenUtil;
import Service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
public class UserController {

    private final UserService userService;
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/hello")
    public ResponseEntity<String> hello(){
        return ResponseEntity.ok("hello");
    }

    @PostMapping("/login")
    public ResponseEntity<TokenDto> login(@RequestBody LoginRequestDto requestDto) {
        return ResponseEntity.ok(userService.login(requestDto));
    }

    @GetMapping("/info")
    public ResponseEntity<UserResponseDto> getMyMemberInfo() {
        UserResponseDto myInfoBySecurity = userService.getMyInfoBySecurity();
        return ResponseEntity.ok(myInfoBySecurity);
        // return ResponseEntity.ok(memberService.getMyInfoBySecurity());
    }

    @PostMapping("/join")
    public ResponseEntity<String> signUp(@RequestBody JoinRequestDto userJoinDto) {
        userService.join(userJoinDto);
        return ResponseEntity.ok("회원가입 완료");
    }

    @PostMapping("/join/id")
    public ResponseEntity<Boolean> idCheck(@RequestBody LoginRequestDto usernameRequestDto) {
        boolean duplicateIdExist = userService.checkLoginIdDuplicate(usernameRequestDto.getLoginId());
        return ResponseEntity.ok(duplicateIdExist);
    }

    @PostMapping("/join/nickname")
    public ResponseEntity<Boolean> nicknameCheck(@RequestBody LoginRequestDto nicknameRequestDto) {
        boolean duplicateNicknameExist = userService.checkNicknameDuplicate(nicknameRequestDto.getNickname());
        return ResponseEntity.ok(duplicateNicknameExist);
    }
}