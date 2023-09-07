import {
  Alert,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { GRAY, PRIMARY, WHITE } from '../../colors';
import PostItem from '../../components/community/PostItem';
import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useUserContext } from '../../contexts/UserContext';
import PropTypes from 'prop-types';
import { URL } from '../../../env';

const SearchCommunityScreen = ({ route }) => {
  const [token] = useUserContext();

  const navigation = useNavigation();

  const [postListData, setPostListData] = useState([]);
  const { top } = useSafeAreaInsets();
  const [text, setText] = useState(route.params.text);

  const getPostApi = () => {
    fetch(`${URL}/community/title/${text}`, {
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
        // console.log(res.content[0].user.nickname);
        // 성공하면!
        setPostListData(res.content);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // const getPostApi = async () => {
  //   try {
  //     const response = await axios.get(`${URL}/community/title/${text}`, {
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
    // 검색 목록 조회 api
    getPostApi();
  }, []);

  const onSearch = () => {
    if (!text) {
      Alert.alert('검색 실패', '검색어를 입력해주세요.', [
        { text: '확인', onPress: () => {} },
      ]);
    } else {
      // 검색 api 호출
      getPostApi();
    }
  };

  return (
    <View style={[styles.container, { paddingTop: top }]}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.search}
          value={text}
          onChangeText={(text) => setText(text.trim())}
          placeholder={'검색어를 입력해주세요.'}
          onSubmitEditing={onSearch}
        />
        <Pressable onPress={() => navigation.navigate('목록')}>
          <Text style={styles.backText}>취소</Text>
        </Pressable>
      </View>
      {postListData.length > 0 ? (
        <FlatList
          data={postListData}
          renderItem={({ item }) => <PostItem post={item} />}
          ItemSeparatorComponent={() => <View style={styles.separator}></View>}
          horizontal={false}
          // onEndReached={fetchNextPage}
          // onEndReachedThreshold={0.4}
          // onRefresh={refetch}
          // refreshing={refetching}
        />
      ) : (
        <View style={styles.empty}>
          <Text style={styles.emptyText}>검색 결과가 없습니다.</Text>
        </View>
      )}
    </View>
  );
};

SearchCommunityScreen.propTypes = {
  route: PropTypes.object,
};

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
  backText: {
    paddingRight: 10,
    fontSize: 20,
  },
});

export default SearchCommunityScreen;
