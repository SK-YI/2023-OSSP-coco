import { createStackNavigator } from '@react-navigation/stack';
import FacilityScreen from '../screens/facility/FacilityScreen';
import FacilityDatailScreen from '../screens/facility/FacilityDetailScreen';
import FacilitySearchScreen from '../screens/facility/FacilitySearchScreen';
import FacilityTypeScreen from '../screens/facility/FacilityTypeScreen';
import { BLACK, PRIMARY } from '../colors';

const FaciltyStack = createStackNavigator();

const FaciltyStackNavigation = () => {
  return (
    <FaciltyStack.Navigator
      initialRouteName="시설 메인"
    >
      <FaciltyStack.Screen
        name="타입 검색 결과"
        component={FacilityTypeScreen}
        options={{headerTintColor: PRIMARY.DARK,
          headerTitleStyle: {
            color: BLACK
          },}}
      />
      <FaciltyStack.Screen
        name="검색 결과"
        component={FacilitySearchScreen}
        options={{headerTintColor: PRIMARY.DARK,
          headerTitleStyle: {
            color: BLACK
          },}}
      />
      <FaciltyStack.Screen
        name="시설 정보"
        component={FacilityDatailScreen}
        options={{headerTintColor: PRIMARY.DARK,
          headerTitleStyle: {
            color: BLACK
          },}}
      />
      <FaciltyStack.Screen
        options={{headerShown: false, headerTintColor: PRIMARY.DARK}}
        name="시설 메인"
        component={FacilityScreen}
      />
    </FaciltyStack.Navigator>
  );
};

export default FaciltyStackNavigation;
