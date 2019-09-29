import http from './httpService';

export function login(user) {
  return http.post('/auth', user);
}
