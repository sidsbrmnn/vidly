import { Redirect, useHistory } from 'react-router-dom';
import { object, string } from 'yup';
import { register } from '../services/userService';
import { useAuth } from './common/auth';
import Field from './common/field';
import Form from './common/form';

const Register = () => {
  const auth = useAuth();
  const history = useHistory();

  const schema = object().shape({
    name: string().required(),
    email: string().email().required(),
    password: string().required(),
  });

  const handleSubmit = async (values, { setFieldError, setSubmitting }) => {
    try {
      const { headers } = await register(values);
      const token = headers['x-auth-token'];
      auth.setToken(token);
      history.push('/');
    } catch (error) {
      const { response } = error;
      if (response && response.status === 400) {
        setFieldError('email', response.data);
      }
      setSubmitting(false);
    }
  };

  if (auth.payload) {
    return <Redirect to="/" />;
  }

  return (
    <section className="py-5">
      <h1>Register</h1>

      <Form
        className="mt-4"
        initialValues={{ name: '', email: '', password: '' }}
        onSubmit={handleSubmit}
        validationSchema={schema}
      >
        {({ isSubmitting }) => (
          <>
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
          </>
        )}
      </Form>
    </section>
  );
};

export default Register;
