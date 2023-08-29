package coco.data.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@Entity
public class RefreshToken {

    @Id
    @Column(name = "rt_key")
    private String key;

    @Column(name = "rt_value")
    private String value;

    @Builder
    public RefreshToken(String key, String value) {
        this.key = key;
        this.value = value;
    }
//@Id
//    private String refreshToken;
//    private Long memberId;
//
//    public RefreshToken(final String refreshToken, final Long memberId) {
//        this.refreshToken = refreshToken;
//        this.memberId = memberId;
//    }
//
//    public String getRefreshToken() {
//        return refreshToken;
//    }
//
//    public Long getMemberId() {
//        return memberId;
//    }
}