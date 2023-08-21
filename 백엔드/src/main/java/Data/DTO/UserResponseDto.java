package Data.DTO;

import Data.Entity.User;
import Data.Type.UserRole;
import Data.Type.type;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.stream.Collectors;

@Getter
@NoArgsConstructor
public class UserResponseDto {
    private int userNumber;

    private String loginId;

    private String password;

    private String name;

    private int age;

    private String email;

    private String nickname;

    private type userType;

    private UserRole role; // 역할 매핑 추가

    public UserResponseDto(User user) {
        userNumber = user.getUserNumber();
        loginId = user.getLoginId();
        email = user.getEmail();
        nickname = user.getNickname();
        userType = user.getUserType();
        role = user.getRole();
    }
}