import React, { Component } from 'react';
import { getGenres } from '../services/fakeGenreService';
import { getMovies } from '../services/fakeMovieService';
import { orderBy, paginate } from '../utils/lodash';
import Like from './common/like';
import ListGroup from './common/listGroup';
import Pagination from './common/pagination';
import Table from './common/table';

const ALL_GENRES = {
  _id: (Math.random() * 10e16).toString(),
  name: 'All Genres',
};

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    selectedGenre: null,
    pageSize: 4,
    currentPage: 1,
    sortColumn: { path: 'title', order: 'asc' },
  };

  columns = [
    { path: 'title', label: 'Title' },
    { path: 'genre.name', label: 'Genre' },
    { path: 'numberInStock', label: 'Stock' },
    { path: 'dailyRentalRate', label: 'Rate' },
    {
      key: 'like',
      content: movie => (
        <Like liked={movie.liked} onClick={() => this.handleLike(movie)} />
      ),
    },
    {
      key: 'delete',
      content: movie => (
        <button
          onClick={() => this.handleDelete(movie)}
          className="btn btn-danger btn-sm"
        >
          Delete
        </button>
      ),
    },
  ];

  componentDidMount() {
    const movies = getMovies();
    const genres = getGenres();
    genres.unshift(ALL_GENRES);
    this.setState({ movies, genres, selectedGenre: ALL_GENRES });
  }

  handleDelete = movie => {
    const movies = this.state.movies.filter(m => m._id !== movie._id);
    this.setState({ movies });
  };

  handleLike = movie => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  handleGenreSelect = genre => {
    this.setState({ selectedGenre: genre, currentPage: 1 });
  };

  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };

  render() {
    const { movies, genres, selectedGenre, pageSize, currentPage, sortColumn } =
      this.state;

    if (movies.length === 0) return <p>There are no movies in the database.</p>;

    const filtered =
      selectedGenre && selectedGenre._id !== ALL_GENRES._id
        ? movies.filter(m => m.genre._id === selectedGenre._id)
        : movies;
    const sorted = orderBy(filtered, sortColumn.path, sortColumn.order);
    const pagedMovies = paginate(sorted, currentPage, pageSize);

    return (
      <div className="row">
        <div className="col-12 col-md-3">
          <ListGroup
            items={genres}
            selectedItem={selectedGenre}
            onItemSelect={this.handleGenreSelect}
          />
        </div>
        <div className="col-12 col-md-9 mt-4 mt-md-0">
          <p>Showing {filtered.length} movies in the database.</p>
          <Table
            columns={this.columns}
            sortColumn={sortColumn}
            data={pagedMovies}
            onSort={this.handleSort}
          />
          <Pagination
            itemsCount={filtered.length}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

export default Movies;
