import { ActivityIndicator, RefreshControl } from 'react-native'; // RefreshControl 추가
import { URL } from '../../../env';
import { useState, useEffect, useCallback } from 'react';
import { FlatList } from 'react-native-gesture-handler';
import { useUserContext } from '../../contexts/UserContext';
import MyReviewCard from '../../components/myPage/myReviewCard';
import { PRIMARY } from '../../colors';

const MyReviewScreen = () => {
  const [review, setReview] = useState([]);
  const [token] = useUserContext();
  const [isLoading, setIsLoading] = useState(true);

  const myReviewGet = () => {
    console.log(token);
    fetch(`${URL}/user/reviewedFacility`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setReview(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    myReviewGet();
  }, []);

  useEffect(() => {
    if (review) {
      setIsLoading(false);
    }
  }, [review]);

  const [isRefreshing, setIsRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setIsRefreshing(true);
    myReviewGet(); // 데이터를 다시 불러올 때 review 매개변수 삭제
    setIsRefreshing(false);
  }, []);

  return (
    <>
      {isLoading ? (
        <ActivityIndicator size="large" color={PRIMARY.DEFAULT} />
      ) : (
        <FlatList
          data={review}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <MyReviewCard review={item} />}
          refreshControl={ 
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={onRefresh}
              tintColor={PRIMARY.DEFAULT} 
            />
          }
        />
      )}
    </>
  );
};

export default MyReviewScreen;
