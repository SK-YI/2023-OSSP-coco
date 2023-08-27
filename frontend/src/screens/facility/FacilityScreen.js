import { StyleSheet, View, Text, Pressable, Platform, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { GRAY, PRIMARY, WHITE } from '../../colors';
import { TextInput } from 'react-native-gesture-handler';
import { AntDesign } from '@expo/vector-icons';
import facilityData from '../../sample/facilitySampledata';
import FacilityDropdown from '../../components/facility/facilityDropdown';
import toiletIcon from 'frontend/assets/facilityIcons/toilet.png';
import rampIcon from 'frontend/assets/facilityIcons/ramp.png';
import elevatorIcon from 'frontend/assets/facilityIcons/elevator.png';

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

      {facilityData.slice(0, 3).map((facility) => (
        <Pressable
          key={facility.key}
          onPress={() => handleFacilityDetail(facility.key)}
          style={styles.faciltyContainer}
        >
          <Text style={styles.FacilityTitle}>{facility.name}</Text>
          <Text style={{ fontSize: 14, color: GRAY.DARK, marginVertical: 5 }}>
            {facility.location}
          </Text>
          <View style={{ flexDirection: 'row', paddingTop: 8 }}>
            {facility.facility.toilet && (
              <Image style={styles.icon} source={toiletIcon} />
            )}
            {facility.facility.ramp && (
              <Image style={styles.icon} source={rampIcon} />
            )}
            {facility.facility.elevator && (
              <Image style={styles.icon} source={elevatorIcon} />
            )}
          </View>
        </Pressable>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: PRIMARY.DEFAULT,
  },
  searchContainer: {
    height: 180,
    backgroundColor: PRIMARY.DEFAULT,
    zIndex: 2,
  },
  searchBox: {
    backgroundColor: WHITE,
    marginHorizontal: 30,
    marginTop: 40,
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
    height: 30,
    width: 30,
    marginHorizontal: 3
  },
  faciltyContainer: {
    padding: 12,
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
