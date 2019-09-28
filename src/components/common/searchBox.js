import PropTypes from 'prop-types';
import React from 'react';
import { cx } from '../../utils/cx';

const SearchBox = ({ className, onChange, value }) => {
  return (
    <input
      type="text"
      name="query"
      className={cx('form-control', className)}
      placeholder="Search..."
      value={value || ''}
      onChange={onChange ? e => onChange(e.currentTarget.value) : undefined}
      autoComplete="off"
      autoCorrect="off"
    />
  );
};

SearchBox.defaultProps = {
  value: '',
};

SearchBox.propTypes = {
  className: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.string,
};

export default SearchBox;
