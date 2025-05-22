import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';
import { Navigate, useNavigate } from 'react-router-dom';
import { object, string } from 'yup';
import { register } from '../services/userService';
import { useAuth } from './common/Auth';
import Field from './common/Field';

const schema = object().shape({
  name: string().required().label('Full name'),
  email: string().email().required().label('Email address'),
  password: string().required().label('Password'),
});

const Register = () => {
  const auth = useAuth();
  const navigate = useNavigate();

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
      const { headers } = await register(values);
      const token = headers['x-auth-token'];
      auth.setToken(token);
      navigate('/');
    } catch (error) {
      const { response } = error;
      if (response && response.status === 400) {
        setError('email', { message: response.data });
      }
    }
  };

  if (auth.payload) {
    return <Navigate to="/" replace />;
  }

  return (
    <section className="py-5">
      <h1>Register</h1>

      <FormProvider {...methods}>
        <form className="mt-4" onSubmit={handleSubmit(onSubmit)} noValidate>
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
        </form>
      </FormProvider>
    </section>
  );
};

export default Register;
