import { View, Text, StyleSheet, Image } from 'react-native';
import PropTypes from 'prop-types';
import facilityData from '../../sample/facilitySampledata';
import { PRIMARY, WHITE } from '../../colors';
import { AntDesign } from '@expo/vector-icons';

const FacilityDetailScreen = ({ route }) => {
  const facilityId = route.params.facilityId;
  const facility = facilityData.find((item) => item.key === facilityId);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{facility.name}</Text>
      <Text style={styles.type}>{facility.type}</Text>
      <View style={{ alignItems: 'center', paddingVertical: 30 }}>
        <Image
          source={require('frontend/assets/mapSample.png')}
          style={styles.image}
        />
      </View>
      <View style={{}}>
        <Text style={styles.menu}>위치: {facility.location}</Text>
        <View style={{ marginHorizontal: 5, paddingVertical: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <AntDesign name="star" size={24} color={PRIMARY.LIGHT} />
            <AntDesign name="star" size={24} color={PRIMARY.LIGHT} />
            <AntDesign name="star" size={24} color={PRIMARY.LIGHT} />
            <AntDesign name="star" size={24} color={PRIMARY.LIGHT} />
            <AntDesign name="star" size={24} color={PRIMARY.LIGHT} />
            <Text style={{color: PRIMARY.DARK, paddingLeft: 10}}>5.0</Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text>리뷰 보기</Text>
            <AntDesign name="right" size={24} color={PRIMARY.DARK} />
          </View>
        </View>

        <Text style={styles.menu}>정보: {facility.info}</Text>
      </View>
    </View>
  );
};

FacilityDetailScreen.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      facilityId: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
    paddingHorizontal: 25,
  },
  title: {
    fontSize: 25,
    paddingVertical: 5,
  },
  type: {
    fontSize: 17,
    color: PRIMARY.DARK,
  },
  image: {
    width: 300,
    height: 300,
    marginRight: 5,
    borderRadius: 10,
  },
  menu: {
    fontSize: 20,
  },
});
export default FacilityDetailScreen;
