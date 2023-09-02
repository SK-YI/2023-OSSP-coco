import { FlatList, StyleSheet, View } from 'react-native';
import { GRAY, PRIMARY, WHITE } from '../../colors';
import MyPostItem from '../../components/myPage/MyPostItem';
import { useEffect, useState } from 'react';
// import { useSafeAreaInsets } from 'react-native-safe-area-context';

/* import { useNavigation } from '@react-navigation/native'; */

// 더미데이터
const postData = [
  {
    id: 1,
    title: '제목1',
    name: '내용1',
    date: '22.02.02',
    nickname: '닉네임1',
    like: 0,
    comment: 0,
    photo: null,
  },
  {
    id: 2,
    title: '제목2',
    name: '내용2',
    date: '22.02.02',
    nickname: '닉네임2',
    like: 2,
    comment: 0,
    photo: null,
  },
  {
    id: 3,
    title: '제목3',
    name: '내용3',
    date: '22.02.02',
    nickname: '닉네임3',
    like: 0,
    comment: 3,
    photo: null,
  },
  {
    id: 4,
    title: '제목3',
    name: '내용3',
    date: '22.02.02',
    nickname: '닉네임3',
    like: 0,
    comment: 3,
    photo: null,
  },
  {
    id: 5,
    title: '제목3',
    name: '내용3',
    date: '22.02.02',
    nickname: '닉네임3',
    like: 0,
    comment: 3,
    photo: null,
  },
  {
    id: 6,
    title: '제목3',
    name: '내용3',
    date: '22.02.02',
    nickname: '닉네임3',
    like: 0,
    comment: 3,
    photo: null,
  },
  {
    id: 7,
    title: '제목3',
    name: '내용3',
    date: '22.02.02',
    nickname: '닉네임3',
    like: 0,
    comment: 3,
    photo: null,
  },
  {
    id: 8,
    title: '제목3',
    name: '내용3',
    date: '22.02.02',
    nickname: '닉네임3',
    like: 0,
    comment: 3,
    photo: null,
  },
];

const MyCommentListScreen = () => {
  /* const navigation = useNavigation(); */
  const [postListData, setPostListData] = useState(postData);

  useEffect(() => {
    // 목록 조회 api
    // 성공하면
    setPostListData(postData);
  }, []);

  return (
    <View style={[styles.container]}>
      <FlatList
        data={postListData}
        renderItem={({ item }) => <MyPostItem post={item} />}
        ItemSeparatorComponent={() => <View style={styles.separator}></View>}
        horizontal={false}
        // onEndReached={fetchNextPage}
        // onEndReachedThreshold={0.4}
        // onRefresh={refetch}
        // refreshing={refetching}
      />
    </View>
  );
};

MyCommentListScreen.propTypes = {};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
    backgroundColor: WHITE,
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
    width: '85%',
    padding: 10,
    borderRadius: 10,
    borderColor: PRIMARY.DEFAULT,
    borderWidth: 2,
    fontSize: 20,
    lineHeight: 25,
  },
  icon: {
    paddingHorizontal: 10,
  },
  separator: {
    marginVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: GRAY.DEFAULT,
  },
});

export default MyCommentListScreen;
