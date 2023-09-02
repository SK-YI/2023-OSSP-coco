import { createStackNavigator } from '@react-navigation/stack';
import MyPageScreen from '../screens/myPage/MypageScreen';
import MyPageDetailScreen from '../screens/myPage/MyPageDetailScreen';
import MyPostListScreen from '../screens/myPage/MyPostListScreen';
import MyCommentListScreen from '../screens/myPage/MyCommentListScreen';
import MyFacilityScreen from '../screens/myPage/MyFacilityScreen';
import MyReviewScreen from '../screens/myPage/MyReviewScreen';
import FacilityDetailScreen from '../screens/facility/FacilityDetailScreen';
import MyPostScreen from '../screens/myPage/MyPostScreen';
import { BLACK, PRIMARY } from '../colors';
import ModifyPostScreen from '../screens/myPage/ModifyPostScreen';

const MyPageStack = createStackNavigator();

const MyPageStackNavigation = () => {
  return (
    <MyPageStack.Navigator
      initialRouteName="마이페이지"
      screenOptions={{
        cardStyle: { backgroundColor: 'white' },
        headerTintColor: PRIMARY.DARK,
        headerTitleStyle: {
          color: BLACK,
        },
      }}
    >
      <MyPageStack.Screen
        name="내 시설 정보"
        component={FacilityDetailScreen}
      />
      <MyPageStack.Screen name="내가 작성한 리뷰" component={MyReviewScreen} />
      <MyPageStack.Screen
        name="내가 즐겨찾기한 시설"
        component={MyFacilityScreen}
      />
      <MyPageStack.Screen
        options={{ headerTitle: '' }}
        name="게시글 수정"
        component={ModifyPostScreen}
      />
      <MyPageStack.Screen
        options={{ headerTitle: '' }}
        name="내가 작성한 글"
        component={MyPostScreen}
      />
      <MyPageStack.Screen
        name="내가 작성한 댓글 리스트"
        component={MyCommentListScreen}
      />
      <MyPageStack.Screen
        name="내가 작성한 글 리스트"
        component={MyPostListScreen}
      />
      <MyPageStack.Screen name="계정 정보" component={MyPageDetailScreen} />
      <MyPageStack.Screen
        options={{ headerShown: false }}
        name="마이페이지"
        component={MyPageScreen}
      />
    </MyPageStack.Navigator>
  );
};

export default MyPageStackNavigation;
