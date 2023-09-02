import {
  Alert,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { GRAY, PRIMARY, WHITE } from '../../colors';
import PropTypes from 'prop-types';
import Comment from '../../components/community/Comment';
import { useEffect, useState } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import axios from 'axios';
import { useUserContext } from '../../contexts/UserContext';

// 더미데이터
const post = {
  id: 1,
  title: '제목1',
  content: '내용1~~~~~',
  createdDate: '22.02.02',
  nickname: '닉네임1',
  userLikePost: false,
  liked: 0,
  commentNumber: 0,
  photo: null,
  postReplyList: [
    {
      id: 1,
      nickname: '닉네임11',
      content: '내용11',
      createdDate: '22.01.01',
    },
    {
      id: 2,
      nickname: '닉네임22',
      content: '내용22',
      createdDate: '22.01.01',
    },
    {
      id: 3,
      nickname: '닉네임33',
      content: '내용33',
      createdDate: '22.01.01',
    },
  ],
};

const PostScreen = ({ route }) => {
  const { token } = useUserContext();

  const [postData, setPostData] = useState(post);

  const [text, setText] = useState('');
  const [like, setLike] = useState(false);
  const [commentWrited, setCommentWrited] = useState(false);

  const getPostApi = async (postId) => {
    try {
      const response = await axios.get(`${URL}/community/${postId}`, {
        headers: {
          accessToken: token,
        },
      });
      console.log(response.data);
      // 실패하면 ..?
      // 성공하면!
      setPostData(response.data);
      setLike(response.data.userLikePost);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    console.log(route.params.postId);
    getPostApi(route.params.postId);
  }, [route.params.postId, commentWrited]);

  const writeCommentApi = async (postId) => {
    const data = {
      content: text,
    };

    try {
      const response = await axios.post(
        `${URL}/community/${postId}/reply`,
        data,
        {
          headers: {
            accessToken: token,
          },
        }
      );
      console.log(response.data);
      // 실패하면 ..?
      // 성공하면! 다시 리렌더링
      setCommentWrited(true);
    } catch (error) {
      console.error(error);
    }
  };

  const onSubmit = () => {
    if (!text) {
      Alert.alert('댓글 등록 실패', '댓글을 입력해주세요.', [
        { text: '확인', onPress: () => {} },
      ]);
    } else {
      // 댓글 등록 api 호출
      writeCommentApi();
    }
  };

  const onClickLike = () => {
    setLike(!like);
    // 좋아요 api 호출
  };

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.commentContainer}
        data={postData.postReplyList}
        renderItem={({ item }) => <Comment data={item} />}
        ItemSeparatorComponent={() => <View style={styles.separator}></View>}
        ListHeaderComponent={
          <View style={styles.postContainer}>
            <Text style={styles.nickname}>{postData.title}</Text>
            <View style={styles.explainContainer}>
              <Text style={styles.explain}>{postData.createdDate}</Text>
              <Text style={styles.explain}>|</Text>
              <Text style={styles.explain}>{postData.nickname}</Text>
            </View>
            <View style={styles.imageContainer}>
              <Image
                source={require('../../../assets/comap.png')}
                style={styles.image}
                // resizeMode={'cover'}
              />
            </View>
            <Text style={styles.content}>{postData.content}</Text>
            <Pressable style={styles.button} onPress={onClickLike} hitSlop={10}>
              <Text style={styles.buttonText}>좋아요</Text>
              {like ? (
                <MaterialCommunityIcons
                  style={styles.icon}
                  name={'cards-heart'}
                  size={25}
                />
              ) : (
                <MaterialCommunityIcons
                  style={styles.icon}
                  name={'cards-heart-outline'}
                  size={25}
                />
              )}
            </Pressable>
          </View>
        }
      />
      <View style={styles.searchContainer}>
        <TextInput
          value={text}
          onChangeText={(text) => setText(text.trim())}
          style={styles.search}
          placeholder={'댓글을 작성해주세요.'}
          returnKeyType={'done'}
          autoCapitalize={'none'}
          autoCorrect={false}
          textContentType={'none'}
          keyboardAppearance={'light'}
          blurOnSubmit={true}
          multiline
          onSubmitEditing={onSubmit}
        />
        <Pressable style={styles.searchButton} onPress={onSubmit}>
          <Text style={styles.searchButtonText}>등록</Text>
        </Pressable>
      </View>
    </View>
  );
};

PostScreen.propTypes = {
  route: PropTypes.object,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: WHITE,
  },
  postContainer: {
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    paddingTop: 10,
    marginVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: GRAY.DEFAULT,
  },
  nickname: {
    paddingVertical: 5,
    fontSize: 25,
    lineHeight: 30,
    fontWeight: '700',
  },
  explainContainer: {
    flexDirection: 'row',
  },
  explain: {
    paddingVertical: 5,
    paddingRight: 5,
    fontSize: 15,
    lineHeight: 20,
    color: PRIMARY.DARK,
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  image: {
    margin: 10,
    width: 300,
    height: 300,
    borderWidth: 1, // 지워
    borderColor: 'black', // 지워
    borderRadius: 10,
  },
  content: {
    paddingVertical: 5,
    fontSize: 20,
    lineHeight: 25,
  },
  button: {
    flexDirection: 'row',
    marginVertical: 20,
    padding: 10,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: PRIMARY.DARK,
  },
  icon: {
    color: 'white',
    paddingLeft: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    lineHeight: 25,
  },
  separator: {
    marginVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: GRAY.DEFAULT,
  },
  commentContainer: {
    width: '100%',
    borderTopWidth: 1,
    borderTopColor: GRAY.DEFAULT,
  },
  searchContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: GRAY.DEFAULT,
  },
  search: {
    width: '80%',
    padding: 10,
    borderRadius: 20,
    borderColor: PRIMARY.DEFAULT,
    borderWidth: 2,
    fontSize: 20,
    lineHeight: 25,
  },
  searchButton: {
    padding: 10,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: PRIMARY.DARK,
  },
  searchButtonText: {
    color: 'white',
    fontSize: 18,
    lineHeight: 25,
  },
});

export default PostScreen;
