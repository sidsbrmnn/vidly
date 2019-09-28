import React, { Component, Fragment } from 'react';
import { number, object, string } from 'yup';
import { getGenres } from '../services/fakeGenreService';
import { getMovie, saveMovie } from '../services/fakeMovieService';
import Field from './common/field';
import Form from './common/form';
import Select from './common/select';

class MovieForm extends Component {
  state = {
    genres: [],
    data: {
      title: '',
      genreId: '',
      numberInStock: 0,
      dailyRentalRate: 0,
    },
  };

  schema = object().shape({
    title: string().required(),
    genreId: string().required(),
    numberInStock: number().positive().integer().max(100).required(),
    dailyRentalRate: number().positive().max(10).required(),
  });

  componentDidMount() {
    const { history, match } = this.props;

    const genres = getGenres();
    this.setState({ genres });

    const movieId = match.params.id;
    if (movieId === 'new') return;

    const movie = getMovie(movieId);
    if (!movie) {
      return history.replace('/not-found');
    }

    console.log('movie:', movie);

    this.setState({ data: this.mapToViewModel(movie) });
  }

  mapToViewModel = movie => ({
    _id: movie._id,
    title: movie.title,
    genreId: movie.genre._id,
    numberInStock: movie.numberInStock,
    dailyRentalRate: movie.dailyRentalRate,
  });

  handleSubmit = values => {
    const { history } = this.props;
    const { data } = this.state;

    saveMovie({ _id: data._id, ...values });
    history.push('/movies');
  };

  render() {
    const { match } = this.props;
    const { data, genres } = this.state;

    return (
      <section className="py-5">
        <h1>Movie Form {match.params.id}</h1>
        <Form
          className="mt-4"
          initialValues={data}
          enableReinitialize
          onSubmit={this.handleSubmit}
          validationSchema={this.schema}
        >
          {({ isSubmitting }) => (
            <Fragment>
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
            </Fragment>
          )}
        </Form>
      </section>
    );
  }
}

export default MovieForm;
