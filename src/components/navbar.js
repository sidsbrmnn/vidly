import PropTypes from 'prop-types';
import { Component, Fragment } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { cx } from '../utils/cx';
import { withAuth } from './common/auth';

class Navbar extends Component {
  state = {
    isOpen: false,
  };

  toggleNavbar = () => {
    this.setState(prevState => ({ isOpen: !prevState.isOpen }));
  };

  render() {
    const { auth, links } = this.props;
    const { isOpen } = this.state;

    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <Link to="/" className="navbar-brand">
            Vidly
          </Link>

          <button
            type="button"
            className="navbar-toggler"
            onClick={this.toggleNavbar}
            aria-controls="navbarSupportedContent"
            aria-expanded={isOpen}
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div
            id="navbarSupportedContent"
            className={cx('navbar-collapse collapse', isOpen && 'show')}
          >
            <ul className="navbar-nav mr-auto">
              {links.map(link => (
                <li key={link.path} className="nav-item">
                  <NavLink to={link.path} className="nav-link">
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>

            <ul className="navbar-nav ml-auto">
              {auth.payload ? (
                <Fragment>
                  <li className="nav-item">
                    <NavLink to="/profile" className="nav-link">
                      {auth.payload.name}
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="/logout" className="nav-link">
                      Logout
                    </NavLink>
                  </li>
                </Fragment>
              ) : (
                <Fragment>
                  <li className="nav-item">
                    <NavLink to="/login" className="nav-link">
                      Login
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="/register" className="nav-link">
                      Register
                    </NavLink>
                  </li>
                </Fragment>
              )}
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

Navbar.defaultProps = {
  links: [],
};

Navbar.propTypes = {
  links: PropTypes.arrayOf(
    PropTypes.shape({
      path: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ),
};

export default withAuth(Navbar);
