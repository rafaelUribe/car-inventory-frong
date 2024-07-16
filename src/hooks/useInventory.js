import { useState, useEffect } from 'react';
import axios from 'axios';

const useInventory = () => {
  const [brands, setBrands] = useState([]);
  const [models, setModels] = useState([]);
  const [versions, setVersions] = useState([]);
  const [inventory, setInventory] = useState(null);

  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedModel, setSelectedModel] = useState('');
  const [selectedVersion, setSelectedVersion] = useState('');

  const API_URL =  import.meta.env.VITE_API_URL

  useEffect(() => {
    axios.get(`${API_URL}/api/cars/brands`)
      .then(response => setBrands(response.data))
      .catch(error => console.error('Error fetching brands:', error));
  }, [API_URL]);

  useEffect(() => {
    if (selectedBrand) {
      axios.get(`${API_URL}/api/cars/car-models/byBrand/${parseInt(selectedBrand)}`)
        .then(response => setModels(response.data))
        .catch(error => console.error('Error fetching models:', error));
    } else {
      setModels([]);
      setVersions([]);
      setInventory(null);
    }
  }, [selectedBrand, API_URL]);

  useEffect(() => {
    if (selectedModel) {
      axios.get(`${API_URL}/api/cars/car-versions/byModel/${selectedModel}`)
        .then(response => setVersions(response.data))
        .catch(error => console.error('Error fetching versions:', error));
    } else {
      setVersions([]);
      setInventory(null);
    }
  }, [selectedModel, API_URL]);

  useEffect(() => {
    if (selectedVersion) {
      const version = versions.find(v => v.id === parseInt(selectedVersion));
      if (version) {
        setInventory(version.inventory);
      } else {
        setInventory(null);
      }
    } else {
      setInventory(null);
    }
  }, [selectedVersion, versions]);

  const updateInventory = (action) => {
    if (!selectedVersion || inventory === null) return;

    const newInventory = action === 'add' ? inventory + 1 : inventory - 1;
    if (newInventory < 0) return; // Ensure inventory does not go below 0

    axios.put(`${API_URL}/api/cars/car-versions/${selectedVersion}`, {
      ...versions.find(v => v.id === parseInt(selectedVersion)),
      inventory: newInventory
    })
      .then(response => {
        setVersions(prevVersions =>
          prevVersions.map(v =>
            v.id === parseInt(selectedVersion) ? { ...v, inventory: newInventory } : v
          )
        );
        setInventory(newInventory);
      })
      .catch(error => console.error('Error updating inventory:', error));
  };

  return {
    brands,
    models,
    versions,
    inventory,
    selectedBrand,
    selectedModel,
    selectedVersion,
    setSelectedBrand,
    setSelectedModel,
    setSelectedVersion,
    updateInventory
  };
};

export default useInventory;
