import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { GRAY } from '../../colors';

const MyPageDetailScreen = () => {
  const [nickname, setNickname] = useState('고구마멈멍');
  const [username, setUsername] = useState('gogumamummung');
  const [email, setEmail] = useState('goguma@gmail.com');
  const [disability, setDisability] = useState('신체적 장애 (외부 신체기능 장애)');
  const [joinDate, setJoinDate] = useState('2023/08/04');
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    setIsEditing(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>닉네임</Text>
      {isEditing ? (
        <TextInput
          style={styles.input}
          value={nickname}
          onChangeText={setNickname}
        />
      ) : (
        <Text style={styles.menuText}>{nickname}</Text>
      )}

      <Text style={styles.title}>아이디</Text>
      <Text style={styles.menuText}>{username}</Text>

      <Text style={styles.title}>이메일</Text>
      {isEditing ? (
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
        />
      ) : (
        <Text style={styles.menuText}>{email}</Text>
      )}

      <Text style={styles.title}>장애 종류</Text>
      {isEditing ? (
        <TextInput
          style={styles.input}
          value={disability}
          onChangeText={setDisability}
        />
      ) : (
        <Text style={styles.menuText}>{disability}</Text>
      )}

      <Text style={styles.title}>가입일</Text>
      <Text style={styles.menuText}>{joinDate}</Text>

      {/* 수정 버튼 및 저장 버튼 */}
      {isEditing ? (
        <TouchableOpacity style={styles.button} onPress={handleSave}>
          <Text style={styles.buttonText}>저장</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={styles.button}
          onPress={() => setIsEditing(true)}>
          <Text style={styles.buttonText}>수정</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    paddingHorizontal: 25,
    paddingTop: 15,
  },
  title: {
    fontSize: 23,
    fontWeight: '700',
    marginTop: 20,
  },
  menuText: {
    fontSize: 18,
    paddingVertical: 15,
    color: GRAY.DARK,
  },
  input: {
    fontSize: 18,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: GRAY.DARK,
    borderRadius: 5,
  },
  button: {
    backgroundColor: GRAY.DARK,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
});

export default MyPageDetailScreen;
