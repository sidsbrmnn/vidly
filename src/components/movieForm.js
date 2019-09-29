import React, { Component, Fragment } from 'react';
import { number, object, string } from 'yup';
import { getGenres } from '../services/genreService';
import { getMovie, saveMovie } from '../services/movieService';
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

  async componentDidMount() {
    await this.populateGenres();
    await this.populateMovie();
  }

  populateGenres = async () => {
    const { data: genres } = await getGenres();
    this.setState({ genres });
  };

  populateMovie = async () => {
    const { match, history } = this.props;
    const movieId = match.params.id;

    if (movieId === 'new') return;

    try {
      const { data: movie } = await getMovie(movieId);
      this.setState({ data: this.mapToViewModel(movie) });
    } catch (error) {
      if (error.response && error.response.status === 404) {
        history.replace('/not-found');
      }
    }
  };

  mapToViewModel = movie => ({
    _id: movie._id,
    title: movie.title,
    genreId: movie.genre._id,
    numberInStock: movie.numberInStock,
    dailyRentalRate: movie.dailyRentalRate,
  });

  handleSubmit = async (values, { setSubmitting }) => {
    const { history } = this.props;
    const { data } = this.state;

    try {
      await saveMovie({ _id: data._id, ...values });
      history.push('/movies');
    } catch {
      setSubmitting(false);
    }
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
