import { Redirect, useHistory, useLocation } from 'react-router-dom';
import { object, string } from 'yup';
import { login } from '../services/authService';
import { useAuth } from './common/auth';
import Field from './common/field';
import Form from './common/form';

const Login = () => {
  const auth = useAuth();
  const history = useHistory();
  const location = useLocation();

  const schema = object().shape({
    email: string().email().required(),
    password: string().required(),
  });

  const handleSubmit = async (values, { setFieldError, setSubmitting }) => {
    try {
      const { data: token } = await login(values);
      auth.setToken(token);
      history.push(location.state?.referrer || '/');
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
      <h1>Login</h1>

      <Form
        className="mt-4"
        initialValues={{ email: '', password: '' }}
        onSubmit={handleSubmit}
        validationSchema={schema}
      >
        {({ isSubmitting }) => (
          <>
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
          </>
        )}
      </Form>
    </section>
  );
};

export default Login;
