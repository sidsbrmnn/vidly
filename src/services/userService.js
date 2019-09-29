import http from './httpService';

export async function register(user) {
  const res = await http.post('/users', user);
  return res.data;
}
