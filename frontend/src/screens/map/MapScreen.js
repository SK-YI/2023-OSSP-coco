import { Alert, StyleSheet, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import LocationSearch from '../../components/map/LocationSearch';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useEffect, useState } from 'react';
import * as Location from 'expo-location';
import LocationModal from '../../components/map/LocationModal';
import axios from 'axios';
import { useUserContext } from '../../contexts/UserContext';
// 더미데이터
const facilityData = {
  name: '이마트 산본점',
  latitude: 37.3610506,
  longitude: 126.9314088,
};
const MapScreen = () => {
  const { token } = useUserContext();

  const { top } = useSafeAreaInsets();

  const [location, setLocation] = useState({
    latitudeDelta: 0.005,
    longitudeDelta: 0.005,
  });

  const [searchLocation, setSearchLocation] = useState({
    latitudeDelta: 0.005,
    longitudeDelta: 0.005,
  });

  const [facilityList, setFacilityList] = useState([]);

  const [modalOpen, setModalOpen] = useState(false);

  const findFacilifyListApi = async (longitude, latitude) => {
    try {
      const response = await axios.get(
        `${URL}/user/map/${longitude}/${latitude}`,
        {
          headers: {
            accessToken: token,
          },
        }
      );
      console.log(response.data);
      // 성공하면 목록 저장하기
      setFacilityList(response.data); // ?
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    // async function fetchAndSetUser() {
    //   let { status } = await Location.requestForegroundPermissionsAsync();
    //   // setStatus(status);
    //   console.log('status : ', status);
    //   if (status === 'granted') {
    //     let loc = await Location.getCurrentPositionAsync({});
    //     // location.coords.latitude와 location.coords.longitude로
    //     //setInitialLocation(loc);
    //     console.log(loc);
    //     setLocation((prev) => ({
    //       ...prev,
    //       latitude: loc.coords.latitude,
    //       longitude: loc.coords.longitude,
    //     }));
    //     // 유저의 현 위치를 가져올 수 있다.
    //   }
    // }
    // fetchAndSetUser();
    const getLocation = async () => {
      // 현재 위치를 받아오는 함수
      //수많은 로직중에 에러가 발생하면
      //해당 에러를 포착하여 로직을 멈추고,에러를 해결하기 위한 catch 영역 로직이 실행
      try {
        //자바스크립트 함수의 실행순서를 고정하기 위해 쓰는 async,await
        await Location.requestForegroundPermissionsAsync();
        const loc = await Location.getCurrentPositionAsync();
        console.log(loc);
        setLocation((prev) => ({
          ...prev,
          latitude: loc.coords.latitude,
          longitude: loc.coords.longitude,
        }));
        findFacilifyListApi(loc.coords.longitude, loc.coords.latitude);
      } catch (error) {
        //혹시나 위치를 못가져올 경우를 대비해서, 안내를 준비합니다
        Alert.alert(
          '현재 위치 확인 실패',
          '앱의 위치 정보 접근을 허용해주세요.',
          [{ text: '확인', onPress: () => {} }]
        );
      }
    };
    getLocation();
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        // showsUserLocation={true}
        // followsUserLocation={true}
        showsMyLocationButton={true}
        showsCompass={true}
        zoomEnabled={true}
        rotateEnabled={true}
        // onMarkerDragStart={}
        style={styles.map}
        // initialRegion={
        //   initialLocation && {
        //     latitude: initialLocation.coords.latitude,
        //     longitude: initialLocation.coords.longitude,
        //   }
        // }
        region={
          searchLocation.latitude &&
          searchLocation.longitude &&
          location.latitude &&
          location.longitude
            ? searchLocation
            : location
          // 이래도 괜찮나..?
        }
      >
        {location.latitude && location.longitude && (
          <Marker
            coordinate={location}
            title={location.name}
            description={'현재 위치'}
          />
        )}
        {searchLocation.latitude && searchLocation.longitude && (
          <Marker
            coordinate={searchLocation}
            title={searchLocation.name}
            description={'검색한 위치'}
            pinColor="blue"
          />
        )}
        <Marker
          coordinate={facilityData}
          title={facilityData.name}
          description={'편의시설1'}
          onPress={() => setModalOpen(true)}
        />
        {facilityList.length > 0 &&
          facilityList.map((item) => (
            <Marker
              key={item.id}
              coordinate={item}
              title={item.name}
              description={'편의시설'}
              onPress={() => setModalOpen(true)}
            />
          ))}
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
          // 요기에 편의시설 검색 api 가져오기
          setSearchLocation((prev) => ({
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
      <LocationModal modalOpen={modalOpen} setModalOpen={setModalOpen} />
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
