import React, { Component } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import _ from "lodash";
import MoviesTable from "./moviesTable";
import SearchBox from "./searchBox";
import ListGroup from "./common/listGroup";
import Pagination from "./common/pagination";
import { getGenres } from "../services/genre";
import { getMovies, deleteMovie } from "../services/movie";
import { paginate } from "../utils/paginate";

class Movies extends Component {
  state = {
    genres: [],
    movies: [],
    pageSize: 4,
    currentPage: 1,
    selectedGenre: {},
    searchQuery: "",
    sortColumn: { path: "title", order: "asc" }
  };

  async componentDidMount() {
    const selectedGenre = { _id: "", name: "All Genres" };
    const { data } = await getGenres();
    const genres = [selectedGenre, ...data];

    const { data: movies } = await getMovies();
    this.setState({
      movies,
      genres,
      selectedGenre
    });
  }

  handleDelete = async movie => {
    const originalMovies = this.state.movies;

    const movies = originalMovies.filter(m => m._id !== movie._id);
    this.setState({ movies });

    try {
      await deleteMovie(movie._id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        toast.error("This movie has already been deleted.");
      this.setState({ movies: originalMovies });
    }
  };

  handleLike = movie => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movie, liked: !movie.liked };
    this.setState({ movies });
  };

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  handleGenreSelect = genre => {
    this.setState({ selectedGenre: genre, searchQuery: "", currentPage: 1 });
  };

  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };

  handleSearch = query => {
    this.setState({
      searchQuery: query,
      selectedGenre: { _id: "", name: "All Genres" },
      currentPage: 1
    });
  };

  getPagedData = () => {
    const {
      pageSize,
      currentPage,
      selectedGenre,
      sortColumn,
      searchQuery,
      movies: allMovies
    } = this.state;

    let filtered = allMovies;
    if (searchQuery)
      filtered = allMovies.filter(m =>
        m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    else if (selectedGenre && selectedGenre._id)
      filtered = allMovies.filter(m => m.genre._id === selectedGenre._id);

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const movies = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: movies };
  };

  render() {
    const { pageSize, currentPage, sortColumn, searchQuery } = this.state;
    const { totalCount, data: movies } = this.getPagedData();
    const { user } = this.props;

    return (
      <div className="row py-5">
        <div className="col-lg-2 col-md-3 col-6">
          <ListGroup
            items={this.state.genres}
            selectedItem={this.state.selectedGenre}
            onItemSelect={this.handleGenreSelect}
          />
        </div>
        <div className="col">
          {user && (
            <Link to="/movies/new" className="btn btn-primary mb-3">
              New Movie
            </Link>
          )}
          <p>Showing {totalCount} movies in the database.</p>
          <SearchBox value={searchQuery} onChange={this.handleSearch} />
          <MoviesTable
            movies={movies}
            onLike={this.handleLike}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
            sortColumn={sortColumn}
          />
          <Pagination
            itemsCount={totalCount}
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
