import React from 'react';
import "../styles/Error404.css"

const Error404 = () => {
    return (
        <div className="error404">
            <div className="error404__content">
                <h1 className="error404__title">Oops! Página no encontrada</h1>
                <p className="error404__message">La página que estás buscando no existe.</p>
            </div>
        </div>
    );
}

export default Error404;
