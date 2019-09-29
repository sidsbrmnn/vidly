import http from './http';

export async function login(user) {
  const res = await http.post('/auth', user);
  return res.data;
}
