import { jwtDecode } from 'jwt-decode';
import React, { useContext, useEffect, useState } from 'react';

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [payload, setPayload] = useState(null);

  useEffect(() => {
    try {
      const token = localStorage.getItem('token');
      const payload = token ? jwtDecode(token) : null;
      setPayload(payload);
    } catch {
      localStorage.removeItem('token');
      setPayload(null);
    }
  }, []);

  const setToken = token => {
    localStorage.setItem('token', token);
    const payload = jwtDecode(token);
    setPayload(payload);
  };

  const removeToken = () => {
    localStorage.removeItem('token');
    setPayload(null);
  };

  return (
    <AuthContext.Provider value={{ payload, setToken, removeToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};

export const withAuth = Component => props => {
  return (
    <AuthContext.Consumer>
      {context => <Component {...props} auth={context} />}
    </AuthContext.Consumer>
  );
};
