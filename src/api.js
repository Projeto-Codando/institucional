import axios from 'axios';

const api = axios.create({
  baseURL: 'http://54.210.10.240:8080',
});

export default api;
