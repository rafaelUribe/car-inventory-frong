import { useState, useEffect } from 'react';
import axios from 'axios';
import { useForm } from '../hooks/useForm';
import {
  fetchBrands,
  fetchCarModels,
} from '../utils/api';
import BackButton from './BackBtn';

const CarVersionForm = () => {

  const [formValues, handleInputChange, reset ] = useForm({
    carVersionName: '',
    selectedBrand: '',
    selectedCarModel: ''
  });

  const {carVersionName, selectedBrand, selectedCarModel} = formValues;

  // const [carVersionName, setCarVersionName] = useState('');
  const [brands, setBrands] = useState([]);
  const [carModels, setCarModels] = useState([]);
  const [filteredCarModels, setFilteredCarModels] = useState([]);
  const [carVersions, setCarVersions] = useState([]);
  // const [selectedBrand, setSelectedBrand] = useState('');
  // const [selectedCarModel, setSelectedCarModel] = useState('');

  useEffect(() => {
    // Fetch brands, car models and car versions
    // fetchBrands();
    // fetchCarModels();
    // fetchCarVersions();

    console.log('Fetching brands, car models and car versions...');
  }, []);

  useEffect(() => {
    //update filtered car models when selected brand changes
    setFilteredCarModels(carModels.filter((model) => model.brand.id === parseInt(selectedBrand)));
  }, [selectedBrand]);

  useEffect(() => {
    // Fetch brands
  }, []);

  // const handleBrandChange = (e) => {
  //   const brandId = e.target.value;
  //   setSelectedBrand(brandId);
  //   setSelectedCarModel('')
  //   setFilteredCarModels(carModels.filter((model) => model.brand.id === parseInt(brandId)));
  // };

  // const handleModelChange = (e) => {
  //   const model = e.target.value;
  //   setSelectedCarModel(model);
  // };

  // const handleChange = (e) => {
  //   setCarVersionName(e.target.value);
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        // const response = await axios.post('http://localhost:8080/api/cars/car-versions', null, {
        //     params: {
        //         versionName: carVersionName,
        //         carModelId: selectedCarModel
        //     },
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     withCredentials: false
        // });
        // alert('Car version created successfully');
        reset();
        const fetchResponse = await axios.get('http://localhost:8080/api/cars/car-versions');
        setCarVersions(fetchResponse.data);
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
            name="brandId"
            id="brandId"
            value={selectedBrand}
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
          selectedBrand && 
          <div className="mb-3">
            <label htmlFor="carModelId" className="form-label">Modelo</label>
            <select
              name="carModelId"
              id="carModelId"
              value={selectedCarModel}
              onChange={handleInputChange}
              className="form-select"
            >
              <option value="">Seleccione un Modelo</option>
              {filteredCarModels.map((model) => (
                <option key={model.id} value={model.id}>{model.name}</option>
              ))}
            </select>
          </div>
        }
        {
          selectedCarModel &&
          <>
            <div className="mb-3">
              <label htmlFor="versionName" className="form-label">Nombre de la Versión</label>
              <input
                type="text"
                name="versionName"
                id="versionName"
                placeholder="Nombre de la Versión"
                value={carVersionName}
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
