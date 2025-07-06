import axios from 'axios';

const apiURL = process.env.NEXT_PUBLIC_API_URL;
const magicHutURL = process.env.NEXT_PUBLIC_MAGIC_HUT_URL;

const api = axios.create({
  baseURL: apiURL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

const magichutApi = axios.create({
  baseURL: `${magicHutURL}/api`,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

export { api, apiURL, magichutApi, magicHutURL };
