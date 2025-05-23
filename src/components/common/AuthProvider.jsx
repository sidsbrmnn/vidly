import { jwtDecode } from 'jwt-decode';
import { useEffect, useState } from 'react';
import { AuthContext } from '../../context/auth';

const AuthProvider = ({ children }) => {
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

export default AuthProvider;
