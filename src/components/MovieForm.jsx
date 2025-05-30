import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router';
import { number, object, string } from 'yup';
import { getGenres } from '../services/genreService';
import { getMovie, saveMovie } from '../services/movieService';
import Field from './common/Field';
import Select from './common/select';

const schema = object().shape({
  title: string().required().label('Title'),
  genreId: string().required().label('Genre'),
  numberInStock: number()
    .positive()
    .integer()
    .max(100)
    .required()
    .label('Number in stock'),
  dailyRentalRate: number()
    .positive()
    .max(10)
    .required()
    .label('Daily rental rate'),
});

const MovieForm = () => {
  const navigate = useNavigate();
  const { id: movieId } = useParams();

  const [genres, setGenres] = useState([]);
  const [data, setData] = useState({
    title: '',
    genreId: '',
    numberInStock: 0,
    dailyRentalRate: 0,
  });

  const methods = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
    values: data,
  });
  const {
    formState: { isSubmitting },
    handleSubmit,
  } = methods;

  useEffect(() => {
    getGenres().then(({ data }) => setGenres(data));

    if (movieId === 'new') return;

    getMovie(movieId)
      .then(({ data }) => {
        setData(mapToViewModel(data));
      })
      .catch(error => {
        if (error.response && error.response.status === 404) {
          navigate('/not-found', { replace: true });
        }
      });
  }, [movieId, navigate]);

  const mapToViewModel = movie => ({
    _id: movie._id,
    title: movie.title,
    genreId: movie.genre._id,
    numberInStock: movie.numberInStock,
    dailyRentalRate: movie.dailyRentalRate,
  });

  const onSubmit = async values => {
    try {
      await saveMovie({ _id: data._id, ...values });
      navigate('/movies');
    } catch (error) {
      console.log('Error saving movie:', error);
    }
  };

  return (
    <section className="py-5">
      <h1>{movieId === 'new' ? 'New Movie' : `Edit Movie - ${data.title}`}</h1>

      <div className="row mt-4">
        <div className="col-md-6 col-lg-4">
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <Field
                name="title"
                label="Title"
                className="mb-3"
                required
                autoFocus
              />
              <Select
                name="genreId"
                label="Genre"
                className="mb-3"
                required
                options={genres}
              />
              <Field
                type="number"
                name="numberInStock"
                label="Number in stock"
                className="mb-3"
                required
              />
              <Field
                type="number"
                name="dailyRentalRate"
                label="Daily rental rate"
                className="mb-3"
                required
              />

              <button
                type="submit"
                className="btn btn-primary"
                disabled={isSubmitting}
              >
                Save
              </button>
            </form>
          </FormProvider>
        </div>
      </div>
    </section>
  );
};

export default MovieForm;
