import axios from 'axios';

const api = axios.create({
  baseURL: 'https://codandospring.azurewebsites.net',
});

export default api;
