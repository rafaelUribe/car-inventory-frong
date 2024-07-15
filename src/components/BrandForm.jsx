import { useState, useEffect } from 'react';
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  }
});

const BrandForm = () => {
  const [brand, setBrand] = useState({ name: '' });
  const [brands, setBrands] = useState([]);

  const handleChange = (e) => {
    setBrand({ ...brand, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post('/api/cars/brands', brand)
      alert('Marca creada exitosamente');
      fetchBrands();
      setBrand({ name: '' });
    } catch (error) {
      console.error('Error al crear la marca:', error);
    }
  };

  const fetchBrands = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/cars/brands');
      setBrands(response.data);
    } catch (error) {
      console.error('Error al traer las marcas:', error);
    }
  };

  useEffect(() => {
    fetchBrands();
  }, []);

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
      <div>
        <h2>Lista de Marcas</h2>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
            </tr>
          </thead>
          <tbody>
            {brands.map((b) => (
              <tr key={b.id}>
                <td>{b.id}</td>
                <td>{b.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BrandForm;
