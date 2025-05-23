import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';
import { Navigate, useNavigate } from 'react-router';
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

      <div className="row mt-4">
        <div className="col-md-6 col-lg-4">
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <Field
                type="text"
                name="name"
                label="Full name"
                className="mb-3"
                placeholder="John Doe"
                required
                autoFocus
                autoComplete="name"
              />
              <Field
                type="email"
                name="email"
                label="Email address"
                className="mb-3"
                placeholder="johndoe@example.com"
                required
                autoComplete="email"
              />
              <Field
                type="password"
                name="password"
                label="Password"
                className="mb-3"
                placeholder="********"
                required
                autoComplete="new-password"
              />
              <button
                type="submit"
                className="btn btn-primary"
                disabled={isSubmitting}
              >
                Register
              </button>
            </form>
          </FormProvider>
        </div>
      </div>
    </section>
  );
};

export default Register;
