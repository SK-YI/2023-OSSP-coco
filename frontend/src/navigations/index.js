import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './AuthStack';
// import { useState } from 'react';
import TabNavigation from './Tap';
import { useUserContext } from '../contexts/UserContext';

const Navigation = () => {
  const [token] = useUserContext();

  return (
    <NavigationContainer>
      {token !== '' ? <TabNavigation /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default Navigation;