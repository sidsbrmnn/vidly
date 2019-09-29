import jwtDecode from 'jwt-decode';
import React, { Component } from 'react';

export const AuthContext = React.createContext();

export class AuthProvider extends Component {
  state = {
    token: null,
    payload: null,
  };

  componentDidMount() {
    try {
      const token = localStorage.getItem('token');
      const payload = token ? jwtDecode(token) : null;
      this.setState({ token, payload });
    } catch {
      localStorage.removeItem('token');
      this.setState({ token: null, payload: null });
    }
  }

  setToken = token => {
    localStorage.setItem('token', token);
    const payload = jwtDecode(token);
    this.setState({ token, payload });
  };

  removeToken = () => {
    localStorage.removeItem('token');
    this.setState({ token: null, payload: null });
  };

  render() {
    const { token, payload } = this.state;
    const { children } = this.props;

    const contextValue = {
      token,
      payload,
      setToken: this.setToken,
      removeToken: this.removeToken,
    };

    return (
      <AuthContext.Provider value={contextValue}>
        {children}
      </AuthContext.Provider>
    );
  }
}

export const withAuth = Component => props => {
  return (
    <AuthContext.Consumer>
      {context => <Component {...props} auth={context} />}
    </AuthContext.Consumer>
  );
};
