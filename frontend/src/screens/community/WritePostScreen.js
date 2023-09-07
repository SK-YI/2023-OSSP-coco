import { useLayoutEffect, useState } from 'react';
import {
  Alert,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { PRIMARY, WHITE } from '../../colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import WriteSaveButton from '../../components/community/WriteSaveButton';
import * as ImagePicker from 'expo-image-picker';
// import axios from 'axios';
import { useUserContext } from '../../contexts/UserContext';
import { URL } from '../../../env';

// 추가 글자 수를 설정하는게 필요할까?? 필요하다면 작성중인 글자수 보여주기!
const MAX_TITLE_LENGTH = 30;
const MAX_TEXT_LENGTH = 60;

const WritePostScreen = () => {
  const [token] = useUserContext();
  const navigation = useNavigation();
  // const { navigate } = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <WriteSaveButton onPress={onSubmit} />,
    });
  });

  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [image, setImage] = useState([]);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      // allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      allowsMultipleSelection: true,
    });

    //console.log(result); 에러 발생하니 주의하자!

    if (result.assets[0].uri) {
      setImage(result.assets);
    }
  };

  const writePostApi = () => {
    const data = {
      title: title,
      content: text,
    };
    // console.log(data);
    let formData = new FormData();
    image.length > 0 && image.map((v) => formData.append('files', v));
    formData.append('postRequestDto', JSON.stringify(data));
    console.log(token);
    console.log(formData);
    fetch(`${URL}/community`, {
      method: 'POST', //메소드 지정
      headers: {
        //데이터 타입 지정
        'Content-Type': 'application/json; charset=utf-8',
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    })
      .then((res) => res.json()) // 리턴값이 있으면 리턴값에 맞는 req 지정
      .then((res) => {
        console.log(res); // 리턴값에 대한 처리
        // 성공하면!
        navigation.navigate('목록');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // const writePostApi = async () => {
  //   const data = {
  //     title: title,
  //     content: text,
  //   };

  //   try {
  //     const response = await axios.post(`${URL}/community`, data, {
  //       headers: {
  //         accessToken: token,
  //       },
  //     });
  //     console.log(response.data);
  //     // 성공하면 다시 게시글 목록 페이지로 이동하기!
  //     navigate();
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const onSubmit = () => {
    if (!text || !title) {
      Alert.alert('게시글 등록 실패', '제목과 내용을 입력해주세요.', [
        { text: '확인', onPress: () => {} },
      ]);
    } else {
      // 게시글 등록 api 호출
      writePostApi('목록');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputTitleContainer}>
        <TextInput
          value={title}
          onChangeText={(title) => setTitle(title.trim())}
          style={styles.inputTitle}
          placeholder={'게시글의 제목을 입력해주세요.'}
          maxLength={MAX_TITLE_LENGTH}
          returnKeyType={'done'}
          autoCapitalize={'none'}
          autoCorrect={false}
          textContentType={'none'}
          keyboardAppearance={'light'}
          blurOnSubmit={true}
        />
      </View>
      <View style={styles.inputTextContainer}>
        <TextInput
          value={text}
          onChangeText={(text) => setText(text.trim())}
          style={styles.inputText}
          placeholder={'게시글의 내용을 작성해주세요.'}
          maxLength={MAX_TEXT_LENGTH}
          returnKeyType={'default'}
          autoCapitalize={'none'}
          autoCorrect={false}
          textContentType={'none'}
          keyboardAppearance={'light'}
          multiline={true}
          blurOnSubmit={true}
        />
      </View>
      <View style={styles.imageContainer}>
        {/* {image && (
          <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
        )} */}
        <ScrollView horizontal={true}>
          {image &&
            image.map((item, index) => (
              <Image
                key={index}
                source={{ uri: item.uri }}
                style={styles.image}
              />
            ))}
        </ScrollView>
      </View>
      <View style={styles.inputTextContainer}>
        <Pressable style={styles.button} onPress={pickImage} hitSlop={10}>
          <MaterialCommunityIcons
            style={styles.icon}
            name={'folder-multiple-image'}
            size={30}
          />
          <Text style={styles.buttonText}>사진 첨부하기</Text>
        </Pressable>
      </View>
    </View>
  );
};

WritePostScreen.propTypes = {};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start', // flex-start로 바꾸고 위에 margin 주기!
    alignItems: 'center',
    backgroundColor: WHITE,
  },
  inputTitleContainer: {
    width: '90%',
    borderBottomWidth: 1,
  },
  inputTitle: {
    fontSize: 25,
    lineHeight: 30,
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  inputTextContainer: {
    width: '90%',
    marginTop: 10,
    marginBottom: 50,
  },
  inputText: {
    minHeight: 200,
    fontSize: 25,
    lineHeight: 30,
    paddingVertical: 15,
    paddingHorizontal: 10,
    textAlignVertical: 'top', // 안드로이드에서 글자가 중앙에 위치하는 문제를 해결
  },
  imageContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  image: {
    marginHorizontal: 5,
    width: 150,
    height: 150,
  },
  buttonContainer: {
    justifyContent: 'flex-start',
  },
  button: {
    padding: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-start',
    borderRadius: 20,
    backgroundColor: PRIMARY.DARK,
  },
  buttonText: {
    paddingBottom: 2,
    color: 'white',
    fontSize: 20,
  },
  icon: {
    paddingRight: 10,
    color: 'white',
  },
});

export default WritePostScreen;
