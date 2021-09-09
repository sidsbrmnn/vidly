import PropTypes from "prop-types";

/**
 *
 * @type {import("react").FunctionComponent}
 */
const Header = ({ children }) => {
  return (
    <header>
      <div className="px-4 py-6 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900">{children}</h1>
      </div>
    </header>
  );
};

Header.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Header;
