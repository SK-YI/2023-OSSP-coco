import { UserProvider } from './contexts/UserContext';
import Navigation from './navigations';
// import PostScreen from './screens/community/PostScreen';

const App = () => {
  return (
    // <NavigationContainer>
    //   <TabNavigation />
    // </NavigationContainer>
    <UserProvider>
      <Navigation />
    </UserProvider>
  );
};
export default App;
