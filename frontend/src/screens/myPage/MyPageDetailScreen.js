import { View, Text, StyleSheet } from 'react-native';
import { GRAY } from '../../colors';

const MyPageDetailScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>닉네임</Text>
      <Text style={styles.Menu}>고구마멈멍</Text>
      <Text style={styles.title}>아이디</Text>
      <Text style={styles.Menu}>gogumamummung</Text>
      <Text style={styles.title}>이메일</Text>
      <Text style={styles.Menu}>goguma@gmail.com</Text>
      <Text style={styles.title}>장애 종류</Text>
      <Text style={styles.Menu}>신체적 장애 (외부 신체기능 장애)</Text>
      <Text style={styles.title}>가입일</Text>
      <Text style={styles.Menu}>2023/08/04</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    paddingHorizontal: 25,
    paddingTop: 15
  },
  title: {
    fontSize: 23,
    fontWeight: '700'
  },
  Menu: {
    fontSize: 18,
    paddingVertical: 15,
    color: GRAY.DARK
  }
});

export default MyPageDetailScreen;
