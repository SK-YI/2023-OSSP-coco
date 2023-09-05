import { View, Text, StyleSheet, Platform, Pressable } from 'react-native';
import { WHITE, GRAY } from '../../colors';
import { useNavigation } from '@react-navigation/native';
import { URL } from '../../../env';
import axios from 'axios';
import { useState } from 'react';
import ModifyReviewPopup from '../../components/myPage/modifyPopup';
import { useUserContext } from '../../contexts/UserContext';

const MyReviewCard = (review) => {
  const navigation = useNavigation();
  const { token } = useUserContext();

  const handleFacilityDetail = (facilityId) => {
    navigation.navigate('내 시설 정보', { facilityId });
  };

  const reviewDelete = async () => {
    //review key값 보내서 삭제?
    try {
      const response = await axios.delete(
        `${URL}/user/${review.facilityId}/review/${review.id}`,
        {
          headers: {
            accessToken: token,
          },
        }
      );
      console.log(response.data);
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
        <Text style={styles.FacilityTitle}>{review.title}</Text>
        <Text style={{ fontSize: 14, color: GRAY.DARK, marginVertical: 5 }}>
          {review.content}
        </Text>
      </View>
      <Text style={{ paddingTop: 22 }}>{review.facilityName}</Text>
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
