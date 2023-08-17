import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './AuthStack';
// import { useState } from 'react';
import TabNavigation from './Tap';

const Navigation = () => {
  // const [user, setUser] = useState(true);
  const user = true;
  return (
    <NavigationContainer>
      {user ? <TabNavigation /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default Navigation;
