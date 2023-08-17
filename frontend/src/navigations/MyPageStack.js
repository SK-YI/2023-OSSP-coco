import { createStackNavigator } from '@react-navigation/stack';
import MyPageScreen from '../screens/myPage/MypageScreen';
import MyPageDetailScreen from '../screens/myPage/MyPageDetailScreen';

const MyPageStack = createStackNavigator();

const MyPageStackNavigation = () => {
    return (
        <MyPageStack.Navigator initialRouteName="마이페이지"  screenOptions={{
            cardStyle: { backgroundColor: 'white' }
        }}>
            <MyPageStack.Screen name='계정 정보' component={MyPageDetailScreen} />
            <MyPageStack.Screen options={{headerShown: false}} name='마이페이지' component={MyPageScreen} />
        </MyPageStack.Navigator>  
    );
};
 
export default MyPageStackNavigation;