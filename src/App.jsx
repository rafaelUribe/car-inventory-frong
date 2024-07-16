import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import BrandForm from './components/BrandForm';
import CarModelForm from './components/CarModelForm';
import CarVersionForm from './components/CarVersionForm';
import Home from './pages/Home';
import NavBar from './components/Navbar';

const App = () => {
  return (
    <Router>
     <NavBar />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add-brand" element={<BrandForm />} />
          <Route path="/add-car-model" element={<CarModelForm />} />
          <Route path="/add-car-version" element={<CarVersionForm />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
