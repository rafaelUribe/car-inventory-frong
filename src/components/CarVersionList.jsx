import { useState, useEffect } from 'react';
import axios from 'axios';

const CarVersionList = ({ refresh }) => {
  const [carVersions, setCarVersions] = useState([]);
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchCarVersions = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/cars/car-versions`);
        setCarVersions(response.data);
      } catch (error) {
        console.error('Error fetching car versions:', error);
      }
    };

    fetchCarVersions();
  }, [refresh, API_URL]);

  return (
    <div>
      <h2 className="mt-5">Versiones de Autos</h2>
      <table className="table table-striped mt-3">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre de la Versión</th>
            <th>Modelo</th>
            <th>Marca</th>
          </tr>
        </thead>
        <tbody>
          {carVersions.map((version) => (
            <tr key={version.id}>
              <td>{version.id}</td>
              <td>{version.versionName}</td>
              <td>{version.carModel.name}</td>
              <td>{version.carModel.brand.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CarVersionList;
