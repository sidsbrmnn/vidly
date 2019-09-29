import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { withAuth } from './auth';

const ProtectedRoute = ({ auth, component: C, path, render, ...rest }) => {
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

export default withAuth(ProtectedRoute);
