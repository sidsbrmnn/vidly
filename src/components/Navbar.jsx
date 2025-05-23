import clsx from 'clsx';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { Link, NavLink } from 'react-router';
import { useAuth } from './common/Auth';

const Navbar = ({ links = [] }) => {
  const auth = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => setIsOpen(prevState => !prevState);

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container">
        <Link to="/" className="navbar-brand">
          Vidly
        </Link>

        <button
          type="button"
          className="navbar-toggler"
          onClick={toggleNavbar}
          aria-controls="navbarSupportedContent"
          aria-expanded={isOpen}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          id="navbarSupportedContent"
          className={clsx('collapse navbar-collapse', isOpen && 'show')}
        >
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {links.map(link => (
              <li key={link.path} className="nav-item">
                <NavLink to={link.path} className="nav-link">
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>

          <ul className="navbar-nav ms-auto">
            {auth.payload ? (
              <>
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
              </>
            ) : (
              <>
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
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
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
