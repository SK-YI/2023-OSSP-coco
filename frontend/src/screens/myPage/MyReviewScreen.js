import { ActivityIndicator } from 'react-native';
import { URL } from '../../../env';
import { useState, useEffect } from 'react';
import { FlatList } from 'react-native-gesture-handler';
import { useUserContext } from '../../contexts/UserContext';
import MyReviewCard from '../../components/myPage/myReviewCard';

const MyReviewScreen = () => {
  const [review, setReview] = useState([]);
  const [token] = useUserContext();
  const [isLoading, setIsLoading] = useState(true);

  const myReviewGet = () => {
    console.log(token);
    fetch(`${URL}/user/reviewedFacility`, {
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

  return (
    <>
      {isLoading ? ( //로딩중일때
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={review}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <MyReviewCard review={item} />}
        />
      )}
    </>
  );
};

export default MyReviewScreen;
