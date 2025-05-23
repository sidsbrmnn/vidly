import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../context/auth';

const Logout = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    auth.removeToken();
    navigate('/', { replace: true });
  }, [auth, navigate]);

  return null;
};

export default Logout;
