package coco.data.dto;

import coco.data.entity.User;
import coco.data.type.UserRole;
import coco.data.type.type;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor
public class UserJoinDto {
    private String username;
    private String password;
    private String email;
    private String nickname;
    private int age;

    public User toEntity(String encryptPassword, UserRole role) {

        return User.builder()
                .username(this.getUsername())
                .password(encryptPassword)
                .email(this.getEmail())
                .nickname(this.getNickname())
                .age(this.getAge())
                .role(role)
                .build();
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setNickname(String nickname) {
        this.nickname = nickname;
    }

    public void setAge(int age) {this.age = age;}

}
