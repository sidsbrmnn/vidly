import http from './httpService';

export function register(user) {
  return http.post('/users', user);
}
