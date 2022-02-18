import axios from 'axios/dist/axios'

const BASE_URL = process.env.VUE_APP_API_URL;

const api = axios.create({
  baseURL: BASE_URL,
});

export default api;
