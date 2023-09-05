import { ActivityIndicator, View } from 'react-native';
import { useEffect, useState } from 'react';
import { URL } from '../../../env';
import axios from 'axios';
import { useUserContext } from '../../contexts/UserContext';
import { FlatList } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MyFacilityCard from '../../components/myPage/myFacilityCard';

const MyFacilityScreen = () => {
  const [favoriteFacility, setFavoriteFacility] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const { top } = useSafeAreaInsets();
  const { token } = useUserContext();

  const favoriteFacilityGet = async () => {
    try {
      const response = await axios.get(`${URL}/user/favoriteFacility`, {
        headers: {
          accessToken: token,
        },
      });
      console.log(response.data);
      setFavoriteFacility(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    favoriteFacilityGet();
  }, []);

  return (
    <View style={{ paddingTop: top }}>
      {isLoading ? ( //로딩중일때
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={favoriteFacility.likedFacilityList}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <MyFacilityCard facility={item} />}
        />
      )}
    </View>
  );
};

/* const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  icon: {
    height: 28,
    width: 28,
    marginHorizontal: 3,
  },
  faciltyContainer: {
    padding: 14,
    height: 120,
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
  FacilityTitle: {
    fontSize: 18,
    fontWeight: '500',
  },
  FacilityMenu: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    fontSize: 18,
    paddingTop: 15,
    justifyContent: 'space-between',
  },
  recommendFacilityContainer: {
    marginHorizontal: 30,
    paddingTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 20,
  },
  image: {
    width: 35,
    height: 35,
    marginRight: 5,
    borderRadius: 50,
  },
}); */
export default MyFacilityScreen;
