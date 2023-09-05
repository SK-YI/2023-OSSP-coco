import { createStackNavigator } from '@react-navigation/stack';
import PostListScreen from '../screens/community/PostListScreen';
import PostScreen from '../screens/community/PostScreen';
import WritePostScreen from '../screens/community/WritePostScreen';
import SearchCommunityScreen from '../screens/community/SearchCommunityScreen';
import { BLACK, PRIMARY } from '../colors';

const CommunityStack = createStackNavigator();

const CommunityStackNavigation = () => {
  return (
    <CommunityStack.Navigator
      // screenOptions={{
      //   headerShown: false,
      // }}
      screenOptions={{
        headerTintColor: PRIMARY.DARK,
        headerTitleStyle: {
          color: BLACK,
        },
      }}
      initialRouteName="목록"
    >
      <CommunityStack.Screen
        options={{ headerShown: false }}
        name="목록"
        component={PostListScreen}
      />
      <CommunityStack.Screen
        options={{ headerTitle: '' }}
        name="커뮤니티"
        component={PostScreen}
      />
      <CommunityStack.Screen name="글쓰기" component={WritePostScreen} />
      <CommunityStack.Screen
        options={{ headerShown: false }}
        name="검색창"
        component={SearchCommunityScreen}
      />
    </CommunityStack.Navigator>
  );
};

export default CommunityStackNavigation;
