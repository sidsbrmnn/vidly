import axios from "axios";
import { toast } from "react-toastify";
import * as logger from "./log";

const http = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

http.interceptors.response.use(null, (error) => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (!expectedError) {
    logger.log(error);
    toast.error("An unexpected error occurrred.");
  }

  return Promise.reject(error);
});

export function setJwt(jwt) {
  http.defaults.headers.common["x-auth-token"] = jwt;
}

export default http;
