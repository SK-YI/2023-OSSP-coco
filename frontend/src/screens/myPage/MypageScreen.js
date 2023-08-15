import { Pressable, StyleSheet, View, Text } from 'react-native';
import UserProfile from '../../components/myPage/UserProfile';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native'; // 내비게이션 객체를 가져오기 위해 추가


const MyPageScreen = () => {
  const { bottom } = useSafeAreaInsets();
  const navigation = useNavigation(); // 내비게이션 객체를 가져옴


  return (
    <View style={{ paddingBottom: bottom, flex: 1 }}>
      <UserProfile
        userName={'닉네임'}
        userEmail={'User@email.com'}
      ></UserProfile>
      <View style={styles.MyPageMenuContainter}>
        <Text style={{ ...styles.MyPageTitle, paddingTop: 25}}>계정</Text>
        <Pressable
          onPress={() => navigation.navigate('계정 정보')}
        >
          <Text style={styles.MyPageMenu}>계정 정보</Text>
        </Pressable>
        <Pressable
          onPress={() => navigation.navigate('계정 정보')}
        >
          <Text style={styles.MyPageMenu}>로그아웃</Text>
        </Pressable>
        <Text style={styles.MyPageTitle}>커뮤니티</Text>
        <Pressable
          onPress={() => navigation.navigate('계정 정보')}
        >
          <Text style={styles.MyPageMenu}>내가 작성한 글</Text>
        </Pressable>
        <Pressable
          onPress={() => navigation.navigate('계정 정보')}
        >
          <Text style={styles.MyPageMenu}>내가 작성한 댓글</Text>
        </Pressable>
        <Text style={styles.MyPageTitle}>시설</Text>
        <Pressable
          onPress={() => navigation.navigate('계정 정보')}
        >
          <Text style={styles.MyPageMenu}>내가 좋아요한 시설</Text>
        </Pressable>
        <Pressable
          onPress={() => navigation.navigate('계정 정보')}
        >
          <Text style={styles.MyPageMenu}>내가 작성한 리뷰</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    backgroundColor: '#000',
    flex: 1
  },
  MyPageMenuContainter: {
    flex: 6,
    backgroundColor: '#fff',
    paddingHorizontal: 30,
    flexDirection: 'column',
  },
  MyPageTitle: {
    fontSize: 20,
    fontWeight: '700',
    paddingVertical:15
  },
  MyPageMenu: {
    fontSize: 18,
    paddingVertical:10
  }
});

export default MyPageScreen;
