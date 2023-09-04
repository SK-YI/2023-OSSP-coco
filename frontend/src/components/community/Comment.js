import {
  Alert,
  Dimensions,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import PropTypes from 'prop-types';
import { PRIMARY } from '../../colors';
import axios from 'axios';
import { useUserContext } from '../../contexts/UserContext';
import { useState } from 'react';

const Comment = ({ data, postId, setRerendering, rerendering }) => {
  const { token } = useUserContext();

  const windowWidth = Dimensions.get('window').width;

  const [isWrite, setIsWrite] = useState(false);
  const [text, setText] = useState(data.content);

  const deleteCommentApi = async () => {
    try {
      const response = await axios.delete(
        `${URL}/community/${postId}/reply/${data.id}`,
        {
          headers: {
            accessToken: token,
          },
        }
      );
      console.log(response.data);
      // 실패하면 ..?
      // 성공하면! 다시 리렌더링
      setRerendering(!rerendering);
    } catch (error) {
      console.error(error);
    }
  };

  const askDelete = () => {
    if (isWrite) {
      setIsWrite(false);
      setText(data.content);
      return;
    }
    Alert.alert('댓글 삭제', '댓글을 정말로 삭제하시겠습니까?', [
      {
        text: '확인',
        onPress: () => {
          deleteCommentApi();
        },
      },
      {
        text: '취소',
      },
    ]);
  };

  const modifyCommentApi = async () => {
    const data = {
      content: text,
    };

    try {
      const response = await axios.put(
        `${URL}/community/${postId}/reply/${data.id}`,
        data,
        {
          headers: {
            accessToken: token,
          },
        }
      );
      console.log(response.data);
      setIsWrite(false);
      // 성공하면 리렌더링
      setRerendering(!rerendering);
    } catch (error) {
      console.error(error);
    }
  };

  const modifyComment = () => {
    if (!isWrite) {
      Alert.alert('댓글 수정', '댓글을 정말로 수정하시겠습니까?', [
        {
          text: '확인',
          onPress: () => {
            setIsWrite(true);
          },
        },
        {
          text: '취소',
        },
      ]);
    } else {
      if (!text) {
        Alert.alert('댓글 수정 실패', '댓글을 작성해주세요.', [
          {
            text: '확인',
          },
        ]);
      } else {
        // 댓글 수정 API
        modifyCommentApi();
      }
    }
  };

  return (
    <View style={[styles.container, { width: windowWidth - 50 }]}>
      <View style={styles.textContainer}>
        <View style={styles.topContainer}>
          <Text style={styles.nickname}>{data.nickname}</Text>
          {data.myReply && (
            <View style={styles.buttonContainer}>
              <Pressable
                style={styles.button}
                onPress={modifyComment}
                hitSlop={10}
              >
                <Text>{isWrite ? '저장' : '수정'}</Text>
              </Pressable>
              <Text>|</Text>
              <Pressable style={styles.button} onPress={askDelete} hitSlop={10}>
                <Text>{isWrite ? '취소' : '삭제'}</Text>
              </Pressable>
            </View>
          )}
        </View>
        {isWrite ? (
          <TextInput
            style={styles.modifycontent}
            value={text}
            onChangeText={(text) => setText(text.trim())}
            multiline={true}
          />
        ) : (
          <Text style={styles.content}>{data.content}</Text>
        )}
        <Text style={styles.date}>{data.createdDate}</Text>
      </View>
    </View>
  );
};

Comment.propTypes = {
  data: PropTypes.object,
  postId: PropTypes.number,
  setRerendering: PropTypes.func,
  rerendering: PropTypes.bool,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '80%',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  textContainer: {
    flexDirection: 'column',
    width: '115%',
  },
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    paddingHorizontal: 5,
  },
  nickname: {
    fontSize: 20,
    lineHeight: 25,
    fontWeight: '700',
  },
  modifycontent: {
    marginBottom: 5,
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderColor: PRIMARY.DARK,
    fontSize: 15,
    lineHeight: 25,
  },
  content: {
    fontSize: 15,
    lineHeight: 25,
  },
  explainContainer: {
    flexDirection: 'row',
    paddingVertical: 5,
  },
  date: {
    fontSize: 15,
    lineHeight: 20,
    color: PRIMARY.DARK,
  },
});

export default Comment;
