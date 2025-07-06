import axios from 'axios';

const apiURL = process.env.NEXT_PUBLIC_API_URL;

const api = axios.create({
  baseURL: apiURL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

export { api, apiURL }
