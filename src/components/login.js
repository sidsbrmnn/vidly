import React, { Component } from 'react';
import { object, string } from 'yup';
import Field from './common/field';
import Form from './common/form';

class Login extends Component {
  schema = object().shape({
    username: string().email().required(),
    password: string().required(),
  });

  handleSubmit = values => {
    console.log('form:', values);
    setTimeout(() => {
      const { history } = this.props;
      history.push('/');
    }, 1000);
  };

  render() {
    return (
      <section className="py-5">
        <h1>Login</h1>

        <Form
          className="mt-4"
          initialValues={{ username: '', password: '' }}
          onSubmit={this.handleSubmit}
          validationSchema={this.schema}
        >
          {({ isSubmitting }) => (
            <React.Fragment>
              <div className="form-row">
                <Field
                  type="email"
                  name="username"
                  label="Username"
                  className="col-md-6 col-lg-4"
                  placeholder="Username"
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
