import axios from 'axios';

const http = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

// http.interceptors.request.use(config => {
//   config.headers.set('Content-Type', 'application/json');

//   const token = localStorage.getItem('token');
//   if (token) {
//     config.headers.set('X-Auth-Token', token);
//   }

//   return config;
// });

export default http;
