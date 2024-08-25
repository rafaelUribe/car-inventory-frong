import React from 'react';
import '../styles/BackBtn.css'; 
import { useNavigate } from 'react-router-dom';

const BackButton = () => {
    const navigate = useNavigate();

  return (
    <button type="button" className="custom-btn " onClick={() => navigate(-1)}>
      Volver
    </button>
  );
};

export default BackButton;