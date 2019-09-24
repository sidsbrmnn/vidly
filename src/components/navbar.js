import PropTypes from 'prop-types';
import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const Navbar = ({ links }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link to="/" className="navbar-brand">
          Vidly
        </Link>

        <button
          type="button"
          className="navbar-toggler"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div id="navbarSupportedContent" className="collapse navbar-collapse">
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
          </ul>
        </div>
      </div>
    </nav>
  );
};

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

export default Navbar;
