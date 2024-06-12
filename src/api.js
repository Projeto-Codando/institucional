import axios from 'axios';

const api = axios.create({
  baseURL: 'https://codandojava.azurewebsites.net/',
});

export default api;
