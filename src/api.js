import axios from 'axios';

const api = axios.create({
  baseURL: 'http://54.210.10.240:8080/api',
});

export default api;
