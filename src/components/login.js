import React from 'react';
import { object, string } from 'yup';
import Form from './common/form';
import Input from './common/input';

class Login extends Form {
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

  onSubmit = async () => {
    const { history } = this.props;
    history.push('/');
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
