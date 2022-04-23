import axios from 'axios';

const http = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
});

http.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['X-Auth-Token'] = token;
  }

  return config;
});

export default http;
