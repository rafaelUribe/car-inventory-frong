import React, { useState, useEffect } from 'react';
import axios from 'axios';

const InventoryTable = () => {
  const [brands, setBrands] = useState([]);
  const [models, setModels] = useState([]);
  const [versions, setVersions] = useState([]);
  const [inventory, setInventory] = useState('');

  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedModel, setSelectedModel] = useState('');
  const [selectedVersion, setSelectedVersion] = useState('');

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    axios.get(`${API_URL}/api/cars/brands`)
    .then(response => {
      if (Array.isArray(response.data)) {
        setBrands(response.data);
      } else {
        console.error('Unexpected response format:', response.data);
      }
    })
    .catch(error => console.error('Error fetching brands:', error));
  }, []);

  useEffect(() => {
    if (selectedBrand) {
        console.log(selectedBrand)
      axios.get(`${API_URL}/api/cars/car-models/byBrand/${parseInt(selectedBrand)}`)
        .then(response => setModels(response.data))
        .catch(error => console.error('Error fetching models:', error));
    } else {
      setModels([]);
      setVersions([]);
      setInventory([]);
    }
  }, [selectedBrand]);

  useEffect(() => {
    if (selectedModel) {
      axios.get(`${API_URL}/api/cars/car-versions/byModel/${selectedModel}`)
        .then(response => setVersions(response.data))
        .catch(error => console.error('Error fetching versions:', error));
    } else {
      setVersions([]);
      setInventory([]);
    }
  }, [selectedModel]);

  useEffect(() => {
    if (selectedVersion) {
        axios.get(`${API_URL}/api/cars/car-versions/inventory/${selectedVersion}`)
        .then(response => setInventory(response.data))
        .catch(error => console.error('Error fetching inventory:', error));
    } else {
      setInventory([]);
    }
  }, [selectedVersion]);

  const handleIncrement = () => {
    axios.patch(`${API_URL}/api/inventory/update-quantity/${selectedVersion}?action=add`)
      .then(response => setInventory(prevInventory => ({
        ...prevInventory,
        quantity: prevInventory.quantity + 1
      })))
      .catch(error => console.error('Error updating inventory:', error));
  };

  const handleDecrement = () => {
    if (inventory.quantity > 0) {
      axios.patch(`${API_URL}/api/inventory/update-quantity/${selectedVersion}?action=subtract`)
        .then(response => setInventory(prevInventory => ({
          ...prevInventory,
          quantity: prevInventory.quantity - 1
        })))
        .catch(error => console.error('Error updating inventory:', error));
    }
  };

  return (
    <div className="container mt-5">
      <div className="form-group">
        <label htmlFor="brandSelect">Marca:</label>
        <select
          id="brandSelect"
          className="form-control"
          onChange={e => setSelectedBrand(e.target.value)}
          value={selectedBrand || ''}
        >
          <option value="">Seleccione una marca</option>
          {
            brands && brands.map(brand => (
            <option key={brand.id} value={brand.id}>{brand.name}</option>
          ))}
        </select>
      </div>
      <div className="form-group mt-3">
        <label htmlFor="modelSelect">Modelo:</label>
        <select
          id="modelSelect"
          className="form-control"
          onChange={e => setSelectedModel(e.target.value)}
          value={selectedModel || ''}
          disabled={!selectedBrand}
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
          className="form-control"
          onChange={e => setSelectedVersion(e.target.value)}
          value={selectedVersion || ''}
          disabled={!selectedModel}
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
