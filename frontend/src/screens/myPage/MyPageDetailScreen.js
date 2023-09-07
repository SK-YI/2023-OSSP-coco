import { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { GRAY } from '../../colors';
import { useRoute } from '@react-navigation/native';
import { URL } from '../../../env';
import axios from 'axios';
import { useUserContext } from '../../contexts/UserContext';


const MyPageDetailScreen = () => {
  const route = useRoute();
  const { userInfo } = route.params;
  const [token] = useUserContext();

  const handleSave = () => {
    setIsEditing(false);
  };

  const userInfoPutApi = async (data) => {
    try {
      const response = await axios.put(`${URL}/user/info/${username}`, data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const [nickname, setNickname] = useState(userInfo.nickname);
  const [username, setUsername] = useState(userInfo.username);
  const [email, setEmail] = useState(userInfo.email);
  const [disability, setDisability] = useState(userInfo.type);
  const [age, setAge] = useState(userInfo.age);
  const [isEditing, setIsEditing] = useState(false);

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
        <Text style={styles.menuText}>{userInfo.nickname}</Text>
      )}

      <Text style={styles.title}>아이디</Text>
      <Text style={styles.menuText}>{userInfo.username}</Text>

      <Text style={styles.title}>이메일</Text>
      {isEditing ? (
        <TextInput
          style={styles.input}
          value={userInfo.email}
          onChangeText={setEmail}
        />
      ) : (
        <Text style={styles.menuText}>{userInfo.email}</Text>
      )}

      <Text style={styles.title}>장애 종류</Text>
      {isEditing ? (
        <TextInput
          style={styles.input}
          value={userInfo.type}
          onChangeText={setDisability}
        />
      ) : (
        <Text style={styles.menuText}>{userInfo.type}</Text>
      )}

      <Text style={styles.title}>나이</Text>
      <Text style={styles.menuText}>{userInfo.age}</Text>

      {/* 수정 버튼 및 저장 버튼 */}
      {isEditing ? (
        <TouchableOpacity style={styles.button} onPress={handleSave}>
          <Text style={styles.buttonText}>저장</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={styles.button}
          onPress={() => setIsEditing(true)}
        >
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
    marginVertical: 3,
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
