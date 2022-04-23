import { useEffect, useState } from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { number, object, string } from 'yup';
import { getGenres } from '../services/genreService';
import { getMovie, saveMovie } from '../services/movieService';
import Field from './common/field';
import Form from './common/form';
import Select from './common/select';

const MovieForm = () => {
  const history = useHistory();
  const match = useRouteMatch();

  const [genres, setGenres] = useState([]);
  const [data, setData] = useState({
    title: '',
    genreId: '',
    numberInStock: 0,
    dailyRentalRate: 0,
  });

  const schema = object().shape({
    title: string().required(),
    genreId: string().required(),
    numberInStock: number().positive().integer().max(100).required(),
    dailyRentalRate: number().positive().max(10).required(),
  });

  useEffect(() => {
    getGenres().then(({ data }) => setGenres(data));

    const movieId = match.params.id;
    if (movieId === 'new') return;

    getMovie(movieId)
      .then(({ data }) => {
        setData(mapToViewModel(data));
      })
      .catch(error => {
        if (error.response && error.response.status === 404) {
          history.replace('/not-found');
        }
      });
  }, [history, match]);

  const mapToViewModel = movie => ({
    _id: movie._id,
    title: movie.title,
    genreId: movie.genre._id,
    numberInStock: movie.numberInStock,
    dailyRentalRate: movie.dailyRentalRate,
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await saveMovie({ _id: data._id, ...values });
      history.push('/movies');
    } catch {
      setSubmitting(false);
    }
  };

  return (
    <section className="py-5">
      <h1>Movie Form {match.params.id}</h1>
      <Form
        className="mt-4"
        initialValues={data}
        enableReinitialize
        onSubmit={handleSubmit}
        validationSchema={schema}
      >
        {({ isSubmitting }) => (
          <>
            <div className="form-row">
              <Field
                name="title"
                label="Title"
                className="col-md-6 col-lg-4"
                required
                autoFocus
              />
            </div>
            <div className="form-row">
              <Select
                name="genreId"
                label="Genre"
                className="col-md-6 col-lg-4"
                required
                options={genres}
              />
            </div>
            <div className="form-row">
              <Field
                type="number"
                name="numberInStock"
                label="Number in stock"
                className="col-md-6 col-lg-4"
                required
              />
            </div>
            <div className="form-row">
              <Field
                type="number"
                name="dailyRentalRate"
                label="Daily rental rate"
                className="col-md-6 col-lg-4"
                required
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              disabled={isSubmitting}
            >
              Save
            </button>
          </>
        )}
      </Form>
    </section>
  );
};

export default MovieForm;
