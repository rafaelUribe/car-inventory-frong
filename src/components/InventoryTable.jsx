import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  fetchBrands,
  fetchCarModelsByBrand,
  fetchCarVersionsByModel,
  fetchCarVerionsInventory
} from '../utils/api';
import { useForm } from '../hooks/useForm';

const InventoryTable = () => {

  const [formValues, handleInputChange, reset] = useForm({
    brand: '',
    model: '',
    version: '',
  });

  const { brand, model, version } = formValues;


  const [brands, setBrands] = useState([]);
  const [models, setModels] = useState([]);
  const [versions, setVersions] = useState([]);
  const [inventory, setInventory] = useState('');

  const fetchData = async () => {
    try {
      const fetchedBrands = await fetchBrands();
      setBrands(fetchedBrands);
      console.log('Brands fetched:', fetchedBrands);
    } catch (error) {
      console.error('Error fetching brands:', error);
    }
  };

  const fetchdataModels = async () => {
    try {
      const fetchedModels = await fetchCarModelsByBrand(brand);
      setModels(fetchedModels);
      console.log('Models fetched:', fetchedModels);
    }
    catch (error) {
      console.error('Error fetching models:', error);
    }
  }

  const fetchdataVersions = async () => {
    try {
      const fetchedVersions = await fetchCarVersionsByModel(model);
      setVersions(fetchedVersions);
      console.log('Versions fetched:', fetchedVersions);
    } catch (error) {
      console.error('Error fetching versions:', error);
    }
  };

  const fetchInventory = async () => {
    try {
      const fetchedInventory = await fetchCarVerionsInventory(version);
      setInventory(fetchedInventory);
      console.log('Inventory fetched:', fetchedInventory);
    } catch (error) {
      console.error('Error fetching inventory:', error);
      setInventory([]);
    }
  };

 


  // const [selectedBrand, setSelectedBrand] = useState('');
  // const [selectedModel, setSelectedModel] = useState('');
  // const [selectedVersion, setSelectedVersion] = useState('');

  // const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetchData();
  }, []);


  useEffect(() => {
    if (brand.length > 0) {
      fetchdataModels();
    } else {
      setModels([]);
      setVersions([]);
      setInventory([]);
    }
  }, [brand]);

  useEffect(() => {
    if (model.length > 0) {
      fetchdataVersions();
    } else {
      setVersions([]);
      setInventory([]);
    }
  }, [model]);

  // TODO: verify inventory endpoint is working
  useEffect(() => {
    if (version.length > 0) {
      fetchInventory();
    } else {
      setInventory('');
    }
  }, [version]);

  // const handleIncrement = () => {
  //   axios.patch(`http://localhost:8080/api/inventory/update-quantity/${selectedVersion}?action=add`)
  //     .then(response => setInventory(prevInventory => ({
  //       ...prevInventory,
  //       quantity: prevInventory.quantity + 1
  //     })))
  //     .catch(error => console.error('Error updating inventory:', error));
  // };

  // const handleDecrement = () => {
  //   if (inventory.quantity > 0) {
  //     axios.patch(`http://localhost:8080/api/inventory/update-quantity/${selectedVersion}?action=subtract`)
  //       .then(response => setInventory(prevInventory => ({
  //         ...prevInventory,
  //         quantity: prevInventory.quantity - 1
  //       })))
  //       .catch(error => console.error('Error updating inventory:', error));
  //   }
  // };

  return (
    <div className="container mt-5">
      <div className="form-group">
        <label htmlFor="brandSelect">Marca:</label>
        <select
          id="brandSelect"
          name="brand"
          className="form-control"
          onChange={handleInputChange}
          value={brand}
        >
          <option value="">Seleccione una marca</option>
          {
            brands.length > 0 && brands.map(brand => (
              <option key={brand.id} value={brand.id}>{brand.name}</option>
            ))}
        </select>
      </div>
      <div className="form-group mt-3">
        <label htmlFor="modelSelect">Modelo:</label>
        <select
          id="modelSelect"
          name="model"
          className="form-control"
          onChange={handleInputChange}
          value={model}
          disabled={brand.length === 0}
        >
          <option value="">Seleccione un modelo</option>
          {models.map(model => (
            <option key={model.id} value={model.id}>{model.name}</option>
          ))}
        </select>
      </div>
      <div className="form-group mt-3">
        <label htmlFor="versionSelect">Versión:</label>
        <select
          id="versionSelect"
          name="version"
          className="form-control"
          onChange={handleInputChange}
          value={version}
          disabled={model.length === 0}
        >
          <option value="">Seleccione una versión</option>
          {versions.map(version => (
            <option key={version.id} value={version.id}>{version.versionName}</option>
          ))}
        </select>
      </div>
      <div className="mt-5">
        {
          inventory.quantity &&
          <div>
            <h2>Inventario Disponible</h2>
            <h3>{inventory.quantity}</h3>
            <button className="btn btn-primary mr-2" onClick={handleIncrement}>Agregar</button>
            <button className="btn btn-secondary ms-2" onClick={handleDecrement}>Restar</button>
          </div>
        }
      </div>
    </div>
  );
};

export default InventoryTable;
