package coco.data.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TokenDto {
    private String grantType;
    private String accessToken;
    private String refreshToken;
    private Long accessTokenExpiresIn;
    private String Key;
//
//    public AccessToken toEntity (String key, String value) {
//        return AccessToken.builder()
//                .key(this.getKey())
//                .value(this.getAccessToken())
//                .build();
//        }
//    }
}