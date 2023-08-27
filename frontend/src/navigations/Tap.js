import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MapScreen from '../screens/map/MapScreen';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { PRIMARY, GRAY, WHITE } from '../colors';
import MyPageStackNavigation from './MyPageStack';
import FaciltyStackNavigation from './FacilityStack';
import CommunityStackNavigation from './CommunityStack';
import { Platform, View } from 'react-native';

const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        showLabel: false,
        activeTintColor: '#79bd9a',
        inactiveTintColor: '#a3a3a3',
        keyboardHidesTabBar: true,
      }}
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: WHITE,
          position: 'absolute',
          elevation: 0,
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
      }}
      initialRouteName="startPage"
    >
      <Tab.Screen
        name="시설 탭"
        component={FaciltyStackNavigation}
        options={{
          tabBarIcon: ({ focused }) => (
            <View>
              <AntDesign
                name="bars"
                size={35}
                color={focused ? PRIMARY.DEFAULT : GRAY.DEFAULT}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="지도 탭"
        component={MapScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                justifyContent: 'center',
                alignContent: 'center',
              }}
            >
              <Ionicons
                name="md-map-outline"
                size={35}
                color={focused ? PRIMARY.DEFAULT : GRAY.DEFAULT}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="커뮤니티 탭"
        component={CommunityStackNavigation}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                justifyContent: 'center',
                alignContent: 'center',
              }}
            >
              <AntDesign
                name="solution1"
                size={35}
                color={focused ? PRIMARY.DEFAULT : GRAY.DEFAULT}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="마이페이지 탭"
        component={MyPageStackNavigation}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                justifyContent: 'center',
                alignContent: 'center',
              }}
            >
              <AntDesign
                name="user"
                size={35}
                color={focused ? PRIMARY.DEFAULT : GRAY.DEFAULT}
              />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigation;
