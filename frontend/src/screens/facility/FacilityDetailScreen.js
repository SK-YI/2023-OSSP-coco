import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Platform,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import facilityData from '../../sample/facilitySampledata';
import { GRAY, PRIMARY, WHITE } from '../../colors';
import WriteReviewPopup from '../../components/facility/reviewPopup';
import { AntDesign } from '@expo/vector-icons';
import FacilityMap from '../../components/facility/facilityMap';

const FacilityDetailScreen = ({ route }) => {
  const facilityId = route.params.facilityId;
  const facility = facilityData.find((item) => item.key === facilityId);

  const [isReviewPopupVisible, setReviewPopupVisible] = useState(false);
  const handleOpenReviewPopup = () => {
    setReviewPopupVisible(true);
  };
  const handleCloseReviewPopup = () => {
    setReviewPopupVisible(false);
  };
  const handleSaveReview = (reviewData) => {
    console.log(reviewData);
    handleCloseReviewPopup();
  };

  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = () => {
    setIsFavorite((prevState) => !prevState);
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>{facility.name}</Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={styles.type}>{facility.type}</Text>
          <TouchableOpacity onPress={toggleFavorite}>
            <AntDesign
              name={isFavorite ? 'star' : 'staro'}
              size={30}
              color={isFavorite ? PRIMARY.DEFAULT : GRAY.DEFAULT}
              style={{ marginRight: 35 }}
            />
          </TouchableOpacity>
        </View>

        <View style={{ alignItems: 'center', paddingVertical: 30 }}>
          <FacilityMap />
        </View>
        <View style={{}}>
          <Text style={styles.menu}>위치: {facility.location}</Text>
          <View
            style={{
              marginHorizontal: 5,
              paddingVertical: 10,
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingTop: 20,
            }}
          >
            <View style={{ flexDirection: 'row', alignContent: 'center' }}>
              <Text style={styles.reviewTitle}>리뷰</Text>
              <Text
                style={{
                  color: PRIMARY.DARK,
                  paddingLeft: 10,
                  paddingTop: 2,
                  fontSize: 17,
                  fontWeight: '700',
                }}
              >
                4.5
              </Text>
            </View>
            <View>
              <Pressable onPress={handleOpenReviewPopup}>
                <Text style={{ paddingRight: 20, paddingTop: 5 }}>
                  리뷰 쓰기
                </Text>
              </Pressable>
            </View>
            {isReviewPopupVisible && (
              <WriteReviewPopup
                onClose={handleCloseReviewPopup}
                onSave={handleSaveReview}
              />
            )}
          </View>
          <ScrollView
            horizontal={true}
            style={styles.reviewContainer}
            contentContainerStyle={{ alignItems: 'center' }}
          >
            {facility.review.map((review, index) => (
              <View style={styles.review} key={index}>
                <Text style={{ fontSize: 15, fontWeight: '700' }}>
                  {review.title}
                </Text>
                <Text style={{ color: PRIMARY.DARK }}>
                  {review.reviewscore}
                </Text>
                <Text>{review.content}</Text>
              </View>
            ))}
          </ScrollView>
          <Text style={styles.info}>정보: {facility.info}</Text>
        </View>
      </View>
    </ScrollView>
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
  },
  title: {
    paddingTop: 20,
    fontSize: 25,
    paddingVertical: 5,
    fontWeight: '700',
    paddingHorizontal: 25,
  },
  type: {
    paddingTop: 5,
    fontSize: 17,
    color: PRIMARY.DARK,
    paddingHorizontal: 25,
  },
  menu: {
    fontSize: 18,
    paddingHorizontal: 25,
  },
  reviewTitle: {
    fontSize: 20,
    fontWeight: '700',
    paddingLeft: 25,
  },
  reviewContainer: {
    backgroundColor: GRAY.LIGHT,
    height: 150,
  },
  review: {
    width: 150,
    height: 110,
    backgroundColor: WHITE,
    borderRadius: 10,
    margin: 13,
    padding: 13,
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
  info: {
    fontSize: 18,
    paddingHorizontal: 25,
    paddingVertical: 20,
  },
});
export default FacilityDetailScreen;
