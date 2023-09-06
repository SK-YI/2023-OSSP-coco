import { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { GRAY, PRIMARY, WHITE } from '../../colors';
import { ScrollView, TextInput, FlatList } from 'react-native-gesture-handler';
import { AntDesign } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { URL } from '../../../env';
import FacilityCard from '../../components/facility/facilityCard';
import DropDownPicker from 'react-native-dropdown-picker';
import { useUserContext } from '../../contexts/UserContext';
import FacilityDropdown from '../../components/facility/facilityDropdown'

//드롭다운, 검색 구현해야함!
const FacilityScreen = () => {
  const [recommendFacility, setRecommendFacility] = useState(null);
  const { top } = useSafeAreaInsets();
  const [token] = useUserContext();

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');
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

  const recommendFacilityGetApi = () => {
    console.log(token);
    fetch(`${URL}/main`, {
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
        setRecommendFacility(res);
      })
      .catch((error) => {
        console.log(error);
      });
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
          />
          <AntDesign
            style={styles.searchIcon}
            name="search1"
            size={24}
            color={PRIMARY.DARK}
          />
        </View>
        <FacilityDropdown/>
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
          추천 시설
        </Text>
      </View>
      {recommendFacility !== null ? (
        <FlatList
          data={recommendFacility.content}
          keyExtractor={(item) => item.facilityId.toString()}
          renderItem={({ item }) => <FacilityCard facility={item} />}
        />
      ) : (
        <ActivityIndicator /> // or a loading spinner
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
  dropdown: {
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
