import PropTypes from 'prop-types';
import React, { Children, Component, createContext } from 'react';

export const FormContext = createContext();

const isEqual = (a, b) => {
  if (a === b) return true;
  if (a === null || b === null) return false;
  if (typeof a !== 'object' || typeof b !== 'object') return false;
  if (Object.keys(a).length !== Object.keys(b).length) return false;

  for (const prop in a) {
    if (b.hasOwnProperty(prop)) {
      if (!isEqual(a[prop], b[prop])) return false;
    } else {
      return false;
    }
  }

  return true;
};

class Form extends Component {
  initialValues = {};
  didMount = false;
  fields = {};

  constructor(props) {
    super(props);

    this.state = {
      values: props.initialValues || {},
      touched: Object.keys(props.initialValues || {}).reduce((acc, key) => {
        acc[key] = false;
        return acc;
      }, {}),
      errors: {},
      isSubmitting: false,
      isValidating: false,
    };

    this.initialValues = props.initialValues || {};
  }

  componentDidMount() {
    this.didMount = true;
  }

  componentWillUnmount() {
    this.didMount = false;

    if (this.validator) {
      this.validator();
    }
  }

  componentDidUpdate(prevProps) {
    const { enableReinitialize, initialValues } = this.props;
    if (
      enableReinitialize &&
      !isEqual(prevProps.initialValues, initialValues)
    ) {
      this.initialValues = initialValues;
      this.resetForm(initialValues);
    }
  }

  setErrors = errors => {
    this.setState({ errors });
  };

  setTouched = touched => {
    const { validateOnBlur } = this.props;

    this.setState({ touched }, () => {
      const { values } = this.state;
      if (validateOnBlur) {
        this.validateForm(values);
      }
    });
  };

  setValues = values => {
    this.setState({ values }, () => {
      const { validateOnChange } = this.props;
      if (validateOnChange) {
        this.validateForm(values);
      }
    });
  };

  setSubmitting = isSubmitting => {
    if (this.didMount) {
      this.setState({ isSubmitting });
    }
  };

  registerField = (name, C) => {
    this.fields[name] = C;
  };

  unregisterField = name => {
    delete this.fields[name];
  };

  validateField = field => {
    const { validationSchema } = this.props;

    this.setState({ isValidating: true });

    if (validationSchema) {
      return validationSchema
        .validateAt(field, this.state.values)
        .then(() => {
          this.setState(prevState => ({
            errors: {
              ...prevState.errors,
              [field]: undefined,
            },
          }));
        })
        .catch(err => {
          this.setState(prevState => ({
            errors: {
              ...prevState.errors,
              [field]: err.message,
            },
          }));
        })
        .finally(() => {
          this.setState({ isValidating: false });
        });
    }
  };

  runValidationSchema = values => {
    return new Promise((resolve, reject) => {
      const { validationSchema } = this.props;

      if (validationSchema) {
        validationSchema
          .validate(values, { abortEarly: false })
          .then(() => {
            resolve({});
          })
          .catch(err => {
            const errors = err.inner.reduce((acc, error) => {
              acc[error.path] = error.message;
              return acc;
            }, {});
            resolve(errors);
          });
      }
    });
  };

  validateForm = (values = this.state.values) => {
    this.setState({ isValidating: true });
    return this.runValidationSchema(values).then(errors => {
      if (this.isMount) {
        this.setState(prevState => ({
          isValidating: false,
          ...(isEqual(prevState.errors, errors) ? {} : { errors }),
        }));
      }
      return errors;
    });
  };

  handleChange = e => {
    const { checked, id, name, type, value } = e.currentTarget;

    const { validateOnChange } = this.props;

    const field = name || id;
    let newValue = value;
    if (/number|range/.test(type)) {
      const parsed = parseFloat(value);
      newValue = isNaN(parsed) ? '' : parsed;
    }
    if (/checkbox/.test(type)) {
      newValue = checked;
    }

    this.setState(
      prevState => ({
        values: {
          ...prevState.values,
          [field]: newValue,
        },
        touched: {
          ...prevState.touched,
          [field]: true,
        },
      }),
      () => {
        if (validateOnChange) {
          this.validateField(field);
        }
      }
    );
  };

  setFieldValue = (field, value, shouldValidate = true) => {
    const { validateOnChange } = this.props;

    this.setState(
      prevState => ({
        values: {
          ...prevState.values,
          [field]: value,
        },
        touched: {
          ...prevState.touched,
          [field]: true,
        },
        isDirty: true,
      }),
      () => {
        if (validateOnChange && shouldValidate) {
          this.validateField(field);
        }
      }
    );
  };

