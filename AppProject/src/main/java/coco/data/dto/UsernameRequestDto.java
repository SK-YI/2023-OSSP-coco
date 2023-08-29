package coco.data.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UsernameRequestDto {
        private String username;

        public UsernameRequestDto() {
        }
        public UsernameRequestDto(String username) {
                this.username = username;
        }

        public String getUsername() {
                return username;
        }

        public void setUsername(String username) {
                this.username = username;
        }

}
