package coco.service;

import coco.config.SecurityUtil;
import coco.data.dto.UserJoinDto;
import coco.data.dto.UserResponseDto;
import coco.config.jwt.TokenProvider;
import coco.data.dto.TokenDto;
import coco.data.dto.UserRequestDto;
import coco.data.entity.User;
import coco.data.type.UserRole;
import coco.data.repository.UserRepository;
import io.jsonwebtoken.Claims;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final AuthenticationManagerBuilder managerBuilder;
    private final TokenProvider tokenProvider;

    public UserService(UserRepository userRepository,BCryptPasswordEncoder bCryptPasswordEncoder, AuthenticationManagerBuilder managerBuilder, TokenProvider tokenProvider) {
        this.userRepository = userRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
        this.managerBuilder = managerBuilder;
        this.tokenProvider = tokenProvider;
    }

    @Transactional
    public UserResponseDto getMyInfoBySecurity() {
        return new UserResponseDto(userRepository.findByUsername(SecurityUtil.getCurrentMember()));
    }

    @Transactional
    public TokenDto login(UserRequestDto requestDto) {

        UsernamePasswordAuthenticationToken authenticationToken = requestDto.toAuthentication();

        Authentication authentication = managerBuilder.getObject().authenticate(authenticationToken);

        return tokenProvider.generateTokenDto(authentication);
    }


    @Transactional
    public void join(UserJoinDto userJoinDto) {
        userRepository.save(userJoinDto.toEntity(bCryptPasswordEncoder.encode(userJoinDto.getPassword()), UserRole.USER));
    }

    @Transactional
    public boolean checkDuplicateId(String username) {
        return userRepository.existsByUsername(username);
    }

    @Transactional
    public boolean checkDuplicateNickname(String nickname) {
        return userRepository.existsByNickname(nickname);
    }
}



//    @Transactional
//    public void logout() { // 현재 사용자의 토큰 만료 시간을 조절하여 유효시간을 줄임
//        User currentUser = userRepository.findByUsername(SecurityUtil.getCurrentMember());
//
//        if (currentUser != null) {
//            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
//
//            if (authentication != null && authentication.getDetails() instanceof OAuth2AuthenticationDetails) {
//                OAuth2AuthenticationDetails authDetails = (OAuth2AuthenticationDetails) authentication.getDetails();
//                String token = authDetails.getTokenValue();
//                // 이제 'token' 변수에 사용자의 토큰이 들어있습니다.
//            }
//            Date expirationDate = new Date(); // 현재 사용자의 토큰 추출
//            // 현재 시간으로 설정 (즉시 만료)
//            TokenProvider.updateTokenExpiration(token, expirationDate);
//        }
//    }