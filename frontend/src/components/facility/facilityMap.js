import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const FacilityMap = ({ facility }) => {
  const location = {
    name: facility.name,
    latitude: facility.latitude,
    longitude: facility.longitude,
    latitudeDelta: 0.005,
    longitudeDelta: 0.005,
  };

  return (
    <View>
      <MapView
        showsUserLocation={true}
        followsUserLocation={false}
        showsMyLocationButton={true}
        showsCompass={true}
        zoomEnabled={true}
        rotateEnabled={true}
        style={styles.map}
        region={location.latitude && location.longitude ? location : null}
      >
        {location.latitude && location.longitude && (
          <Marker
            coordinate={location}
            title={location.name}
            description={''}
          />
        )}
      </MapView>
    </View>
  );
};
FacilityMap.propTypes = {
  facility: PropTypes.shape({
    name: PropTypes.string.isRequired,
    latitude: PropTypes.number.isRequired,
    longitude: PropTypes.number.isRequired,
  }).isRequired,
};

const styles = StyleSheet.create({
  map: {
    width: 300,
    height: 300,
    marginRight: 5,
    borderRadius: 10,
  },
});

export default FacilityMap;
