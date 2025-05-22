import { Redirect, Route } from 'react-router-dom';
import { useAuth } from './Auth';

const ProtectedRoute = ({ component: C, path, render, ...rest }) => {
  const auth = useAuth();

  return (
    <Route
      to={path}
      render={props => {
        if (auth.payload) {
          return C ? <C {...props} /> : render(props);
        }

        return (
          <Redirect
            to={{
              pathname: '/login',
              state: { referrer: props.location.pathname },
            }}
          />
        );
      }}
      {...rest}
    />
  );
};

export default ProtectedRoute;
