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
    const { className, name, label, component, context, ...rest } = this.props;
    let C = component;
    const { handleChange, errors, values } = context;

    if (typeof C !== 'string') {
      console.warn(
        'Field component should be a HTML element. Using input as default.'
      );
      C = 'input';
    }

    return (
      <div className={cx('form-group', className)}>
        <label htmlFor={name}>{label}</label>
        <C
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

const Field = props => {
  return (
    <FormContext.Consumer>
      {context => <FieldInner {...props} context={context} />}
    </FormContext.Consumer>
  );
};

Field.defaultProps = {
  component: 'input',
  type: 'text',
};

Field.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  component: PropTypes.oneOfType([PropTypes.string, PropTypes.elementType]),
  type: PropTypes.string,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  autoFocus: PropTypes.bool,
  autoComplete: PropTypes.string,
};

export default Field;
