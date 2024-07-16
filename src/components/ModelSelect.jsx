import React from 'react';

const ModelSelect = ({ carModels, selectedCarModel, onChange }) => {
  return (
    <div className="mb-3">
      <label htmlFor="modelSelect" className="form-label">Modelo</label>
      <select
        id="modelSelect"
        className="form-control"
        onChange={onChange}
        value={selectedCarModel || ''}
      >
        <option value="">Seleccione un modelo</option>
        {carModels.map(model => (
          <option key={model.id} value={model.id}>{model.name}</option>
        ))}
      </select>
    </div>
  );
};

export default ModelSelect;
