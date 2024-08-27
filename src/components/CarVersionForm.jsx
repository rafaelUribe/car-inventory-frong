import { useState, useEffect } from 'react';
import { useForm } from '../hooks/useForm';
import Swal from 'sweetalert2'
import {
  fetchBrands,
  fetchCarModelsByBrand,
  fetchCarVersions,
  createCarVersion
} from '../utils/api';
import BackButton from './BackBtn';

const CarVersionForm = () => {

  const [formValues, handleInputChange, reset] = useForm({
    brand: '',
    model: '',
    version: '',
  });

  const { brand, model, version } = formValues;

  const [brands, setBrands] = useState([]);
  const [carModels, setCarModels] = useState([]);
  const [carVersions, setCarVersions] = useState([]);


  const fetchData = async () => {
    try {
      const fetchedBrands = await fetchBrands();
      setBrands(fetchedBrands);
      console.log('Brands fetched:', fetchedBrands);
    } catch (error) {
      console.error('Error fetching brands:', error);
    }
  };

  const fetchCarModels = async () => {
    try {
      const fetchedCarModels = await fetchCarModelsByBrand(brand);
      setCarModels(fetchedCarModels);
      console.log('Car models fetched:', fetchedCarModels);
    }
    catch (error) {
      console.error('Error fetching car models:', error);
    }
  };

  const getCarVersions = async () => {
    try {
      const response = await fetchCarVersions();
      setCarVersions(response);
    }
    catch (error) {
      console.error('Error fetching car versions:', error);
    }
  };

  useEffect(() => {
    fetchData();
    getCarVersions();
    console.log('Fetching brands, car models and car versions...');
  }, []);

  useEffect(() => {
    console.log('Brand changed:', brand);
    if (brand) {
      fetchCarModels();
    }
  }, [brand]);

  const isFormValid = () => {
    if (brand.trim().length === 0) {
      Swal.fire('Error', 'Brand is required', 'error');
      return false;
    }else if (model.trim().length === 0) {
      Swal.fire('Error', 'Name is required', 'error');
      return false;
    } else if (version.trim().length === 0) {
      Swal.fire('Error', 'Version is required', 'error');
      return false;
    }else {
      return true;
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isFormValid()) {
        const newCarVersion = await createCarVersion(version, model);
        if (!newCarVersion) {
          Swal.fire('Error', 'Error creating car version', 'error');
          return;
        }
        console.log(newCarVersion);
        Swal.fire('Success', 'Car version created successfully', 'success');
        fetchData();
        reset();
      }
      getCarVersions();
    } catch (error) {
      console.error('Error creating car version:', error);
    }
  };


  return (
    <div className="container">
      <form className="form" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="brandId" className="form-label">Marca</label>
          <select
            name="brand"
            id="brandId"
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
        {
          brand &&
          <div className="mb-3">
            <label htmlFor="carModelId" className="form-label">Modelo</label>
            <select
              name="model"
              id="carModelId"
              value={model}
              onChange={handleInputChange}
              className="form-select"
            >
              <option value="">Seleccione un Modelo</option>
              {carModels.map((model) => (
                <option key={model.id} value={model.id}>{model.name}</option>
              ))}
            </select>
          </div>
        }
        {
          model &&
          <>
            <div className="mb-3">
              <label htmlFor="versionName" className="form-label">Nombre de la Versión</label>
              <input
                type="text"
                name="version"
                id="versionName"
                placeholder="Nombre de la Versión"
                value={version}
                onChange={handleInputChange}
                className="form-control"
              />
            </div>
            <button type="submit" className="btn btn-primary" >Crear Versión</button>
          </>
        }
        <BackButton />
      </form>
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

export default CarVersionForm;
