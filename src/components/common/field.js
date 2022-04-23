import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { cx } from '../../utils/cx';
import { FormContext } from './form';

class FieldInner extends Component {
  componentDidMount() {
    const { context, name } = this.props;
    context.registerField(name, this);
  }

  componentDidUpdate(prevProps) {
    const { context, name } = this.props;
    if (prevProps.name !== name) {
      context.unregisterField(prevProps.name);
      context.registerField(name, this);
    }
  }

  componentWillUnmount() {
    const { context, name } = this.props;
    context.unregisterField(name);
  }

  render() {
    const { className, type, name, label, context, ...rest } = this.props;
    const isSelect = type === 'select';
    const C = isSelect ? 'select' : 'input';
    const { handleChange, errors, values } = context;

    return (
      <div className={cx('form-group', className)}>
        <label htmlFor={name}>{label}</label>
        <C
          {...(isSelect ? {} : { type })}
          name={name}
          id={name}
          className={cx('form-control', errors[name] && 'is-invalid')}
          value={values[name] || ''}
          onChange={handleChange}
          {...rest}
        />
        {errors[name] && <div className="invalid-feedback">{errors[name]}</div>}
      </div>
    );
  }
}

const Field = ({ type = 'text', ...rest }) => {
  return (
    <FormContext.Consumer>
      {context => <FieldInner type={type} {...rest} context={context} />}
    </FormContext.Consumer>
  );
};

Field.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  autoFocus: PropTypes.bool,
  autoComplete: PropTypes.string,
};

export default Field;
