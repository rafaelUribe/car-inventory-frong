import { useState, useEffect } from 'react';
import Swal from 'sweetalert2'
import {
  fetchBrands,
  fetchCarModels,
  createCarModel
} from '../utils/api';
import { useForm } from '../hooks/useForm';
import '../styles/BrandForm.css';
import BackButton from './BackBtn';

const CarModelForm = () => {
  const [formValues, handleInputChange, reset] = useForm({
    name: '',
    brand: '',
  });
  const { name, brand } = formValues;
  // const [brand, setBrand] = useState('');
  const [brands, setBrands] = useState([]);
  const [carModels, setCarModels] = useState([]);

  useEffect(() => {
    // let brands_response = fetchBrands();
    // console.log(`Brands: ${brands_response}`);
    // setBrands(brands_response);

    // let cars_response = fetchCarModels();
    // console.log(`Car Models: ${cars_response}`);
    // setCarModels(cars_response); 
    console.log('Fetching brands and models...');
  }, []);

  const handleBrandChange = (e) => {
    setBrand(e.target.value);
  };

  const isFormValid = () => {
    if (name.trim().length === 0) {
      Swal.fire('Error', 'Name is required', 'error');
      return false;
    } else if (brand.trim().length === 0) {
      Swal.fire('Error', 'Brand is required', 'error');
      return false;
    } else {
      return true;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const carModel = {
      name: name,
    };
    try {
      if (isFormValid()) {
        // const newCarModel = await createCarModel(carModel, brand);
        Swal.fire('Success', 'Car model created successfully', 'success');
        reset();
        setBrand('');
        // const response = fetchCarModels();
        // setCarModels(response.data);
      }
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
            value={name}
            onChange={handleInputChange}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="brandId" className="form-label">Marca</label>
          <select
            name="brandId"
            id="brandId"
            value={brand || ''}
            onChange={handleInputChange}
            className="form-select"
          >
            <option value="">Seleccione una Marca</option>
            {brands.map((brand) => (
              <option key={brand.id} value={brand.id}>{brand.name}</option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn btn-primary">Crear Modelo</button>
        <BackButton />
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
