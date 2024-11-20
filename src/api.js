import axios from 'axios';

const api = axios.create({
  baseURL: 'https://54.210.10.240/api', // Troque pelo IP público da sua instância
});

export default api;
