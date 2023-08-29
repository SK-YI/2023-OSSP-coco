package coco.service;

import coco.data.dto.UserJoinDto;
import coco.data.entity.User;
import coco.data.repository.UserRepository;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.webjars.NotFoundException;

@Component
@Service
public class MyPageService {
    private final UserRepository userRepository;

    public MyPageService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public UserJoinDto getUserByUsername(String username) {
        User user = userRepository.findByUsername(username);
        if (user == null) {
            return null;
        }
        UserJoinDto userJoinDto = new UserJoinDto();
        userJoinDto.setUsername(user.getUsername());
        userJoinDto.setPassword(user.getPassword());
        userJoinDto.setEmail(user.getEmail());
        userJoinDto.setNickname(user.getNickname());
        return userJoinDto;
    }
    public UserJoinDto updateUserProfile(String username, UserJoinDto userJoinDto) {
        User user = userRepository.findByUsername(username);

        if (user == null) {
            throw new NotFoundException("User not found");
        }

        user.setUsername(userJoinDto.getUsername());
        user.setPassword(userJoinDto.getPassword());
        user.setEmail(userJoinDto.getEmail());
        user.setNickname(userJoinDto.getNickname());
        userRepository.save(user);

        return userJoinDto;
    }

    public void deleteUserByUsername(String username) {
        User user = userRepository.findByUsername(username);
        if (user != null) {
            userRepository.delete(user);
        } else {
            throw new IllegalArgumentException("User not found.");
        }
    }
}

