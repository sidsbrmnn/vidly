import React, { Component } from 'react';
import { object, string } from 'yup';
import Input from './common/input';

class Login extends Component {
  state = {
    formData: {
      username: '',
      password: '',
    },
    errors: {},
  };

  schema = object().shape({
    username: string().email().required(),
    password: string().required(),
  });

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

    this.setState({ errors });

    return Object.keys(errors).length === 0;
  };

  validateField = async (path, data) => {
    const { errors } = this.state;

    try {
      await this.schema.validateAt(path, data);
      delete errors[path];
    } catch (error) {
      errors[path] = error.message;
    }

    this.setState({ errors });
  };

  handleSubmit = async e => {
    e.preventDefault();

    const { history } = this.props;

    const ok = await this.validate();
    if (!ok) return;

    history.push('/');
  };

  handleChange = async e => {
    const { name, value } = e.target;
    const { formData } = this.state;

    formData[name] = value;
    this.setState({ formData });

    await this.validateField(name, formData);
  };

  render() {
    const { formData, errors } = this.state;

    return (
      <section className="py-5">
        <h1>Login</h1>

        <form className="mt-4" onSubmit={this.handleSubmit} noValidate>
          <div className="form-row">
            <Input
              type="email"
              name="username"
              label="Username"
              className="col-md-6 col-lg-4"
              placeholder="Username"
              value={formData.username}
              onChange={this.handleChange}
              required
              autoFocus
              autoComplete="email"
              error={errors.username}
            />
          </div>
          <div className="form-row">
            <Input
              type="password"
              name="password"
              label="Password"
              className="col-md-6 col-lg-4"
              placeholder="Password"
              value={formData.password}
              onChange={this.handleChange}
              required
              autoComplete="current-password"
              error={errors.password}
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={Object.keys(errors).length > 0}
          >
            Login
          </button>
        </form>
      </section>
    );
  }
}

export default Login;
