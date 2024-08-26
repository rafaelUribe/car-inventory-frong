import { useState, useEffect } from 'react';
import Swal from 'sweetalert2'
import { useForm } from '../hooks/useForm';
import { 
  fetchBrands,
  createBrand,
  deleteBrand
} from '../utils/api';
import '../styles/BrandForm.css';
import BackButton from './BackBtn';


const BrandForm = () => {
  const [formValues, handleInputChange, reset ] = useForm({
    name: '',
  });
  console.log(formValues);
  
  const {name} = formValues;
  
  // TODO: Implementar el estado de las marcas
  const [brands, setBrands] = useState([]);

  const isFormValid = () => {
    if (name.trim().length === 0) {
      Swal.fire('Error', 'Name is required', 'error');
      return false;
    }else{
      return true;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (isFormValid()) {
        const newBrand = await createBrand(name);
        if (!newBrand) {
          Swal.fire('Error', 'Error creating brand', 'error');
          return;
        } 
        console.log(newBrand);
        Swal.fire('Success', 'Brand created successfully', 'success');
        fetchData();
        reset();
      }
    } catch (error) {
      console.error('Error al crear la marca:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await deleteBrand(id);
      console.log('Brand deleted:', response);
      fetchData();
    } catch (error) {
      console.error('Error deleting brand:', error);
    }
  }

  const fetchData = async () => {
    try {
      const fetchedBrands = await fetchBrands();
      setBrands(fetchedBrands);
      console.log('Brands fetched:', fetchedBrands);
    } catch (error) {
      console.error('Error fetching brands:', error);
    }
  };

  useEffect(() => {
    fetchData();
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
            value={name}
            onChange={handleInputChange}
            className="form-control"
          />
        </div>
        <button type="submit" className="btn btn-primary">Crear Marca</button>
        <BackButton />
      </form>
      <div>
        <h2>Lista de Marcas</h2>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {brands.map((b) => (
              <tr key={b.id}>
                <td>{b.id}</td>
                <td>{b.name}</td>
                <td>
                <button className='custom-btn' onClick={() => handleDelete(b.id)}>Delete</button>
              </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BrandForm;
