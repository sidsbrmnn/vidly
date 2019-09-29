import React, { Component, Fragment } from 'react';
import { object, string } from 'yup';
import Field from './common/field';
import Form from './common/form';
import { register } from '../services/user';

class Register extends Component {
  schema = object().shape({
    name: string().required(),
    email: string().email().required(),
    password: string().required(),
  });

  handleSubmit = async (values, { setFieldError, setSubmitting }) => {
    try {
      await register(values);
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
        <h1>Register</h1>

        <Form
          className="mt-4"
          initialValues={{ name: '', email: '', password: '' }}
          onSubmit={this.handleSubmit}
          validationSchema={this.schema}
        >
          {({ isSubmitting }) => (
            <Fragment>
              <div className="form-row">
                <Field
                  type="text"
                  name="name"
                  label="Full name"
                  className="col-md-6 col-lg-4"
                  placeholder="John Doe"
                  required
                  autoFocus
                  autoComplete="name"
                />
              </div>
              <div className="form-row">
                <Field
                  type="email"
                  name="email"
                  label="Email address"
                  className="col-md-6 col-lg-4"
                  placeholder="johndoe@example.com"
                  required
                  autoComplete="email"
                />
              </div>
              <div className="form-row">
                <Field
                  type="password"
                  name="password"
                  label="Password"
                  className="col-md-6 col-lg-4"
                  placeholder="********"
                  required
                  autoComplete="new-password"
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={isSubmitting}
              >
                Register
              </button>
            </Fragment>
          )}
        </Form>
      </section>
    );
  }
}

export default Register;
