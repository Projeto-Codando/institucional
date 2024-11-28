import axios from 'axios';

const api = axios.create({
  baseURL: 'https://codandoapp.me/api', // Troque pelo IP público da sua instância
});

export default api;
