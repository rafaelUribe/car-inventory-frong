import React from 'react';
import { Link } from 'react-router-dom';
import { 
    HOME, 
    ADD_BAND,
    ADD_CAR_MODEL,
    ADD_CAR_VERSION
 } from "./constants";
import '../styles/NavBar.css';

const NavBar = () => {
    return (
        <div className="container-fluid">
            <nav className="custom-navbar">
                <Link className="navbar-brand" to="/">Inventario de autos</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link" to={HOME}>Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to={ADD_BAND}>Marcas</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to={ADD_CAR_MODEL}>Modelos</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to={ADD_CAR_VERSION}>Versiones</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    );
}

export default NavBar;
