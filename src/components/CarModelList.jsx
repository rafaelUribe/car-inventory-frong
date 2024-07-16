import { useEffect, useState } from 'react';
import axios from 'axios';

const CarModelList = ({ refresh }) => {
  const [carModels, setCarModels] = useState([]);
  const API_URL = import.meta.env.VITE_API_URL;

  const fetchCarModels = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/cars/car-models`);
      setCarModels(response.data);
    } catch (error) {
      console.error('Error fetching car models:', error);
    }
  };

  useEffect(() => {
    fetchCarModels();
  }, [refresh, API_URL]);

  return (
    <div className="container mt-5">
      <h2>Modelos de Autos</h2>
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

export default CarModelList;
