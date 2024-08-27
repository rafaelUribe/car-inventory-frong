// src/utils/api.js

import axios from 'axios';


// const base_url = import.meta.env.VITE_API_URL;
const base_url = 'https://cars-service-production.up.railway.app/api'; 

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

// Brands API
export const fetchBrands = async () => {
  const url = `${base_url}/cars/brands`;
  console.log(`Fetching brands from: ${url}`);
  try {
    const response = await api.get(url);
    // const response = await axios.get(url);
    let data = response.data;
    console.log(`data from fetchBrands: ${data}`);
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const createBrand = async (brand) => {
  const url = `${base_url}/cars/brands`;
  const body = {
    name: brand,
  };

  try {
    const response = await api.post(url, body);
    console.log(`Brand created: ${response.data}`);
    return response.data;
  } catch (error) {
    console.error(`Error creating brand: ${error}`);
    return null;
  }
}

export const deleteBrand = async (brandId) => {
  const url = `${base_url}/cars/brands/${brandId}`;
  try {
    const response = await api.delete(url);
    console.log(`Brand deleted: ${response.data}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting brand: ${error}`);
    return null;
  }
}

// Car Models API
export const fetchCarModels = async () => {
  const url = `${base_url}/cars/car-models`;
  try {
    console.log(`Fetching car models from: ${url}`);
    const response = await axios.get(url);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(`Error fetching car models: ${error}`);
    return null;
  }
};

export const fetchCarModelsByBrand = async (brandId) => {
  const url = `${base_url}/cars/car-models/byBrand/${brandId}`;
  try {
    console.log(`Fetching car models by brand from: ${url}`);
    const response = await axios.get(url);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(`Error fetching car models by brand: ${error}`);
    return null;
  }
}

export const createCarModel = async (carModel, brand) => {
  const url = `${base_url}/cars/car-models`;
  const body = {
    name: carModel,
  };

  try {
    const response = await axios.post(url, body, {
      params: {
        brandId: brand,
      },
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: false,
    });
    console.log(`Car model created: ${response.data}`);
    return response.data;
  } catch (error) {
    console.error(`Error creating car model: ${error}`);
    return null;
  }
};

export const deleteCarModel = async (carModelId) => {
  const url = `${base_url}/cars/car-models/${carModelId}`;
  try {
    const response = await axios.delete(url);
    console.log(`Car model deleted: ${response.data}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting car model: ${error}`);
    return null;
  }
}

// Car Versions API
export const fetchCarVersions = async () => {
  const url = `${base_url}/cars/car-versions`;
  try {
    const response = await axios.get(url);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(`Error fetching car versions: ${error}`);
    return null;
  }
};

export const fetchCarVersionsByModel = async (modelId) => {
  const url = `${base_url}/cars/car-versions/byModel/${modelId}`;
  try {
    const response = await axios.get(url);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(`Error fetching car versions by model: ${error}`);
    return null;
  }
}

export const createCarVersion = async (carVersion, carModel) => {
  const url = `${base_url}/cars/car-versions`;
  try {
    const response = await axios.post(url, null, {
      params: {
        versionName: carVersion,
        carModelId: carModel,
      },
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: false,
    });
    console.log(`Car version created: ${response.data}`);
    return response.data;
  } catch (error) {
    console.error(`Error creating car version: ${error}`);
    return null;
  }
};

export const fetchCarVerionsInventory = async (versionId) => {
  const url = `${base_url}/cars/car-versions/inventory/${versionId}`;
  try {
    console.log(`Fetching car version inventory from: ${url}`);
    const response = await axios.get(url);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(`Error fetching car version inventory: ${error}`);
    return null;
  }
}