import { View, Text, StyleSheet, Platform, Pressable } from 'react-native';
import { WHITE, GRAY } from '../../colors';
import { useNavigation } from '@react-navigation/native';
import { URL } from '../../../env';
import { useState } from 'react';
import ModifyReviewPopup from '../../components/myPage/modifyPopup';
import { useUserContext } from '../../contexts/UserContext';
import PropTypes from 'prop-types';

const MyReviewCard = ({review}) => {
  const navigation = useNavigation();
  const [token] = useUserContext();

  const handleFacilityDetail = () => {
    const facilityId = review.facilityId;
    navigation.navigate('내 시설 정보', { facilityId });
  };

  const reviewDelete = async () => {
    try {
      const response = await fetch(`${URL}/user/${review.facilityId}/review/${review.id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (response.ok) {
        const responseData = await response.json();
        console.log(responseData);
      } else {
        console.error('Failed to delete review');
      }
    } catch (error) {
      console.error(error);
    }
  };  

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

  return (
    <Pressable
      onPress={() => handleFacilityDetail(review.facilityId)}
      style={styles.reviewContainer}
    >
      <View>
        <Text style={{fontWeight: '700'}}>{review.title}</Text>
        <Text style={{ fontSize: 14, color: GRAY.DARK, marginVertical: 5 }}>
          {review.content}
        </Text>
      </View>
      <Text style={{ paddingTop: 22, fontWeight: '500' }}>{review.facilityName}</Text>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          paddingTop: 10,
        }}
      >
        <Pressable onPress={handleOpenReviewPopup} style={styles.button}>
          <Text>수정</Text>
        </Pressable>
        {isReviewPopupVisible && (
          <ModifyReviewPopup
            review={review}
            onClose={handleCloseReviewPopup}
            onSave={handleSaveReview}
          />
        )}
        <View
          style={{ width: 1, backgroundColor: GRAY.DEFAULT, margin: 7 }}
        ></View>
        <Pressable onPress={reviewDelete} style={styles.button}>
          <Text style={{ color: GRAY.DARK }}>삭제</Text>
        </Pressable>
      </View>
    </Pressable>
  );
};

MyReviewCard.propTypes = {
  review: PropTypes.shape({
    id: PropTypes.number.isRequired,
    content: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    facilityId: PropTypes.number.isRequired,
    facilityName: PropTypes.string.isRequired,
    star: PropTypes.number.isRequired,
  }).isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
  },
  reviewContainer: {
    padding: 13,
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
  button: {
    backgroundColor: 'fff',
    zIndex: 1,
    marginTop: 6,
    color: GRAY.DARK,
    padding: 7,
    marginHorizontal: 6,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
});

export default MyReviewCard;
