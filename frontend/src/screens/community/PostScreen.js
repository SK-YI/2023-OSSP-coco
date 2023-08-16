import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { GRAY, PRIMARY } from '../../colors';
import Comment from '../../components/community/Comment';
import { useState } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';

// 더미데이터
const post = {
  id: 1,
  title: '제목1',
  content: '내용1',
  date: '22.02.02',
  nickname: '닉네임1',
  like: 0,
  commentNumber: 0,
  photo: null,
  comment: [
    {
      id: 1,
      nickname: '닉네임11',
      content: '내용11',
      date: '22.01.01',
    },
    {
      id: 2,
      nickname: '닉네임22',
      content: '내용22',
      date: '22.01.01',
    },
    {
      id: 3,
      nickname: '닉네임33',
      content: '내용33',
      date: '22.01.01',
    },
  ],
};

const PostScreen = () => {
  const [text, setText] = useState('');

  return (
    <View style={styles.container}>
      <View style={styles.postContainer}>
        <Text style={styles.nickname}>{post.nickname}</Text>
        <Text style={styles.date}>{post.date}</Text>
        <View style={styles.imageContainer}>
          <Image
            source={require('../../../assets/comap.png')}
            style={styles.image}
            // resizeMode={'cover'}
          />
        </View>
        <Text style={styles.content}>{post.content}</Text>
        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>좋아요</Text>
          <MaterialCommunityIcons
            style={styles.icon}
            name={'cards-heart-outline'}
            size={25}
          />
        </Pressable>
      </View>
      <FlatList
        style={styles.commentContainer}
        data={post.comment}
        renderItem={({ item }) => <Comment data={item} />}
        ItemSeparatorComponent={() => <View style={styles.separator}></View>}
      />
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
        />
        <Pressable style={styles.searchButton}>
          <Text style={styles.searchButtonText}>등록</Text>
        </Pressable>
      </View>
    </View>
  );
};

PostScreen.propTypes = {};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50, // 지우기
  },
  postContainer: {
    // flex: 1,
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingHorizontal: 20,
  },
  nickname: {
    paddingVertical: 5,
    fontSize: 25,
    lineHeight: 30,
    fontWeight: '700',
  },
  date: {
    paddingVertical: 5,
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
