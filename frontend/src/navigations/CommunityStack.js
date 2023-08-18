import { createStackNavigator } from '@react-navigation/stack';
import PostListScreen from '../screens/community/PostListScreen';
import PostScreen from '../screens/community/PostScreen';
import WritePostScreen from '../screens/community/WritePostScreen';

const CommunityStack = createStackNavigator();

const CommunityStackNavigation = () => {
  return (
    <CommunityStack.Navigator
      // screenOptions={{
      //   headerShown: false,
      // }}
      initialRouteName="목록"
    >
      <CommunityStack.Screen
        options={{ headerShown: false }}
        name="목록"
        component={PostListScreen}
      />
      <CommunityStack.Screen name="커뮤니티" component={PostScreen} />
      <CommunityStack.Screen name="글쓰기" component={WritePostScreen} />
    </CommunityStack.Navigator>
  );
};

export default CommunityStackNavigation;
