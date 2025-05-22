import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from './common/Auth';

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
