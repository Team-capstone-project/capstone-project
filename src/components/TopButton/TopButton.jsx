import React, { useState, useEffect } from 'react';
import './TopButton.css';

function TopButton () {
  const [isVisible, setIsVisible] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const toggleVisibility = () => {
    if (window.scrollY > 10) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <button className={`top-button ${isVisible ? 'visible' : ''}`} onClick={scrollToTop} aria-label="Kembali ke atas">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 2L3 12h5v8h8v-8h5L12 2z" />
      </svg>
    </button>
  );
};

export default TopButton;