import http from './http';

export async function getGenres() {
  const res = await http.get('/genres');
  return res.data;
}
