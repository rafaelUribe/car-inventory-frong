import { useEffect, useState } from 'react';
import axios from 'axios';

const BrandList = ({ refresh }) => {
  const [brands, setBrands] = useState([]);
  const API_URL = import.meta.env.VITE_API_URL;

  const fetchBrands = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/cars/brands`);
      setBrands(response.data);
    } catch (error) {
      console.error('Error al traer las marcas:', error);
    }
  };

  useEffect(() => {
    fetchBrands();
  }, [refresh, API_URL]);

  return (
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
  );
};

export default BrandList;
