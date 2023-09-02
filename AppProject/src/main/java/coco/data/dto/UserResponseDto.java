package coco.data.dto;

import coco.data.entity.User;
import coco.data.type.Gender;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class UserResponseDto {
    private int userNumber;
    private String username;
    private String password;
    private String email;
    private String nickname;
    private int age;
    private String userType;

    private Gender gender;


    public UserResponseDto(User user) {
        userNumber = user.getUserNumber();
        username = user.getUsername();
        password = user.getPassword();
        email = user.getEmail();
        nickname = user.getNickname();
        age = user.getAge();
        userType = user.getUserType();
        gender = user.getGender();

    }
}
