import axios from 'axios';

const api = axios.create({
  baseURL: 'http://54.210.10.240/api', // Troque pelo IP público da sua instância
});

export default api;
