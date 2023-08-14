package Data.IdClass;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import java.io.Serializable;

@EqualsAndHashCode
@NoArgsConstructor
public class UserLikePostId implements Serializable {
    private int user;
    private int post;
}
