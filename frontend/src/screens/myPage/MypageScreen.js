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
        <Pressable
          onPress={() => navigation.navigate('계정 정보')}
        >
          <Text>계정 정보</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    backgroundColor: '#000',
  },
  MyPageMenuContainter: {
    flex: 6,
    backgroundColor: '#fff',
  },
  MyPageMenu: {
    
  }
});

export default MyPageScreen;
