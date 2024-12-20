import React from 'react';
import './HeroSection.css';

function HeroSection() {
  const scrollToHomeContainer = () => {
    const homeContainer = document.getElementById('home-container');
    if (homeContainer) {
      const offset = 60;
      const elementPosition = homeContainer.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section className="hero">
      <div className="hero-content">
        <h1>Selamat Datang di Edudu</h1>
        <p>Platform digital sebagai pendamping untuk membuat belajarmu menjadi semakin seru!</p>
        <div className="btn-hero-content">
          <button className="hero-button" onClick={scrollToHomeContainer}>
            Telusuri
          </button>
          <button className="hero-button" onClick={() => (window.location.href = '/login')}>
            Masuk ke LMS
          </button>
        </div>
      </div>
      <img src="img/hero.svg" alt="Edudu Illustration" className="hero-image" />
    </section>
  );
}

export default HeroSection;