import { StyleSheet, View, Text, Pressable, Image, Platform, } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { GRAY, PRIMARY, WHITE } from '../../colors';
import { TextInput } from 'react-native-gesture-handler';
import { AntDesign } from '@expo/vector-icons';
import facilityData from '../../sample/facilitySampledata';
import FacilityDropdown from '../../components/facility/facilityDropdown';

const FacilityScreen = () => {
  const navigation = useNavigation();

  const handleFacilityDetail = (facilityId) => {
    navigation.navigate('시설 정보', { facilityId });
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <View style={styles.searchBox}>
          <TextInput sytle={{ flex: 1 }} placeholder="검색어를 입력하세요" />
          <AntDesign
            style={styles.searchIcon}
            name="search1"
            size={24}
            color={PRIMARY.DARK}
          />
        </View>
        <FacilityDropdown></FacilityDropdown>
      </View>
      <View style={styles.faciltyContainer}>
        <View style={styles.recommendFacilityContainer}>
          <Image
            source={require('frontend/assets/icons/green-idea.png')}
            style={styles.image}
          />
          <Text style={styles.FacilityTitle}>추천 시설</Text>
        </View>
        <View style={{ marginHorizontal: 40 }}>
          {facilityData.map((facility) => (
            <View style={styles.FacilityMenu} key={facility.key}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={{ fontSize: 20 }}>{facility.name}</Text>
                {/* <Text style={{ fontSize: 10 }}>{facility.location}</Text> */}
              </View>
              <Pressable
                onPress={() => handleFacilityDetail(facility.key)}
                style={({ pressed }) => ({
                  backgroundColor: pressed ? 'lightgray' : 'white',
                  padding: 10,
                  borderRadius: 5,
                })}
              >
                <AntDesign name="right" size={24} color= {PRIMARY.DARK} />
              </Pressable>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: PRIMARY.LIGHT,
  },
  searchContainer: {
    height: 180,
    backgroundColor: PRIMARY.LIGHT,
    zIndex: 2
  },
  searchBox: {
    backgroundColor: WHITE,
    marginHorizontal: 40,
    marginTop: 40,
    padding: 10,
    borderRadius: 10,
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  searchIcon: {
    right: 1,
  },
  faciltyContainer: {
    flex: 6,
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
    fontSize: 22,
    fontWeight: '700',
  },
  FacilityMenu: {
    flexDirection: 'row',
    alignItems: 'center',
    fontSize: 18,
    paddingTop: 15,
    justifyContent: 'space-between',
  },
  recommendFacilityContainer: {
    paddingTop: 20,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 35,
    height: 35,
    marginRight: 5,
    borderRadius: 50,
  },
});
export default FacilityScreen;
