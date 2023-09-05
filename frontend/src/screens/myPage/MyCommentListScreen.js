import { FlatList, StyleSheet, Text, View } from 'react-native';
import { GRAY, PRIMARY, WHITE } from '../../colors';
import MyPostItem from '../../components/myPage/MyPostItem';
import { useEffect, useState } from 'react';
import { useUserContext } from '../../contexts/UserContext';
import { URL } from '../../../env';

const MyCommentListScreen = () => {
  const [token] = useUserContext();

  const [postListData, setPostListData] = useState(null);

  const getPostApi = () => {
    fetch(`${URL}/user/commentlist`, {
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
        setPostListData(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // const getPostApi = async () => {
  //   try {
  //     const response = await axios.get(`${URL}/user/commentlist`, {
  //       headers: {
  //         accessToken: token,
  //       },
  //     });
  //     console.log(response.data);
  //     // 실패하면 ..?
  //     // 성공하면!
  //     setPostListData(response.data);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  useEffect(() => {
    // 목록 조회 api
    getPostApi();
  }, []);

  return (
    <View style={[styles.container]}>
      {postListData && postListData.length > 0 ? (
        <FlatList
          data={postListData}
          renderItem={({ item }) => <MyPostItem post={item} isModify={false} />}
          ItemSeparatorComponent={() => <View style={styles.separator}></View>}
          horizontal={false}
          // onEndReached={fetchNextPage}
          // onEndReachedThreshold={0.4}
          // onRefresh={refetch}
          // refreshing={refetching}
        />
      ) : (
        <View style={styles.empty}>
          <Text style={styles.emptyText}>내가 작성한 댓글이 없습니다.</Text>
        </View>
      )}
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
  empty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 20,
  },
});

export default MyCommentListScreen;
