import orderBy from 'lodash/orderBy';
import { Component } from 'react';
import { Link } from 'react-router-dom';
import { getGenres } from '../services/genreService';
import { deleteMovie, getMovies } from '../services/movieService';
import paginate from '../utils/paginate';
import { withAuth } from './common/auth';
import Like from './common/like';
import ListGroup from './common/listGroup';
import Pagination from './common/pagination';
import SearchBox from './common/searchBox';
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
    searchQuery: '',
  };

  columns = [
    {
      path: 'title',
      label: 'Title',
      content: movie => <Link to={`/movies/${movie._id}`}>{movie.title}</Link>,
    },
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
      content: movie => {
        const { auth } = this.props;
        if (auth.payload && auth.payload.isAdmin) {
          return (
            <button
              onClick={() => this.handleDelete(movie)}
              className="btn btn-danger btn-sm"
            >
              Delete
            </button>
          );
        }

        return null;
      },
    },
  ];

  async componentDidMount() {
    const { data: movies } = await getMovies();
    const { data: genres } = await getGenres();
    genres.unshift(ALL_GENRES);
    this.setState({ movies, genres, selectedGenre: ALL_GENRES });
  }

  handleDelete = async movie => {
    const movies = this.state.movies.filter(m => m._id !== movie._id);
    this.setState({ movies });

    await deleteMovie(movie._id);
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

  handleSearch = searchQuery => {
    this.setState({ searchQuery, currentPage: 1 });
  };

  getPagedMovies = () => {
    const {
      movies,
      selectedGenre,
      currentPage,
      pageSize,
      sortColumn,
      searchQuery,
    } = this.state;

    let filtered =
      selectedGenre && selectedGenre._id !== ALL_GENRES._id
        ? movies.filter(m => m.genre._id === selectedGenre._id)
        : movies;
    if (searchQuery) {
      filtered = filtered.filter(m =>
        m.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    const sorted = orderBy(filtered, sortColumn.path, sortColumn.order);
    const pagedMovies = paginate(sorted, currentPage, pageSize);

    return { pagedMovies, filteredCount: filtered.length };
  };

  render() {
    const { auth } = this.props;
    const {
      movies,
      genres,
      selectedGenre,
      pageSize,
      currentPage,
      sortColumn,
      searchQuery,
    } = this.state;

    if (movies.length === 0) {
      return (
        <section className="py-5">
          <p>There are no movies in the database.</p>
        </section>
      );
    }

    const { pagedMovies, filteredCount } = this.getPagedMovies();

    return (
      <section className="py-5">
        <div className="row">
          <div className="col-12 col-md-3">
            <ListGroup
              items={genres}
              selectedItem={selectedGenre}
              onItemSelect={this.handleGenreSelect}
            />
          </div>
          <div className="col-12 col-md-9 mt-4 mt-md-0 space-y-3">
            <SearchBox value={searchQuery} onChange={this.handleSearch} />
            <div className="d-sm-flex flex-col-reverse justify-content-between align-items-center space-y-3 space-y-sm-0">
              <div>Showing {filteredCount} movies in the database.</div>
              {auth.payload && auth.payload.isAdmin && (
                <Link to="/movies/new" className="btn btn-primary">
                  New Movie
                </Link>
              )}
            </div>
            <div>
              <Table
                columns={this.columns}
                sortColumn={sortColumn}
                data={pagedMovies}
                onSort={this.handleSort}
              />
              <Pagination
                itemsCount={filteredCount}
                pageSize={pageSize}
                currentPage={currentPage}
                onPageChange={this.handlePageChange}
              />
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default withAuth(Movies);
