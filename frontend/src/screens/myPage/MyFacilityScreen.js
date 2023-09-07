import { ActivityIndicator, View } from 'react-native';
import { useEffect, useState } from 'react';
import { URL } from '../../../env';
import { useUserContext } from '../../contexts/UserContext';
import { FlatList } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MyFacilityCard from '../../components/myPage/myFacilityCard';

const MyFacilityScreen = () => {
  const [favoriteFacility, setFavoriteFacility] = useState(null);
  /* const [isLoading, setIsLoading] = useState(true); */
  const { top } = useSafeAreaInsets();
  const [token] = useUserContext();


  const favoriteFacilityGet = () => {
    console.log(token);
    fetch(`${URL}/user/favoriteFacility`, {
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
        setFavoriteFacility(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  
  useEffect(() => {
    favoriteFacilityGet();
  }, []);

  return (
    <View style={{ paddingTop: top }}>
      {favoriteFacility !== null ? (
        <FlatList
          data={favoriteFacility.likedFacilityList}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <MyFacilityCard facility={item} />}
        />
      ) : (
        <ActivityIndicator />
      )}
    </View>
  );
};

export default MyFacilityScreen;
