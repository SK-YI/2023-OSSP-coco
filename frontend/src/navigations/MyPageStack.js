import { createStackNavigator } from '@react-navigation/stack';
import MyPageScreen from '../screens/myPage/MypageScreen';
import MyPageDetailScreen from '../screens/myPage/MyPageDetailScreen';
import MyPostScreen from '../screens/myPage/MyPostScreen';
import MyCommentScreen from '../screens/myPage/MyCommentScreen';
import MyFacilityScreen from '../screens/myPage/MyFacilityScreen';
import MyReviewScreen from '../screens/myPage/MyReviewScreen';
import MyFacilityDetailScreen from '../screens/myPage/MyFacilityDetailScreen';


const MyPageStack = createStackNavigator();

const MyPageStackNavigation = () => {
    return (
        <MyPageStack.Navigator initialRouteName="마이페이지"  screenOptions={{
            cardStyle: { backgroundColor: 'white' }
        }}>
            <MyPageStack.Screen name='내가 즐겨찾기한 시설 정보' component={MyFacilityDetailScreen} />
            <MyPageStack.Screen name='내가 작성한 리뷰' component={MyReviewScreen} />
            <MyPageStack.Screen name='내가 즐겨찾기한 시설' component={MyFacilityScreen} />
            <MyPageStack.Screen name='내가 작성한 댓글' component={MyCommentScreen} />
            <MyPageStack.Screen name='내가 작성한 글' component={MyPostScreen} />
            <MyPageStack.Screen name='계정 정보' component={MyPageDetailScreen} />
            <MyPageStack.Screen options={{headerShown: false}} name='마이페이지' component={MyPageScreen} />
        </MyPageStack.Navigator>  
    );
};
 
export default MyPageStackNavigation;