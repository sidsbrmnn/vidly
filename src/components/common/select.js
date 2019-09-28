import React from 'react';
import Field from './field';

const Select = ({ options, ...rest }) => {
  return (
    <Field {...rest} type="select">
      <option label="" disabled />
      {options.map(option => (
        <option key={option._id} value={option._id}>
          {option.name}
        </option>
      ))}
    </Field>
  );
};

export default Select;
