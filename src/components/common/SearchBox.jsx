import clsx from 'clsx';
import PropTypes from 'prop-types';

const SearchBox = ({ className, onChange, value }) => {
  return (
    <input
      type="text"
      name="query"
      className={clsx('form-control', className)}
      placeholder="Search..."
      value={value || ''}
      onChange={onChange ? e => onChange(e.currentTarget.value) : undefined}
      autoComplete="off"
      autoCorrect="off"
    />
  );
};

SearchBox.propTypes = {
  className: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.string,
};

export default SearchBox;