  handleSubmit = e => {
    e.preventDefault();

    if (typeof document !== 'undefined') {
      const activeElement = document.activeElement || document.body;
      if (
        activeElement !== null &&
        activeElement instanceof HTMLButtonElement
      ) {
        if (!activeElement.getAttribute('type')) {
          console.warn(
            "You should not use a button without a 'type' attribute. Please use 'type=\"button\"' or 'type=\"submit\"'"
          );
        }
      }
    }

    this.submitForm();
  };

  submitForm = () => {
    const { onSubmit } = this.props;
    const { values } = this.state;

    this.setState(prevState => ({
      touched: Object.keys(prevState.values).reduce((acc, key) => {
        acc[key] = true;
        return acc;
      }, {}),
      isSubmitting: true,
      submitCount: prevState.submitCount + 1,
    }));

    this.validateForm(values).then(combinedErrors => {
      const isValid = Object.keys(combinedErrors).length === 0;
      if (isValid) {
        onSubmit(values, this.getActions());
      }
    });
  };

  handleBlur = e => {
    const { validateOnBlur } = this.props;

    const { name, id } = e.currentTarget;
    const field = name || id;

    this.setState(prevState => ({
      touched: {
        ...prevState.touched,
        [field]: true,
      },
    }));

    if (validateOnBlur) {
      this.validateField(field);
    }
  };

  setFieldTouched = (field, touched = true, shouldValidate = true) => {
    const { validateOnBlur } = this.props;

    this.setState(
      prevState => ({
        touched: {
          ...prevState.touched,
          [field]: touched,
        },
      }),
      () => {
        if (validateOnBlur && shouldValidate) {
          this.validateField(field);
        }
      }
    );
  };

  setFieldError = (field, message) => {
    this.setState(prevState => ({
      errors: {
        ...prevState.errors,
        [field]: message,
      },
    }));
  };

  resetForm = nextValues => {
    const { initialValues } = this.props;

    const values = nextValues || initialValues;
    this.initialValues = values;

    this.setState({
      values,
      touched: {},
      errors: {},
      isSubmitting: false,
      isValidating: false,
      submitCount: 0,
    });
  };

  handleReset = () => {
    const { onReset } = this.props;
    const { values } = this.state;

    if (onReset) {
      const ret = onReset(values, this.getActions());
      if (typeof ret === 'object' && typeof ret.then === 'function') {
        ret.then(() => {
          this.resetForm();
        });
      } else {
        this.resetForm();
      }
    } else {
      this.resetForm();
    }
  };

  getActions = () => {
    return {
      resetForm: this.resetForm,
      submitForm: this.submitForm,
      validateForm: this.validateForm,
      validateField: this.validateField,
      setErrors: this.setErrors,
      setFieldError: this.setFieldError,
      setFieldTouched: this.setFieldTouched,
      setFieldValue: this.setFieldValue,
      setSubmitting: this.setSubmitting,
      setTouched: this.setTouched,
      setValues: this.setValues,
    };
  };

  getComputedProps = () => {
    const dirty = !isEqual(this.initialValues, this.state.values);
    return {
      dirty,
      isValid: dirty
        ? this.state.errors && Object.keys(this.state.errors).length === 0
        : false,
      initialValues: this.initialValues,
    };
  };

  getProps = () => {
    return {
      ...this.state,
      ...this.getActions(),
      ...this.getComputedProps(),
      registerField: this.registerField,
      unregisterField: this.unregisterField,
      handleBlur: this.handleBlur,
      handleChange: this.handleChange,
      handleReset: this.handleReset,
      handleSubmit: this.handleSubmit,
      validateOnChange: this.props.validateOnChange,
      validateOnBlur: this.props.validateOnBlur,
    };
  };

  getContext = () => {
    return {
      ...this.getProps(),
      validationSchema: this.props.validationSchema,
    };
  };

  render() {
    const { children, className } = this.props;

    const props = this.getProps();
    const contextValue = this.getContext();

    return (
      <FormContext.Provider value={contextValue}>
        <form className={className} onSubmit={this.handleSubmit} noValidate>
          {typeof children === 'function'
            ? children(props)
            : Children.map(children, child => {
                if (React.isValidElement(child)) {
                  return React.cloneElement(child, { ...props });
                }
                return child;
              })}
        </form>
      </FormContext.Provider>
    );
  }
}

Form.defaultProps = {
  enableReinitialize: false,
  validateOnChange: true,
  validateOnBlur: true,
};

Form.propTypes = {
  initialValues: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
  onReset: PropTypes.func,
  validationSchema: PropTypes.object,
  validateOnChange: PropTypes.bool,
  validateOnBlur: PropTypes.bool,
  enableReinitialize: PropTypes.bool,
  className: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
};

export default Form;
