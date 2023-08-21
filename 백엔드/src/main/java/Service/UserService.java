package Service;

import Data.DTO.JoinRequestDto;
import Data.DTO.LoginRequestDto;
import Data.DTO.TokenDto;
import Data.DTO.UserResponseDto;
import Data.Entity.User;
import Data.JwtConfig.SecurityUtil;
import Data.JwtConfig.TokenProvider;
import Data.Repository.UserRepository;
import Data.Type.UserRole;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder; // PasswordEncoder 추가
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;import org.springframework.transaction.annotation.Transactional;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final AuthenticationManagerBuilder managerBuilder;
    private final TokenProvider tokenProvider;

    public UserService(UserRepository userRepository, BCryptPasswordEncoder bCryptPasswordEncoder, AuthenticationManagerBuilder managerBuilder, TokenProvider tokenProvider) {
        this.userRepository = userRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
        this.managerBuilder = managerBuilder;
        this.tokenProvider = tokenProvider;
    }

    @Transactional
    public UserResponseDto getMyInfoBySecurity() {
        return new UserResponseDto(userRepository.findByLoginId(SecurityUtil.getCurrentMember()));
    }

    @Transactional
    public TokenDto login(LoginRequestDto requestDto) {
        UsernamePasswordAuthenticationToken authenticationToken = requestDto.toAuthentication();

        Authentication authentication = managerBuilder.getObject().authenticate(authenticationToken);

        return tokenProvider.generateTokenDto(authentication);
    }

    @Transactional
    public void join(JoinRequestDto userJoinDto) {
        userRepository.save(userJoinDto.toEntity(bCryptPasswordEncoder.encode(userJoinDto.getPassword()), UserRole.USER));
    }

    @Transactional
    public boolean checkLoginIdDuplicate(String username) {
        return userRepository.existsByLoginId(username);
    }

    @Transactional
    public boolean checkNicknameDuplicate(String nickname) {
        return userRepository.existsByNickname(nickname);
    }
}
