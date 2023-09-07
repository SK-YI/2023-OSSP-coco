import { useState, useEffect } from 'react';
import { StyleSheet, View, ActivityIndicator, Text } from 'react-native';
import { PRIMARY, WHITE } from '../../colors';
import { FlatList } from 'react-native-gesture-handler';
import { URL } from '../../../env';
import { useUserContext } from '../../contexts/UserContext';
import FacilityCard from '../../components/facility/facilityCard';
import PropTypes from 'prop-types'; 

const FacilityTypeScreen = ({ route }) => {
  const [searchResult, setSearchResult] = useState([]);
  const { token } = useUserContext();

  const { selectedValue  } = route.params;

  const typeFacilityGetApi = () => {
    console.log(token);
    fetch(`${URL}/main/type/${selectedValue}`, {
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
        setSearchResult(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    typeFacilityGetApi();
    console.log({selectedValue})
  }, []);

  return (
    <View style={[styles.container]}>
      <View
        style={{
          paddingTop: 18,
          padding: 12,
          flexDirection: 'row',
          justifyContent: 'center',
          alignContent: 'center',
        }}
      >
        <Text style={{ color: WHITE, fontSize: 16, fontWeight: '500' }}>
          시설 종류 '{selectedValue}'에 대한 시설 검색 결과입니다.
        </Text>
      </View>
      {searchResult !== null ? (
        <FlatList
          data={searchResult.content}
          keyExtractor={(item) => item.facilityId.toString()}
          renderItem={({ item }) => <FacilityCard facility={item} />}
        />
      ) : (
        <ActivityIndicator />
      )}
    </View>
  );
};

FacilityTypeScreen.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      typeKeyword: PropTypes.string.isRequired, 
    }),
  })
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

export default FacilityTypeScreen;
