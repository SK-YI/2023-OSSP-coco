import { Pressable, StyleSheet, View, Text } from 'react-native';
import UserProfile from '../../components/myPage/UserProfile';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { URL } from '../../../env';
import axios from 'axios';
import { useUserContext } from '../../contexts/UserContext';

const MyPageScreen = () => {
  const { bottom } = useSafeAreaInsets();
  const navigation = useNavigation();
  const { token } = useUserContext();
  const [userInfo, setUserInfo] = useState(
  );

  const userInfoGetApi = async () => {
    try {
      const response = await axios.get(`${URL}/user/info`,
      {
        headers: {
          "accessToken": token,
        },
      }
      );
      console.log(response.data);
      setUserInfo(response.data);

    } catch (error) {
      console.error(error);
    }
  };

  const userDel = async (username) => {
    try {
        const response = await axios.delete(`${URL}/user/${username}`);
        console.log(response.data);
    } catch (error) {
        console.error(error);
    }
  }

  useEffect(() => {
    userInfoGetApi();
  }, []);

  

  return (
    <View style={{ paddingBottom: bottom, flex: 1 }}>
      <UserProfile
        userName={userInfo.username}
        userEmail={userInfo.email}
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
        <Pressable
          onPress={() =>{userDel(userInfo.username)}}
        >
          <Text style={styles.MyPageMenu}>탈퇴하기</Text>
        </Pressable>
        <Text style={styles.MyPageTitle}>커뮤니티</Text>
        <Pressable
          onPress={() => navigation.navigate('내가 작성한 글 리스트')}
        >
          <Text style={styles.MyPageMenu}>내가 작성한 글</Text>
        </Pressable>
        <Pressable
          onPress={() => navigation.navigate('내가 작성한 댓글 리스트')}
        >
          <Text style={styles.MyPageMenu}>내가 작성한 댓글</Text>
        </Pressable>
        <Text style={styles.MyPageTitle}>시설</Text>
        <Pressable
          onPress={() => navigation.navigate('내가 즐겨찾기한 시설')}
        >
          <Text style={styles.MyPageMenu}>내가 즐겨찾기한 시설</Text>
        </Pressable>
        <Pressable
          onPress={() => navigation.navigate('내가 작성한 리뷰')}
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
  },
  withdrawButton: {
    flex: 1
  },
  withdraw: {
    fontSize: 20
  }
});

export default MyPageScreen;
