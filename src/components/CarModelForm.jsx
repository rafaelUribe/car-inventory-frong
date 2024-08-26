import { useState, useEffect } from 'react';
import Swal from 'sweetalert2'
import {
  fetchBrands,
  fetchCarModels,
  createCarModel,
  deleteCarModel
} from '../utils/api';
import { useForm } from '../hooks/useForm';
import '../styles/BrandForm.css';
import BackButton from './BackBtn';

const CarModelForm = () => {

  const [formValues, handleInputChange, reset] = useForm({
    brand: '',
    model: '',
  });

  const { brand, model } = formValues;
  const [brands, setBrands] = useState([]);
  const [carModels, setCarModels] = useState([]);
  
  const fetchData = async () => {
    try {
      const fetchedBrands = await fetchBrands();
      setBrands(fetchedBrands);
      console.log('Brands fetched:', fetchedBrands);
    } catch (error) {
      console.error('Error fetching brands:', error);
    }
  };

  const getCarModels = async () => {
    try {
      const response = await fetchCarModels();
      setCarModels(response);
    } catch (error) {
      console.error('Error fetching car models:', error);
    }
  };

  const createNewCarModel = async (model, brand) => {
    try {
      const newCarModel = await createCarModel(model, brand);
      return newCarModel;
    } catch (error) {
      console.error('Error creating car model:', error);
      return null;
    }
  }

  const goDelete = async (id) => {

    try {
      const response = await deleteCarModel(id);
      console.log('Car model deleted:', response);
      getCarModels();
    } catch (error) {
      console.error('Error deleting car model:', error);
    }
  }

  const handleDelete = (id) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'No podrás revertir esto',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        goDelete(id);
        Swal.fire(
          'Eliminado',
          'El modelo de auto ha sido eliminado',
          'success'
        )
      }
    }
    )
  }
  

  useEffect(() => {
    fetchData();
    console.log('Fetching brands and models...');
  }, []);

  const isFormValid = () => {
    if (brand.trim().length === 0) {
      Swal.fire('Error', 'Brand is required', 'error');
      return false;
    }else if (model.trim().length === 0) {
      Swal.fire('Error', 'Name is required', 'error');
      return false;
    } else {
      return true;
    }
  };

  useEffect(() => {
    getCarModels();
  }, []);


  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      if (isFormValid()) {
        const created = await createNewCarModel(model, brand);
        if (created !== null) {
          Swal.fire('Success', 'Car model created successfully', 'success');
          reset();
          getCarModels();
        } else {
          Swal.fire('Error', 'Error creating car model', 'error');
        }
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
            disabled={brand.length === 0}
            name="model"
            id="carModelName"
            placeholder="Nombre del Modelo"
            value={model}
            onChange={handleInputChange}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="brandId" className="form-label">Marca</label>
          <select
            id="brandId"
            name="brand"
            value={brand}
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
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {carModels.map((model) => (
            <tr key={model.id}>
              <td>{model.id}</td>
              <td>{model.name}</td>
              <td>{model.brand.name}</td>
              <td>
                <button className="btn btn-danger" onClick={()=> handleDelete(model.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CarModelForm;
