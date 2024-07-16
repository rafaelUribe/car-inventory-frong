import { useState, useEffect } from 'react';
import axios from 'axios';
import BrandSelect from './BrandSelect';
import ModelSelect from './ModelSelect';
import CarVersionList from './CarVersionList';

const CarVersionForm = () => {
  const [carVersionName, setCarVersionName] = useState('');
  const [brands, setBrands] = useState([]);
  const [carModels, setCarModels] = useState([]);
  const [filteredCarModels, setFilteredCarModels] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedCarModel, setSelectedCarModel] = useState('');
  const [refresh, setRefresh] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/cars/brands`);
        setBrands(response.data);
      } catch (error) {
        console.error('Error fetching brands:', error);
      }
    };

    const fetchCarModels = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/cars/car-models`);
        setCarModels(response.data);
      } catch (error) {
        console.error('Error fetching car models:', error);
      }
    };

    fetchBrands();
    fetchCarModels();
  }, [API_URL]);

  const handleBrandChange = (e) => {
    const brandId = e.target.value;
    setSelectedBrand(brandId);
    setSelectedCarModel('');
    setFilteredCarModels(carModels.filter((model) => model.brand.id === parseInt(brandId)));
  };

  const handleModelChange = (e) => {
    const model = e.target.value;
    setSelectedCarModel(model);
  };

  const handleChange = (e) => {
    setCarVersionName(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/api/cars/car-versions`, null, {
        params: {
          versionName: carVersionName,
          carModelId: selectedCarModel,
        },
        headers: {
          'Content-Type': 'application/json',
        },
      });
      alert('Car version created successfully');
      setCarVersionName('');
      setRefresh(!refresh); // Trigger refresh after creating a version
    } catch (error) {
      console.error('Error creating car version:', error);
    }
  };

  return (
    <div className="container">
      <form className="form" onSubmit={handleSubmit}>
        <BrandSelect brands={brands} selectedBrand={selectedBrand} onChange={handleBrandChange} />
        {selectedBrand && (
          <ModelSelect carModels={filteredCarModels} selectedCarModel={selectedCarModel} onChange={handleModelChange} />
        )}
        {selectedCarModel && (
          <>
            <div className="mb-3">
              <label htmlFor="versionName" className="form-label">Nombre de la Versión</label>
              <input
                type="text"
                name="versionName"
                id="versionName"
                placeholder="Nombre de la Versión"
                value={carVersionName}
                onChange={handleChange}
                className="form-control"
              />
            </div>
            <button type="submit" className="btn btn-primary">Crear Versión</button>
          </>
        )}
      </form>
      <CarVersionList refresh={refresh} />
    </div>
  );
};

export default CarVersionForm;
