// components/GoTopButton.jsx
import { useState, useEffect } from 'react';

export default function GoTopButton({ visible }) {
  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <button 
      className={`button-go ${visible ? 'show' : ''}`}
      onClick={handleClick}
      aria-label="Voltar ao topo"
    >
      ↑
    </button>
  );
}