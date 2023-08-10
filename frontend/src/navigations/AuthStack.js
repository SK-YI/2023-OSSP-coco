import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignUpScreen from '../screens/signUp/SignUpScreen';
import LoginScreen from '../screens/login/LoginScreen';
import { AuthRoutes } from './routes';
import { WHITE } from '../colors';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        contentStyle: { backgroundColor: WHITE },
        headerShown: false,
      }}
    >
      <Stack.Screen name={AuthRoutes.LOG_IN} component={LoginScreen} />
      <Stack.Screen name={AuthRoutes.SIGN_UP} component={SignUpScreen} />
    </Stack.Navigator>
  );
};

export default AuthStack;
