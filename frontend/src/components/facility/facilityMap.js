import { StyleSheet, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const location = {
  name: '동국대학교 서울캠퍼스 본관',
  latitude: 37.54822739839277,
  longitude: 127.02253064209256,
  latitudeDelta: 0.005,
  longitudeDelta: 0.005,
};

const FacilityMap = () => {
  return (
    <View>
      <MapView
        showsUserLocation={true}
        followsUserLocation={true}
        showsMyLocationButton={true}
        showsCompass={true}
        zoomEnabled={true}
        rotateEnabled={true}
        // onMarkerDragStart={}
        style={styles.map}
        region={location.latitude && location.longitude ? location : null}
      >
        {location.latitude && location.longitude && (
          <Marker
            coordinate={location}
            title={location.name}
            description={'설명~~~'}
          />
        )}
      </MapView>
    </View>
  );
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
