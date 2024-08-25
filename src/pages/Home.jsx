import InventoryTable from "../components/InventoryTable";
import '../styles/Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <h1 className="title">Consultar Inventario de Autos</h1>
      <InventoryTable></InventoryTable>
    </div>
  );
};

export default Home;
