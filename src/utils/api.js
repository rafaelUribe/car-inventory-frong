// src/utils/api.js

import axios from 'axios';

// const base_url = process.env.REACT_APP_API_URL;
const base_url = 'http://localhost:3001';

const api = axios.create({
  baseURL: base_url,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  return config;
}, (error) => {
  return Promise.reject(error);
});

api.interceptors.response.use((response) => {
  return response;
}, (error) => {
  if (error.response && error.response.status === 401) {
  }
  return Promise.reject(error);
});

export const fetchBrands = async () => {
  url = `${base_url}/api/cars/brands`;
  try {
    const response = await axios.get(url);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(`Error fetching brands: ${error}`);
    return null;
  }
};

export const createBrand = async (brand) => {
  url = `${base_url}/api/cars/brands`;
  try {
    const response = await axios.post(url, brand);
    console.log(`Brand created: ${response.data}`);
    return response.data;
  } catch (error) {
    console.error(`Error creating brand: ${error}`);
    return null;
  }
}