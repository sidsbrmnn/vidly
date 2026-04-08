import { jwtDecode } from 'jwt-decode';
import { useState } from 'react';
import { AuthContext } from '../../context/auth';

const AuthProvider = ({ children }) => {
  const [payload, setPayload] = useState(() => {
    try {
      const token = localStorage.getItem('token');
      return token ? jwtDecode(token) : null;
    } catch {
      localStorage.removeItem('token');
      return null;
    }
  });

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
    <AuthContext value={{ payload, setToken, removeToken }}>
      {children}
    </AuthContext>
  );
};

export default AuthProvider;
