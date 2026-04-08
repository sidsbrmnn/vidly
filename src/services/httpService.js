import axios from 'axios';

if (!import.meta.env.VITE_API_BASE_URL) {
  throw new Error('VITE_API_BASE_URL is not defined!');
}

const http = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

http.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['X-Auth-Token'] = token;
  }

  return config;
});

export default http;
