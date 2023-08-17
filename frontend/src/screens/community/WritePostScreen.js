import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { PRIMARY, WHITE } from '../../colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';

// 추가 글자 수를 설정하는게 필요할까?? 필요하다면 작성중인 글자수 보여주기!
const MAX_TITLE_LENGTH = 30;
const MAX_TEXT_LENGTH = 60;

const WritePostScreen = () => {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  return (
    <View style={styles.container}>
      <View style={styles.inputTitleContainer}>
        <TextInput
          value={title}
          onChangeText={(title) => setTitle(title)}
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
          onChangeText={(text) => setText(text)}
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
      <View style={styles.inputTextContainer}>
        <Pressable style={styles.button}>
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
