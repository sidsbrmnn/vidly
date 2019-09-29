import { Component } from 'react';
import { withAuth } from './common/auth';

class Logout extends Component {
  componentDidMount() {
    const { auth, history } = this.props;
    auth.removeToken();
    history.push('/');
  }

  render() {
    return null;
  }
}

export default withAuth(Logout);
