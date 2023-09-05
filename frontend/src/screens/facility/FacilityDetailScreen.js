import { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Platform,
  Pressable,
  TouchableOpacity,
  Image,
} from 'react-native';
import PropTypes from 'prop-types';
import { GRAY, PRIMARY, WHITE } from '../../colors';
import WriteReviewPopup from '../../components/facility/reviewPopup';
import { AntDesign } from '@expo/vector-icons';
import FacilityMap from '../../components/facility/facilityMap';
import toiletIcon from 'frontend/assets/facilityIcons/toilet.png';
import rampIcon from 'frontend/assets/facilityIcons/ramp.png';
import elevatorIcon from 'frontend/assets/facilityIcons/elevator.png';
import blockIcon from 'frontend/assets/facilityIcons/block.png';
import escapeIcon from 'frontend/assets/facilityIcons/escape.png';
import showerIcon from 'frontend/assets/facilityIcons/shower.png';
import parkingIcon from 'frontend/assets/facilityIcons/parking.png';
import vendingIcon from 'frontend/assets/facilityIcons/vending.png'
import { URL } from '../../../env';
import axios from 'axios';
import { useUserContext } from '../../contexts/UserContext';

const FacilityDetailScreen = ({ facilityId }) => {

  const [facility, setFacility] = useState('');
  const { token } = useUserContext();

  const facilityInfoGetApi = async () => {
    try {
      const response = await axios.get(`${URL}/facility/${facilityId}`, {
        headers: {
          accessToken: token,
        },
      });
      console.log(response.facilityInfo);
      setFacility(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => { //시설 정보 GET
    facilityInfoGetApi();
  }, []);


  //즐겨찾기 API와 연결필요
  const [isFavorite, setIsFavorite] = useState(false);

    const toggleFavorite = () => {
      setIsFavorite((prevState) => !prevState);
    };


  //리뷰 작성 모달 관련 함수들
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

  FacilityDetailScreen.propTypes = {
    facilityId: PropTypes.number,
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
        <Text style={[styles.menu, { paddingTop: 20 }]}>
          {facility.address}
        </Text>
        <View style={{ alignItems: 'center', paddingVertical: 30 }}>
          <FacilityMap />
        </View>
        <View style={{ flexDirection: 'row', paddingTop: 8 }}>
        {facility.equipment.includes('판매기') && (
          <Image style={styles.icon} source={vendingIcon} />
        )}
        {facility.equipment.includes('주차구역') && (
          <Image style={styles.icon} source={parkingIcon} />
        )}
        {facility.equipment.includes('점자블록') && (
          <Image style={styles.icon} source={blockIcon} />
        )}
        {facility.equipment.includes('높이차이') && (
          <Image style={styles.icon} source={rampIcon} />
        )}
        {facility.equipment.includes('승강설비') && (
          <Image style={styles.icon} source={elevatorIcon} />
        )}
        {facility.equipment.includes('피난설비') && (
          <Image style={styles.icon} source={escapeIcon} />
        )}
        {facility.equipment.some((equipment) => ['대변기', '소변기'].includes(equipment)
        ) && <Image style={styles.icon} source={toiletIcon} />}
        {facility.equipment.includes('샤워실') && (
          <Image style={styles.icon} source={showerIcon} />
        )}
      </View>
        <Text style={styles.info}>{facility.equipment}</Text>
        <View style={{}}>
          <View
            style={{
              marginHorizontal: 5,
              paddingVertical: 10,
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingTop: 20,
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingVertical: 10,
                flex: 1
              }}
            >
              <View style={{flexDirection: 'row',}}>
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

              <Pressable
                onPress={handleOpenReviewPopup}
                style={styles.reviewButton}
              >
                <Text>리뷰 쓰기</Text>
              </Pressable>
            </View>
            
            {isReviewPopupVisible && (
              <WriteReviewPopup
                facilityId = {facilityId}
                onClose={handleCloseReviewPopup}
                onSave={handleSaveReview}
              /> //리뷰 모달 창에 FacilityId 전달
            )}
          </View>
          <ScrollView
            horizontal={true}
            style={styles.reviewContainer}
            contentContainerStyle={{ alignItems: 'center' }}
          >
            {facility.facilityReviewList.map((review, id) => (
              <View style={styles.review} key={id}>
                <Text style={{ fontSize: 15, fontWeight: '700' }}>
                  {review.title}
                </Text>
                <Text style={{ color: PRIMARY.DARK }}>
                  {review.star}
                </Text>
                <Text>{review.content}</Text>
              </View>
            ))}
          </ScrollView>
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
  icon: {
    height: 30,
    width: 30,
    marginHorizontal: 3
  },
  reviewTitle: {
    fontSize: 23,
    fontWeight: '700',
    paddingLeft: 20,
  },
  reviewContainer: {
    backgroundColor: GRAY.LIGHT,
    height: 190,
  },
  reviewButton:{
    alignItems: 'center', 
    justifyContent: 'center',
    padding: 7,
    borderColor: PRIMARY.DEFAULT,
    borderWidth: 2,
    marginRight: 15,
    borderRadius: 10
  },
  review: {
    width: 170,
    height: 140,
    backgroundColor: WHITE,
    borderRadius: 20,
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
