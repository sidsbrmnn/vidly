import PropTypes from 'prop-types';
import FormControl from './FormControl';

const SearchBox = ({ className, onChange, value }) => {
  return (
    <FormControl
      name="query"
      className={className}
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
