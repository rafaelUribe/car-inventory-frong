import React from 'react';

const BrandSelect = ({ brands, selectedBrand, onChange }) => {
  return (
    <div className="mb-3">
      <label htmlFor="brandSelect" className="form-label">Marca</label>
      <select
        id="brandSelect"
        className="form-control"
        onChange={onChange}
        value={selectedBrand || ''}
      >
        <option value="">Seleccione una marca</option>
        {brands.map(brand => (
          <option key={brand.id} value={brand.id}>{brand.name}</option>
        ))}
      </select>
    </div>
  );
};

export default BrandSelect;
