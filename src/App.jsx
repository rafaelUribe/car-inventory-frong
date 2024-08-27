import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import BrandForm from './components/BrandForm';
import CarModelForm from './components/CarModelForm';
import CarVersionForm from './components/CarVersionForm';
import Home from './pages/Home';
import BuscarElastic from './components/BuscarElastic';

const App = () => {
  return (
    <Router>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">Inventario de autos</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/add-brand">Marcas</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/add-car-model">Modelos</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/add-car-version">Versiones</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/buscar">Buscador</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add-brand" element={<BrandForm />} />
          <Route path="/add-car-model" element={<CarModelForm />} />
          <Route path="/add-car-version" element={<CarVersionForm />} />
          <Route path="/buscar" element={<BuscarElastic />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
