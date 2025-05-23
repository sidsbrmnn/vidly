import { Navigate, useLocation } from 'react-router';
import { useAuth } from '../../context/auth';

const RequireAuth = ({ children }) => {
  const auth = useAuth();
  const location = useLocation();

  if (!auth.payload) {
    return <Navigate to="/login" state={{ referrer: location }} replace />;
  }

  return children;
};

export default RequireAuth;
