import axios from 'axios';

const api = axios.create({
  baseURL: 'https://codando.hopto.org/api', // Troque pelo IP público da sua instância
});

export default api;
