import http from './httpService';

export async function getGenres() {
  const res = await http.get('/genres');
  return res.data;
}
