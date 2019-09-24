import { Component } from 'react';

class Form extends Component {
  state = {
    formData: {},
    errors: {},
  };

  validate = async () => {
    const { formData } = this.state;
    const errors = {};

    try {
      await this.schema.validate(formData, { abortEarly: false });
    } catch (error) {
      error.inner.forEach(err => {
        errors[err.path] = err.message;
      });
    }

    return errors;
  };

  validateProperty = async (path, data) => {
    try {
      await this.schema.validateAt(path, data);
    } catch (error) {
      return error.message;
    }
  };

  handleChange = async e => {
    const { name, value } = e.currentTarget;

    const formData = { ...this.state.formData };
    const errors = { ...this.state.errors };

    formData[name] = value;
    const errorMessage = await this.validateProperty(name, formData);
    if (errorMessage) {
      errors[name] = errorMessage;
    } else {
      delete errors[name];
    }

    this.setState({ formData, errors });
  };

  handleSubmit = async e => {
    e.preventDefault();

    const errors = await this.validate();
    this.setState({ errors });
    if (Object.keys(errors).length > 0) return;

    if (this.onSubmit) {
      await this.onSubmit();
    }
  };
}

export default Form;
