import http from './http';

export async function getMovies() {
  const res = await http.get('/movies');
  return res.data;
}

export async function getMovie(id) {
  const res = await http.get(`/movies/${id}`);
  return res.data;
}

export async function saveMovie(data) {
  let res;
  if (data._id) {
    const id = data._id;
    delete data._id;
    res = await http.put(`/movies/${id}`, data);
  } else {
    res = await http.post('/movies', data);
  }
  return res.data;
}

export async function deleteMovie(id) {
  const res = await http.delete(`/movies/${id}`);
  return res.data;
}
