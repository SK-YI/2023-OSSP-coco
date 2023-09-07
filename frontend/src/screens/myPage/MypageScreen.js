import { Pressable, StyleSheet, View, Text } from 'react-native';
import UserProfile from '../../components/myPage/UserProfile';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { URL } from '../../../env';
import { useUserContext } from '../../contexts/UserContext';


const MyPageScreen = () => {
  const dummy = [
    {
      userNumber: 14,
      username: 'sk3',
      password: '$2a$10$6sr/CkYkGFH0aq8ZBtyPu.m0Y9zUp84UZyG9QteS3K5ZgD2hqm.Be',
      email: 'sk@1324',
      nickname: 'sk',
      age: 0,
      userType: null,
      gender: '여자',
    },
  ];
  const { bottom } = useSafeAreaInsets();
  const navigation = useNavigation();
  const [token] = useUserContext();
  const [userInfo, setUserInfo] = useState(dummy);
  const [, setToken] = useUserContext();


  const userInfoGetApi = () => {
    console.log(token);
    fetch(`${URL}/user/info`, {
      method: 'GET', //메소드 지정
      headers: {
        //데이터 타입 지정
        'Content-Type': 'application/json; charset=utf-8',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json()) // 리턴값이 있으면 리턴값에 맞는 req 지정
      .then((res) => {
        console.log(res); // 리턴값에 대한 처리
        // 성공하면!
        setUserInfo(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };


  /* const userDel = async (username) => {
    try {
        const response = await axios.delete(`${URL}/user/${username}`);
        console.log(response.data);
    } catch (error) {
        console.error(error);
    }
  } */

  useEffect(() => {
    userInfoGetApi();
  }, []);

  const logoutGet = async () => {
    try {
      const response = await fetch(`${URL}/user/logout`, {
        method: 'GET', 
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          Authorization: `Bearer ${token}`, 
        },
      });
  
      if (response.ok) {
        // 로그아웃 성공
        setToken(''); //토큰 비우기
        console.log('로그아웃 성공')
        // 
      } else {
        console.error('로그아웃 실패:', response.status);
      }
    } catch (error) {
      console.error('로그아웃 오류:', error);
    }
  };

  const handleLogout = async () => {
    // 로그아웃 API 호출
    await logoutGet();
  };

  return (
    <View style={{ paddingBottom: bottom, flex: 1 }}>
      <UserProfile
        userName={userInfo.nickname}
        userEmail={userInfo.email}
      ></UserProfile>
      <View style={styles.MyPageMenuContainter}>
        <Text style={{ ...styles.MyPageTitle, paddingTop: 25 }}>계정</Text>
        <Pressable
          onPress={() =>
            navigation.navigate('계정 정보', { userInfo: userInfo })
          }
        >
          <Text style={styles.MyPageMenu}>계정 정보</Text>
        </Pressable>
        
        <Pressable onPress={() => {handleLogout}}>
          <Text style={styles.MyPageMenu}>로그아웃</Text>
        </Pressable>
        <Pressable
        /* onPress={() => {
            userDel(userInfo.username);
          }} */
        >
          <Text style={styles.MyPageMenu}>탈퇴하기</Text>
        </Pressable>

        <Text style={styles.MyPageTitle}>커뮤니티</Text>
        <Pressable onPress={() => navigation.navigate('내가 작성한 글 리스트')}>
          <Text style={styles.MyPageMenu}>내가 작성한 글</Text>
        </Pressable>

        <Pressable
          onPress={() => navigation.navigate('내가 작성한 댓글 리스트')}>
          <Text style={styles.MyPageMenu}>내가 작성한 댓글</Text>
        </Pressable>

        <Text style={styles.MyPageTitle}>시설</Text>
        <Pressable onPress={() => navigation.navigate('내가 즐겨찾기한 시설')}>
          <Text style={styles.MyPageMenu}>내가 즐겨찾기한 시설</Text>
        </Pressable>

        <Pressable onPress={() => navigation.navigate('내가 작성한 리뷰')}>
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
    flex: 1,
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
    paddingVertical: 15,
  },
  MyPageMenu: {
    fontSize: 18,
    paddingVertical: 10,
  },
  withdrawButton: {
    flex: 1,
  },
  withdraw: {
    fontSize: 20,
  },
});

export default MyPageScreen;
