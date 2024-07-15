import { useState } from 'react';
import axios from 'axios';

const AddCar = () => {
  const [car, setCar] = useState({});

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post('/api/cars', car);
      alert('Car added successfully');
    } catch (error) {
      console.error('Error adding car:', error);
    }
  };

  return (
    <div>
      <h2>Add Car</h2>
      <form className="form" onSubmit={handleSubmit}>
        <input
          className="form__input"
          type="text"
          placeholder="Car Name"
          onChange={(e) => setCar({ ...car, name: e.target.value })}
        />
        <button className="form__button button" type="submit">Add</button>
      </form>
    </div>
  );
};

export default AddCar;
