import { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  ActivityIndicator,
} from 'react-native';
import { PRIMARY } from '../../colors';
import { FlatList } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { URL } from '../../../env';
import axios from 'axios';
import { useUserContext } from '../../contexts/UserContext';
import FacilityCard from '../../components/facility/facilityCard';

//드롭다운 적용해야함
const FacilitySearchScreen = (searchKeyword) => {
  const [searchResult, setSearchResult] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { top } = useSafeAreaInsets();
  const { token } = useUserContext();

  const searchFacilityGetApi = async (searchKeyword) => {
    try {
      const response = await axios.get(`${URL}/main/search/${searchKeyword}`, {
        headers: {
          accessToken: token,
        },
      });
      console.log(response.data);
      setSearchResult(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    searchFacilityGetApi(searchKeyword);
  }, []);

  return (
    <View style={[styles.container, { paddingTop: top }]}>
      {isLoading ? ( //로딩중일때
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={searchResult}
          keyExtractor={(item) => item.facilityId.toString()}
          renderItem={({ item }) => <FacilityCard facility={item} />}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: PRIMARY.DEFAULT,
  },
  searchContainer: {
    height: 140,
    backgroundColor: PRIMARY.DEFAULT,
    zIndex: 2,
  },
});

export default FacilitySearchScreen;
