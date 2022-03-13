import { createContext, useState } from 'react';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState();
  const token = localStorage.getItem('token');
  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {console.log(token)}
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
