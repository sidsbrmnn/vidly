import http from './http';

export async function register(user) {
  const res = await http.post('/users', user);
  return res.data;
}

export async function login(user) {
  const res = await http.post('/auth', user);
  return res.data;
}
