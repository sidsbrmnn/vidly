import orderBy from 'lodash/orderBy';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getGenres } from '../services/genreService';
import { deleteMovie, getMovies } from '../services/movieService';
import paginate from '../utils/paginate';
import { useAuth } from './common/auth';
import Like from './common/like';
import ListGroup from './common/listGroup';
import Pagination from './common/pagination';
import SearchBox from './common/searchBox';
import Table from './common/table';

const ALL_GENRES = {
  _id: (Math.random() * 10e16).toString(),
  name: 'All Genres',
};

const Movies = () => {
  const auth = useAuth();

  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [pageSize] = useState(4);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortColumn, setSortColumn] = useState({ path: 'title', order: 'asc' });
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    getMovies().then(({ data }) => setMovies(data));
    getGenres().then(({ data }) => {
      data.unshift(ALL_GENRES);
      setGenres(data);
      setSelectedGenre(ALL_GENRES);
    });
  }, []);

  const columns = [
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
        <Like liked={movie.liked} onClick={() => handleLike(movie)} />
      ),
    },
    {
      key: 'delete',
      content: movie => {
        if (auth.payload && auth.payload.isAdmin) {
          return (
            <button
              onClick={() => handleDelete(movie)}
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

  const handleDelete = async movie => {
    setMovies(movies.filter(m => m._id !== movie._id));

    await deleteMovie(movie._id);
  };

  const handleLike = movie => {
    const updatedMovies = movies.map(m =>
      m._id === movie._id ? { ...m, liked: !m.liked } : m
    );
    setMovies(updatedMovies);
  };

  const handlePageChange = page => {
    setCurrentPage(page);
  };

  const handleGenreSelect = genre => {
    setSelectedGenre(genre);
    setCurrentPage(1);
  };

  const handleSort = sortColumn => {
    setSortColumn(sortColumn);
  };

  const handleSearch = searchQuery => {
    setSearchQuery(searchQuery);
    setCurrentPage(1);
  };

  const getPagedMovies = () => {
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

  if (movies.length === 0) {
    return (
      <section className="py-5">
        <p>There are no movies in the database.</p>
      </section>
    );
  }

  const { pagedMovies, filteredCount } = getPagedMovies();

  return (
    <section className="py-5">
      <div className="row">
        <div className="col-12 col-md-3">
          <ListGroup
            items={genres}
            selectedItem={selectedGenre}
            onItemSelect={handleGenreSelect}
          />
        </div>
        <div className="col-12 col-md-9 mt-4 mt-md-0 space-y-3">
          <SearchBox value={searchQuery} onChange={handleSearch} />
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
              columns={columns}
              sortColumn={sortColumn}
              data={pagedMovies}
              onSort={handleSort}
            />
            <Pagination
              itemsCount={filteredCount}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Movies;
