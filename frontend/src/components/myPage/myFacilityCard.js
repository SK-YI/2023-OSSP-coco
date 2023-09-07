import {
  StyleSheet,
  View,
  Text,
  Pressable,
  Platform,
  Image,
} from 'react-native';
import PropTypes from 'prop-types'; // Import PropTypes
import { useNavigation } from '@react-navigation/native';
import { GRAY, WHITE } from '../../colors';
import toiletIcon from 'frontend/assets/facilityIcons/toilet.png';
import rampIcon from 'frontend/assets/facilityIcons/ramp.png';
import elevatorIcon from 'frontend/assets/facilityIcons/elevator.png';
import blockIcon from 'frontend/assets/facilityIcons/block.png';
import escapeIcon from 'frontend/assets/facilityIcons/escape.png';
import showerIcon from 'frontend/assets/facilityIcons/shower.png';
import parkingIcon from 'frontend/assets/facilityIcons/parking.png';
import vendingIcon from 'frontend/assets/facilityIcons/vending.png';

const MyFacilityCard = ({ facility }) => {
  const navigation = useNavigation();

  const handleFacilityDetail = (facilityId) => {
    navigation.navigate('내 시설 정보', { facilityId: facilityId });
  };

  const equipment = facility.equipment || [];

  return (
    <Pressable
      key={facility.facilityId}
      onPress={() => handleFacilityDetail(facility.facilityId)}
      style={styles.faciltyContainer}
    >
      <Text style={styles.FacilityTitle}>{facility.name}</Text>
      <Text style={{ fontSize: 14, color: GRAY.DARK, marginVertical: 5 }}>
        {facility.address}
      </Text>
      <View style={{ flexDirection: 'row', paddingTop: 8 }}>
        {equipment.includes('판매기') && (
          <Image style={styles.icon} source={vendingIcon} />
        )}
        {equipment.includes('주차구역') && (
          <Image style={styles.icon} source={parkingIcon} />
        )}
        {equipment.includes('점자블록') && (
          <Image style={styles.icon} source={blockIcon} />
        )}
        {equipment.includes('높이차이') && (
          <Image style={styles.icon} source={rampIcon} />
        )}
        {equipment.includes('승강설비') && (
          <Image style={styles.icon} source={elevatorIcon} />
        )}
        {equipment.includes('피난설비') && (
          <Image style={styles.icon} source={escapeIcon} />
        )}
        {equipment.includes('대변기') || equipment.includes('소변기') ? (
          <Image style={styles.icon} source={toiletIcon} />
        ) : null}
        {equipment.includes('샤워실') && (
          <Image style={styles.icon} source={showerIcon} />
        )}
      </View>
    </Pressable>
  );
};

MyFacilityCard.propTypes = {
  facility: PropTypes.shape({
    facilityId: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    equipment: PropTypes.string,
  }).isRequired,
};

const styles = StyleSheet.create({
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
});
export default MyFacilityCard;
