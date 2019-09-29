import http from './httpService';

export function getMovies() {
  return http.get('/movies');
}

export function getMovie(id) {
  return http.get(`/movies/${id}`);
}

export function saveMovie(data) {
  if (data._id) {
    const id = data._id;
    delete data._id;
    return http.put(`/movies/${id}`, data);
  } else {
    return http.post('/movies', data);
  }
}

export function deleteMovie(id) {
  return http.delete(`/movies/${id}`);
}
