import React from 'react';
import useInventory from '../hooks/useInventory';

const InventoryTable = () => {
  const {
    brands,
    models,
    versions,
    inventory,
    selectedBrand,
    selectedModel,
    selectedVersion,
    setSelectedBrand,
    setSelectedModel,
    setSelectedVersion,
    updateInventory
  } = useInventory();

  return (
    <div className="container mt-5">
      <div className="form-group">
        <label htmlFor="brandSelect">Marca:</label>
        <select
          id="brandSelect"
          className="form-control"
          onChange={e => setSelectedBrand(e.target.value)}
          value={selectedBrand || ''}
        >
          <option value="">Seleccione una marca</option>
          {brands.map(brand => (
            <option key={brand.id} value={brand.id}>{brand.name}</option>
          ))}
        </select>
      </div>
      <div className="form-group mt-3">
        <label htmlFor="modelSelect">Modelo:</label>
        <select
          id="modelSelect"
          className="form-control"
          onChange={e => setSelectedModel(e.target.value)}
          value={selectedModel || ''}
          disabled={!selectedBrand}
        >
          <option value="">Seleccione un modelo</option>
          {models.map(model => (
            <option key={model.id} value={model.id}>{model.name}</option>
          ))}
        </select>
      </div>
      <div className="form-group mt-3">
        <label htmlFor="versionSelect">Versión:</label>
        <select
          id="versionSelect"
          className="form-control"
          onChange={e => setSelectedVersion(e.target.value)}
          value={selectedVersion || ''}
          disabled={!selectedModel}
        >
          <option value="">Seleccione una versión</option>
          {versions.map(version => (
            <option key={version.id} value={version.id}>{version.versionName}</option>
          ))}
        </select>
      </div>
      <div className="mt-5">
        {inventory !== null && (
          <div>
            <h2>Inventario Disponible</h2>
            <h3>{inventory}</h3>
            <div className="mt-3">
              <button className="btn btn-success" onClick={() => updateInventory('add')}>Agregar</button>
              <button className="btn btn-danger ms-2" onClick={() => updateInventory('subtract')}>Restar</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InventoryTable;
