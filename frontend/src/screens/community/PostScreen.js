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
import { URL } from '../../../env';

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
      myReply: false,
    },
    {
      id: 2,
      nickname: '닉네임22',
      content: '내용22',
      createdDate: '22.01.01',
      myReply: true,
    },
    {
      id: 3,
      nickname: '닉네임33',
      content: '내용33',
      createdDate: '22.01.01',
      myReply: true,
    },
  ],
};

const PostScreen = ({ route }) => {
  const [token] = useUserContext();

  const [postData, setPostData] = useState();

  useEffect(() => {
    console.log(post.user);
  }, [post.user]);

  const [text, setText] = useState('');
  const [like, setLike] = useState(false);
  const [rerendering, setRerendering] = useState(false);

  const getPostApi = (postId) => {
    fetch(`${URL}/community/${postId}`, {
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
        setPostData(res);
        setLike(res.userLikePost);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    console.log(route.params.post.id);
    getPostApi(route.params.post.id);
  }, [route.params.post.id, rerendering]);

  const writeCommentApi = (postId) => {
    const data = {
      content: text,
    };
    fetch(`${URL}/community/${postId}/reply`, {
      method: 'POST', //메소드 지정
      headers: {
        //데이터 타입 지정
        'Content-Type': 'application/json; charset=utf-8',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json()) // 리턴값이 있으면 리턴값에 맞는 req 지정
      .then((res) => {
        console.log(res); // 리턴값에 대한 처리
        // 성공하면!
        res && setRerendering(!rerendering);
        res && setText('');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // const writeCommentApi = async (postId) => {
  //   const data = {
  //     content: text,
  //   };

  //   try {
  //     const response = await axios.post(
  //       `${URL}/community/${postId}/reply`,
  //       data,
  //       {
  //         headers: {
  //           accessToken: token,
  //         },
  //       }
  //     );
  //     console.log(response.data);
  //     // 실패하면 ..?
  //     // 성공하면! 다시 리렌더링
  //     setRerendering(!rerendering);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const onSubmit = () => {
    if (!text) {
      Alert.alert('댓글 등록 실패', '댓글을 입력해주세요.', [
        { text: '확인', onPress: () => {} },
      ]);
    } else {
      // 댓글 등록 api 호출
      writeCommentApi(postData.id);
    }
  };

  const likeApi = (postId) => {
    fetch(`${URL}/community/${postId}/like`, {
      method: 'PUT', //메소드 지정
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
        res && setRerendering(!rerendering);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // const likeApi = async (postId) => {

  //   try {
  //     const response = await axios.put(`${URL}/community/${postId}/like`, {
  //       headers: {
  //         accessToken: token,
  //       },
  //     });
  //     console.log(response.data);
  //     // 실패하면 ..?
  //     // 성공하면! 다시 리렌더링
  //     setRerendering(!rerendering);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const onClickLike = () => {
    setLike(!like);
    // 좋아요 api 호출
    likeApi(postData.id);
  };

  return (
    <View style={styles.container}>
      {postData && (
        <FlatList
          style={styles.commentContainer}
          data={postData.postReplyList}
          renderItem={({ item }) => (
            <Comment
              comment={item}
              postId={postData.id}
              setRerendering={setRerendering}
              rerendering={rerendering}
            />
          )}
          ItemSeparatorComponent={() => <View style={styles.separator}></View>}
          ListHeaderComponent={
            <View style={styles.postContainer}>
              <Text style={styles.title}>{postData.title}</Text>
              <View style={styles.explainContainer}>
                <Text style={styles.explain}>{postData.createdDate}</Text>
                <Text style={styles.explain}>|</Text>
                <Text style={styles.explain}>{postData.user.nickname}</Text>
              </View>
              <View style={styles.imageContainer}>
                <Image
                  source={require('../../../assets/comap.png')}
                  style={styles.image}
                  // resizeMode={'cover'}
                />
              </View>
              <Text style={styles.content}>{postData.content}</Text>
              <View style={styles.buttonContainer}>
                <Pressable
                  style={styles.button}
                  onPress={onClickLike}
                  hitSlop={10}
                >
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
                <View style={styles.numberContainer}>
                  <MaterialCommunityIcons
                    style={[styles.icon, { color: '#991b1b' }]}
                    name={'cards-heart-outline'}
                    size={18}
                    color={GRAY.DARK}
                  />
                  <Text style={[styles.number, { color: '#991b1b' }]}>
                    {post.liked ? post.liked : 0}
                  </Text>
                  <MaterialCommunityIcons
                    style={[styles.icon, { color: '#075985' }]}
                    name={'comment-outline'}
                    size={18}
                    color={GRAY.DARK}
                  />
                  <Text style={[styles.number, { color: '#075985' }]}>
                    {post.postReplyCount ? post.postReplyCount : 0}
                  </Text>
                </View>
              </View>
            </View>
          }
        />
      )}

      <View style={styles.searchContainer}>
        <TextInput
          value={text}
          onChangeText={(text) => setText(text)}
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
  title: {
    fontSize: 25,
    lineHeight: 30,
    fontWeight: '700',
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
  buttonContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
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
  numberContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  number: {
    paddingLeft: 3,
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
