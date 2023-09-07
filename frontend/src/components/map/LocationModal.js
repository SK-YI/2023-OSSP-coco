import {
  Image,
  Modal,
  Platform,
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import PropTypes from 'prop-types';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useCallback, useEffect, useState } from 'react';
import { useUserContext } from '../../contexts/UserContext';
import { URL } from '../../../env';
import { GRAY, PRIMARY, WHITE } from '../../colors';
import { AntDesign } from '@expo/vector-icons';
import FacilityMap from '../facility/facilityMap';
import toiletIcon from 'frontend/assets/facilityIcons/toilet.png';
import rampIcon from 'frontend/assets/facilityIcons/ramp.png';
import elevatorIcon from 'frontend/assets/facilityIcons/elevator.png';
import blockIcon from 'frontend/assets/facilityIcons/block.png';
import escapeIcon from 'frontend/assets/facilityIcons/escape.png';
import showerIcon from 'frontend/assets/facilityIcons/shower.png';
import parkingIcon from 'frontend/assets/facilityIcons/parking.png';
import vendingIcon from 'frontend/assets/facilityIcons/vending.png';
import WriteReviewPopup from '../facility/reviewPopup';

const LocationModal = ({ item, modalOpen, setModalOpen }) => {
  const [token] = useUserContext();

  const [facility, setFacility] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false); // 새로고침 상태를 관리

  const toggleFavorite = () => {
    setIsFavorite((prevState) => !prevState);
    // PostLikePUT API 호출
    facilityLikePUT(facility.id);
  };

  //시설 상세정보 GET
  const facilityInfoGetApi = (facilityId) => {
    console.log(token);
    fetch(`${URL}/user/facilities/${facilityId}`, {
      method: 'GET', //메소드 지정
      headers: {
        //데이터 타입 지정
        'Content-Type': 'application/json; charset=utf-8',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json()) // 리턴값이 있으면 리턴값에 맞는 req 지정
      .then((res) => {
        console.log(res); // 리턴값에 대한 처리
        // 성공하면!
        setFacility(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    console.log(item);
    facilityInfoGetApi(item.facilityId);
  }, [item]);

  const facilityLikePUT = (facilityId) => {
    console.log(token);
    fetch(`${URL}/user/facilities/${facilityId}/like`, {
      method: 'PUT', //메소드 지정
      headers: {
        //데이터 타입 지정
        'Content-Type': 'application/json; charset=utf-8',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        // 즐겨찾기 상태 업데이트

        // 시설 정보 다시 불러오기
        facilityInfoGetApi(facilityId);
      })
      .catch((error) => {
        console.log(error);
      });
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

  const onRefresh = useCallback(() => {
    setIsRefreshing(true); // 새로고침 시작
    facilityInfoGetApi(facility.facilityId);
    setIsRefreshing(false); // 새로고침 종료
  }, [facility]);

  return (
    <Modal
      visible={modalOpen}
      animationType="slide"
      transparent={false}
      presentationStyle={'pageSheet'}
    >
      <View style={styles.header}>
        <Pressable
          style={styles.button}
          onPress={() => setModalOpen(false)}
          hitSlop={10}
        >
          <MaterialCommunityIcons
            name={'close-box'}
            size={24}
            style={styles.closeIcon}
          />
        </Pressable>
      </View>
      <View>
        {facility && (
          <ScrollView
            refreshControl={
              <RefreshControl
                refreshing={isRefreshing} // 새로고침 여부
                onRefresh={onRefresh}
                tintColor={PRIMARY.DEFAULT}
              />
            }
          >
            <View>
              <Text style={styles.title}>{facility.name}</Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              >
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
                <FacilityMap facility={facility} />
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  paddingTop: 8,
                  marginHorizontal: 25,
                }}
              >
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
                {facility.equipment.includes('대변기') ||
                facility.equipment.includes('소변기') ? (
                  <Image style={styles.icon} source={toiletIcon} />
                ) : null}
                {facility.equipment.includes('샤워실') && (
                  <Image style={styles.icon} source={showerIcon} />
                )}
              </View>
              <Text
                style={[
                  styles.info,
                  { fontSize: 20, fontWeight: '500', paddingTop: 15 },
                ]}
              >
                시설 정보
              </Text>
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
                      flex: 1,
                    }}
                  >
                    <View style={{ flexDirection: 'row' }}>
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
                        {facility.avgReview}
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
                      facilityId={facility.facilityId}
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
                  {facility.facilityReviewList.length === 0 ? (
                    <Text
                      style={{
                        alignItems: 'center',
                        marginHorizontal: 90,
                        fontSize: 18,
                      }}
                    >
                      시설의 첫 리뷰를 남겨보세요!
                    </Text>
                  ) : (
                    facility.facilityReviewList
                      .slice()
                      .reverse() // 역순(최신순)으로 리뷰 배열
                      .map((review, id) => (
                        <View style={styles.review} key={id}>
                          <Text style={{ fontSize: 15, fontWeight: '700' }}>
                            {review.title}
                          </Text>
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                              paddingVertical: 5,
                            }}
                          >
                            <AntDesign
                              name="star"
                              size={18}
                              color={PRIMARY.DEFAULT}
                              style={{ marginRight: 2 }}
                            />
                            <Text style={{ color: PRIMARY.DARK }}>
                              {review.star}
                            </Text>
                          </View>
                          <Text>{review.content}</Text>
                        </View>
                      ))
                  )}
                </ScrollView>
              </View>
            </View>
          </ScrollView>
        )}
      </View>
    </Modal>
  );
};

LocationModal.propTypes = {
  item: PropTypes.object,
  modalOpen: PropTypes.bool,
  setModalOpen: PropTypes.func,
};

const styles = StyleSheet.create({
  header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  button: {
    margin: 10,
    padding: 10,
  },
  closeIcon: {
    color: 'gray',
    fontSize: 30,
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
    marginHorizontal: 3,
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
  reviewButton: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 7,
    borderColor: PRIMARY.DEFAULT,
    borderWidth: 1.3,
    marginRight: 15,
    borderRadius: 10,
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
    paddingTop: 12,
    lineHeight: 25,
  },
});

export default LocationModal;
