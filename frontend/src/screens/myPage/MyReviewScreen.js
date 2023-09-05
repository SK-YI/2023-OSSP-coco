import { ActivityIndicator } from 'react-native';
import { URL } from '../../../env';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { FlatList } from 'react-native-gesture-handler';
import { useUserContext } from '../../contexts/UserContext';
import MyReviewCard from '../../components/myPage/myReviewCard';

const MyReviewScreen = () => {
  const [review, setReview] = useState();
  const { token } = useUserContext();
  const [isLoading, setIsLoading] = useState(true);

  //리뷰 목록 GET
  const myReviewGetApi = async () => {
    try {
      const response = await axios.get(`${URL}/user/reviewedFacility`, {
        headers: {
          accessToken: token,
        },
      });
      console.log(response.data);
      setReview(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => { //리뷰 정보 GET
    myReviewGetApi();
  }, []);

  return (
    <>
      {isLoading ? ( //로딩중일때
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={review}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <MyReviewCard review={item} />} //리뷰카드 렌더링!!
        />
      )}
    </>
  );
};

/* const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
  },
  reviewContainer: {
    padding: 13,
    borderRadius: 25,
    marginHorizontal: 30,
    marginVertical: 10,
    backgroundColor: WHITE,
    flexDirection: 'column',
    zIndex: 0,
    ...Platform.select({
      ios: {
        shadowColor: GRAY.DARK,
        shadowOffset: {
          width: 3,
          height: 3,
        },
        shadowOpacity: 0.3,
        shadowRadius: 10,
      },
      android: {
        elevation: 7,
      },
    }),
  },
  button: {
    backgroundColor: 'fff',
    zIndex: 1,
    marginTop: 6,
    color: GRAY.DARK,
    padding: 7,
    marginHorizontal: 6,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
}); */

export default MyReviewScreen;
