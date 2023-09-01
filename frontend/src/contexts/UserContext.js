import { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [token, setToken] = useState(''); // 토큰 저장
  const [login, setLogin] = useState(true); // 로그인 여부
  return (
    <UserContext.Provider value={[token, setToken, login, setLogin]}>
      {children}
    </UserContext.Provider>
  );
};
UserProvider.propTypes = {
  children: PropTypes.node,
};

const useUserState = () => useContext(UserContext);

export { UserProvider, useUserState };
