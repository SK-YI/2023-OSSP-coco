import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './AuthStack';
// import { useState } from 'react';
import TabNavigation from './Tap';
import { useUserState } from '../contexts/UserContext';

const Navigation = () => {
  const [user] = useUserState();

  return (
    <NavigationContainer>
      {user ? <TabNavigation /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default Navigation;
