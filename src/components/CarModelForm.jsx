import { useState, useEffect } from 'react';
import axios from 'axios';

const CarModelForm = () => {
  const [carModelName, setCarModelName] = useState('');
  const [brand, setBrand] = useState('');
  const [brands, setBrands] = useState([]);
  const [carModels, setCarModels] = useState([]);

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
  }, []);

  const handleNameChange = (e) => {
    setCarModelName(e.target.value);
  };

  const handleBrandChange = (e) => {
    setBrand(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const carModel = {
      name: carModelName,
    };
    try {
      await axios.post(
        `${API_URL}/api/cars/car-models`,
        carModel,
        {
          params: {
            brandId: brand,
          },
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      alert('Car model created successfully');
      setCarModelName('');
      setBrand('');
      const response = await axios.get(`${API_URL}/api/cars/car-models`);
      setCarModels(response.data);
    } catch (error) {
      console.error('Error creating car model:', error);
    }
  };

  return (
    <div className="container">
      <form className="form" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="carModelName" className="form-label">Nombre del Modelo</label>
          <input
            type="text"
            name="name"
            id="carModelName"
            placeholder="Nombre del Modelo"
            value={carModelName}
            onChange={handleNameChange}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="brandId" className="form-label">Marca</label>
          <select
            name="brandId"
            id="brandId"
            value={brand || ''}
            onChange={handleBrandChange}
            className="form-select"
          >
            <option value="">Seleccione una Marca</option>
            {brands.map((brand) => (
              <option key={brand.id} value={brand.id}>{brand.name}</option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn btn-primary">Crear Modelo</button>
      </form>
      <h2 className="mt-5">Modelos de Autos</h2>
      <table className="table table-striped mt-3">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre del Modelo</th>
            <th>Marca</th>
          </tr>
        </thead>
        <tbody>
          {carModels.map((model) => (
            <tr key={model.id}>
              <td>{model.id}</td>
              <td>{model.name}</td>
              <td>{model.brand.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CarModelForm;
