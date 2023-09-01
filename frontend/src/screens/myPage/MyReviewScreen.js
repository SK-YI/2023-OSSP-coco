import { View, Text, StyleSheet, Platform, Pressable } from 'react-native';
import facilityData from '../../sample/facilitySampledata';
import { WHITE, GRAY } from '../../colors';
import { useNavigation } from '@react-navigation/native';

const MyReviewScreen = () => {
  const navigation = useNavigation();

  const handleFacilityDetail = (facilityId) => {
    navigation.navigate('내 시설 정보', { facilityId });
  };

  return (
    <View style={styles.container}>
      {facilityData.map((facility) => (
        <Pressable
          key={facility.key}
          onPress={() => handleFacilityDetail(facility.key)}
          style={styles.reviewContainer}
        >
          <View>
            <Text style={styles.FacilityTitle}>{facility.review[0].title}</Text>
            <Text style={{ fontSize: 14, color: GRAY.DARK, marginVertical: 5 }}>
              {facility.review[0].content}
            </Text>
          </View>
          <Text style={{paddingTop: 22}}>{facility.name}</Text>
        </Pressable>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
  },
  reviewContainer: {
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
});

export default MyReviewScreen;
