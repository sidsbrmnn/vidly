import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { withAuth } from './common/auth';

const Logout = ({ auth }) => {
  const history = useHistory();

  useEffect(() => {
    auth.removeToken();
    history.push('/');
  }, [auth, history]);

  return null;
};

export default withAuth(Logout);
