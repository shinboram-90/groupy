import { createContext, useState } from 'react';
import { CookiesProvider } from 'react-cookie';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState();
  return (
    <CookiesProvider>
      <AuthContext.Provider value={{ auth, setAuth }}>
        {children}
      </AuthContext.Provider>
    </CookiesProvider>
  );
};

export default AuthContext;
