import { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { GRAY, PRIMARY, WHITE } from '../../colors';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { AntDesign } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { URL } from '../../../env';
import axios from 'axios';
import { useUserContext } from '../../contexts/UserContext';
import FacilityCard from '../../components/facility/facilityCard';
import DropDownPicker from 'react-native-dropdown-picker';

//드롭다운 적용해야함
const FacilityScreen = () => {
  const [isSearched, setIsSearched] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState();
  const [searchResult, setSearchResult] = useState([]);
  const [recommendFacility, setRecommendFacility] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { top } = useSafeAreaInsets();
  const { token } = useUserContext();

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState();
  const [items, setItems] = useState(options);

  const options = [
    {
      label: '한국장애인고용공단 및 지사',
      value: '한국장애인고용공단 및 지사',
    },
    { label: '특수학교', value: '특수학교' },
    { label: '종합병원', value: '종합병원' },
    { label: '장애인복지시설', value: '장애인복지시설' },
    {
      label: '병원·치과병원·한방병원·정신병원·요양병원',
      value: '병원·치과병원·한방병원·정신병원·요양병원',
    },
    { label: '노인복지시설(경로당포함)', value: '노인복지시설(경로당포함)' },
  ];

  const handleSearch = () => {
    setIsSearched(true);
    searchFacilityGetApi(searchKeyword);
  };

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

  const recommendFacilityGetApi = async () => {
    try {
      const response = await axios.get(`${URL}/main`, {
        headers: {
          accessToken: token,
        },
      });
      console.log(response.data);
      setRecommendFacility(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    recommendFacilityGetApi();
  }, []);

  return (
    <View style={[styles.container, { paddingTop: top }]}>
      <View style={styles.searchContainer}>
        <View style={styles.searchBox}>
          <TextInput
            style={{ flex: 1 }}
            placeholderTextColor={GRAY.DARK}
            placeholder="검색어를 입력하세요"
            onChangeText={setSearchKeyword}
          />
          <AntDesign
            style={styles.searchIcon}
            name="search1"
            size={24}
            color={PRIMARY.DARK}
            onPress={handleSearch}
          />
        </View>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            paddingHorizontal: 30,
            borderRadius: 25,
          }}
        >
          <DropDownPicker
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            placeholder="시설 타입을 선택해주세요"
            placeholderStyle={{ color: GRAY.DARK }}
            multiple={false}
            mode="BADGE"
            badgeColors={GRAY.LIGHT}
            badgeDotColors={[
              '#e76f51',
              '#00b4d8',
              '#e9c46a',
              '#e76f51',
              '#8ac926',
              '#00b4d8',
              '#e9c46a',
            ]}
            style={styles.dropdown}
          />
        </View>
      </View>

      <View style={styles.recommendFacilityContainer}>
        <AntDesign name="home" size={24} color={WHITE} />
        <Text
          style={{
            fontSize: 22,
            fontWeight: '700',
            color: WHITE,
            paddingLeft: 10,
          }}
        >
          {isSearched ? '검색 결과' : '추천 시설'}
        </Text>
        {isLoading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <ScrollView>
            {isSearched
              ? searchResult.map((facility) => (
                  <FacilityCard key={facility.id} facility={facility} />
                ))
              : recommendFacility.content.map((facility) => (
                  <FacilityCard key={facility.id} facility={facility} />
                ))}
          </ScrollView>
        )}
      </View>
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
  searchBox: {
    backgroundColor: WHITE,
    marginHorizontal: 30,
    padding: 10,
    borderRadius: 50,
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  searchIcon: {
    right: 1,
  },
  icon: {
    height: 28,
    width: 28,
    marginHorizontal: 3,
  },
  dropdown:{
    borderRadius: 25,
    borderColor: 'transparent',
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
});

export default FacilityScreen;
