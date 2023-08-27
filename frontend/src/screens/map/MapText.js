import { decode } from '@mapbox/polyline'; //please install this package before running!
import { useState, useEffect } from 'react';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MAP_KEY } from '../../../env';
import { PRIMARY } from '../../colors';
import * as Location from 'expo-location';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import LocationSearch from '../../components/map/LocationSearch';
import MapViewDirections from 'react-native-maps-directions';

const MapTest = () => {
  const { top } = useSafeAreaInsets();

  const [coords, setCoords] = useState([]);

  const [status, setStatus] = useState(null);
  const [location, setLocation] = useState({
    latitudeDelta: 0.005,
    longitudeDelta: 0.005,
  });

  const [findLocation, setFindLocation] = useState({
    latitudeDelta: 0.005,
    longitudeDelta: 0.005,
  });

  const getDirections = async (startLoc, destinationLoc) => {
    console.log('시작');
    try {
      const KEY = MAP_KEY; //put your API key here.
      //otherwise, you'll have an 'unauthorized' error.
      let resp = await fetch(
        `https://maps.googleapis.com/maps/api/directions/json?origin=${startLoc}&destination=${destinationLoc}&key=${KEY}`
      );
      let respJson = await resp.json();
      let points = decode(respJson.routes[0].overview_polyline.points);
      console.log('위치..?', points);
      let coords = points.map((point) => {
        return {
          latitude: point[0],
          longitude: point[1],
        };
      });
      return coords;
    } catch (error) {
      return error;
    }
  };

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

  const startFindDirections = () => {
    // let loc1 = `${location.latitude},${location.longitude}`;
    //let loc2 = `${findLocation.latitude},${findLocation.longitude}`;
    // console.log(loc1);
    console.log(findLocation);
    getDirections(
      '37.36370390081197,126.92835748028206',
      '40.36370390081197,130.92835748028206'
    )
      .then((item) => setCoords(item))
      .catch((err) => console.log('Something went wrong', err));
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={location.latitude && location.longitude ? location : null}
      >
        {location.latitude && location.longitude && (
          <Marker
            coordinate={location}
            title={location.name}
            description={'현재위치'}
          />
        )}
        {findLocation.latitude && findLocation.longitude && (
          <>
            <Marker
              coordinate={findLocation}
              title={findLocation.name}
              description={'도착지'}
            />
            {/* <MapViewDirections
                origin={{
                  latitude: location.latitude,
                  longitude: location.longitude,
                }}
                destination={{
                  latitude: findLocation.latitude,
                  longitude: findLocation.longitude,
                }}
                apikey={MAP_KEY}
                strokeWidth={10}
                strokeColor={PRIMARY.DARK}
              /> */}
          </>
        )}
        {coords.length > 0 && (
          <Polyline
            coordinates={coords}
            strokeWidth={5}
            strokeColor={PRIMARY.DARK}
          />
        )}
      </MapView>
      <Pressable onPress={startFindDirections} style={styles.button}>
        <Text style={styles.text}>길찾기 버튼</Text>
      </Pressable>
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

          setFindLocation((prev) => ({
            ...prev,
            latitude: lat,
            longitude: lng,
            name: data.description,
          }));
        }}
      />
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
  button: {
    position: 'absolute',
    top: '20%',
    padding: 10,
    backgroundColor: PRIMARY.DARK,
    borderRadius: 10,
  },
  text: {
    color: 'white',
  },
});

export default MapTest;
