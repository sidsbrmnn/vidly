import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { object, string } from 'yup';
import { login } from '../services/authService';
import { useAuth } from './common/Auth';
import Field from './common/Field';

const schema = object().shape({
  email: string().email().required().label('Email address'),
  password: string().required().label('Password'),
});

const Login = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const origin = location.state?.referrer?.pathname || '/';

  const methods = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });
  const {
    formState: { isSubmitting },
    handleSubmit,
    setError,
  } = methods;

  const onSubmit = async values => {
    try {
      const { data: token } = await login(values);
      auth.setToken(token);
      navigate(origin, { replace: true });
    } catch (error) {
      const { response } = error;
      if (response && response.status === 400) {
        setError('email', { message: response.data });
      }
    }
  };

  if (auth.payload) {
    return <Navigate to={origin} replace />;
  }

  return (
    <section className="py-5">
      <h1>Login</h1>

      <FormProvider {...methods}>
        <form className="mt-4" onSubmit={handleSubmit(onSubmit)} noValidate>
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
        </form>
      </FormProvider>
    </section>
  );
};

export default Login;
