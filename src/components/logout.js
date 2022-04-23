import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from './common/auth';

const Logout = () => {
  const auth = useAuth();
  const history = useHistory();

  useEffect(() => {
    auth.removeToken();
    history.push('/');
  }, [auth, history]);

  return null;
};

export default Logout;
