import React, { Component } from 'react';
import { object, string } from 'yup';
import { cx } from '../utils/cx';

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
            <div className="form-group col-md-6 col-lg-4">
              <label htmlFor="username">Username</label>
              <input
                type="email"
                name="username"
                id="username"
                className={cx('form-control', errors.username && 'is-invalid')}
                placeholder="Username"
                value={formData.username}
                onChange={this.handleChange}
                required
                autoFocus
                autoComplete="email"
                error={errors.username}
              />
              {errors.username && (
                <div className="invalid-feedback">{errors.username}</div>
              )}
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-md-6 col-lg-4">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                className={cx('form-control', errors.password && 'is-invalid')}
                placeholder="Password"
                value={formData.password}
                onChange={this.handleChange}
                required
                autoComplete="current-password"
                error={errors.password}
              />
              {errors.password && (
                <div className="invalid-feedback">{errors.password}</div>
              )}
            </div>
          </div>
          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </form>
      </section>
    );
  }
}

export default Login;
