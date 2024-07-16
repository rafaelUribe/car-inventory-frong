import { useState } from 'react';
import axios from 'axios';
import BrandList from './BrandList';

const BrandForm = () => {
  const API_URL = import.meta.env.VITE_API_URL;

  const [brand, setBrand] = useState({ name: '' });
  const [refresh, setRefresh] = useState(false);

  const handleChange = (e) => {
    setBrand({ ...brand, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/api/cars/brands`, brand);
      alert('Marca creada exitosamente');
      setBrand({ name: '' });
      setRefresh(!refresh); // Trigger refresh after creating a brand
    } catch (error) {
      console.error('Error al crear la marca:', error);
    }
  };

  return (
    <div className="container mt-4">
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Nombre de la marca</label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Nombre de la marca"
            value={brand.name}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <button type="submit" className="btn btn-primary">Crear Marca</button>
      </form>
      <BrandList refresh={refresh} />
    </div>
  );
};

export default BrandForm;
