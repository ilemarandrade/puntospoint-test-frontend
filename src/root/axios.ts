import axios from 'axios';

export const axiosInstance = axios.create({});

axiosInstance.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  function (response) {
    return JSON.parse(response.data);
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default axios;
