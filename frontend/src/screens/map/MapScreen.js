import { StyleSheet, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import LocationSearch from '../../components/map/LocationSearch';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useEffect, useState } from 'react';
import * as Location from 'expo-location';

const MapScreen = () => {
  const { top } = useSafeAreaInsets();

  const [status, setStatus] = useState(null);
  const [location, setLocation] = useState({
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  });

  // const [initialLocation, setInitialLocation] = useState();

  useEffect(() => {
    async function fetchAndSetUser() {
      let { status } = await Location.requestForegroundPermissionsAsync();
      setStatus(status);
      if (status === 'granted') {
        let loc = await Location.getCurrentPositionAsync({});
        // location.coords.latitude와 location.coords.longitude로
        //setInitialLocation(loc);
        console.log(loc);
        setLocation((prev) => ({
          ...prev,
          latitude: loc.coords.latitude,
          longitude: loc.coords.longitude,
        }));
        // 유저의 현 위치를 가져올 수 있다.
      }
    }
    fetchAndSetUser();
  }, [status]);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        // initialRegion={
        //   initialLocation && {
        //     latitude: initialLocation.coords.latitude,
        //     longitude: initialLocation.coords.longitude,
        //   }
        // }
        region={location.latitude && location.longitude ? location : null}
      >
        {location.latitude && location.longitude && (
          <Marker coordinate={location} title={location.name} />
        )}
      </MapView>

      <LocationSearch
        styles={{
          container: {
            ...styles.location,
            paddingTop: top + 20,
          },
        }}
        iconVisible={false}
        onPress={(data, detail) => {
          const {
            geometry: {
              location: { lat, lng },
            },
          } = detail;

          setLocation((prev) => ({
            ...prev,
            latitude: lat,
            longitude: lng,
            name: data.description,
          }));
        }}
      />
      {/* {location.name && (
        <View style={styles.list}>
          <LocationPostList location={location.name} />
        </View>
      )} */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  map: {
    width: '100%',
    height: '100%',
  },
  location: {
    position: 'absolute',
    width: '90%',
    borderBottomWidth: 0,
  },
});

export default MapScreen;
