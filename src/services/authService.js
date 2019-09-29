import http from './httpService';

export async function login(user) {
  const res = await http.post('/auth', user);
  return res.data;
}
