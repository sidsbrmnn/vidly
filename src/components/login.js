import React, { Component } from 'react';
import { object, string } from 'yup';
import Field from './common/field';
import Form from './common/form';
import { login } from '../services/authService';

class Login extends Component {
  schema = object().shape({
    email: string().email().required(),
    password: string().required(),
  });

  handleSubmit = async (values, { setFieldError, setSubmitting }) => {
    try {
      await login(values);
    } catch (error) {
      const { response } = error;
      if (response && response.status === 400) {
        setFieldError('email', response.data);
      }

      setSubmitting(false);
    }
  };

  render() {
    return (
      <section className="py-5">
        <h1>Login</h1>

        <Form
          className="mt-4"
          initialValues={{ email: '', password: '' }}
          onSubmit={this.handleSubmit}
          validationSchema={this.schema}
        >
          {({ isSubmitting }) => (
            <React.Fragment>
              <div className="form-row">
                <Field
                  type="email"
                  name="email"
                  label="Email address"
                  className="col-md-6 col-lg-4"
                  placeholder="Email address"
                  required
                  autoFocus
                  autoComplete="email"
                />
              </div>
              <div className="form-row">
                <Field
                  type="password"
                  name="password"
                  label="Password"
                  className="col-md-6 col-lg-4"
                  placeholder="Password"
                  required
                  autoComplete="current-password"
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={isSubmitting}
              >
                Login
              </button>
            </React.Fragment>
          )}
        </Form>
      </section>
    );
  }
}

export default Login;
