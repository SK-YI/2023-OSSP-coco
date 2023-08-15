import {
  StyleSheet,
  View,
  Text,
  Pressable /* Dimensions */,
} from 'react-native';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native'; // 내비게이션 객체를 가져오기 위해 추가
import { PRIMARY, WHITE } from '../../colors';
import { TextInput } from 'react-native-gesture-handler';
import { AntDesign } from '@expo/vector-icons';
import FacilityDropdown from '../../components/facility/facilityDropdown';
import Badge from '../../components/facility/facilitybadge';

const FacilityScreen = () => {
  const navigation = useNavigation(); // 내비게이션 객체를 가져옴

  const [selectedItems, setSelectedItems] = useState([]);

  const handleAddItem = (item) => {
    setSelectedItems([...selectedItems, item]);
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
        <View style={styles.searchDropdown}>
          <FacilityDropdown 
          onItemSelected={handleAddItem}></FacilityDropdown>
        </View>
        <View>
          <Badge selectedItems={selectedItems} ></Badge>
        </View>
      </View>
      <View style={styles.faciltyContainer}>
        <Pressable onPress={() => navigation.navigate('시설 정보')}>
          <Text style={styles.facilityTitle}>시설 정보</Text>
        </Pressable>
        <Pressable onPress={() => navigation.navigate('시설 정보')}>
          <Text style={styles.facilityTitle}>시설 정보</Text>
        </Pressable>
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
    height: 230,
    backgroundColor: PRIMARY.LIGHT,
  },
  searchBox: {
    backgroundColor: WHITE,
    marginBottom: 15,
    margin: 40,
    padding: 10,
    borderRadius: 10,
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  searchDropdown: {
    backgroundColor: WHITE,
    marginHorizontal: 40,
    borderRadius: 10,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 1
  },
  searchIcon: {
    right: 1,
  },
  faciltyContainer: {
    backgroundColor: WHITE,
    flex: 1,
    borderRadius: 10,
    ZIndex: 0
  },
  facilityTitle: {
    fontSize: 18,
    paddingVertical: 10,
    padding: 20,
  },
});

export default FacilityScreen;
