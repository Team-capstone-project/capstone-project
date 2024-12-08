import React, { useEffect, useState } from 'react';
import './HeroSection.css';

function HeroSection () {
  // Efek lingkaran naik turun
  const [circles, setCircles] = useState(
    Array.from({ length: 6 }, () => ({
      baseTop: Math.random() * 80, // posisi dasar acak (dari 0 - 80%)
      amplitude: Math.random() * 20 + 20, // amplitudo naik turun
      frequency: Math.random() * 0.0005 + 0.0002, // kecepatan naik turun
      phase: Math.random() * 6 * Math.PI, // fase acak
    }))
  );

  useEffect(() => {
    const animate = (time) => {
      setCircles((prevCircles) =>
        prevCircles.map((circle) => {
          const { baseTop, amplitude, frequency, phase } = circle;
          const top = baseTop + amplitude * Math.sin(frequency * time + phase);
          return { ...circle, top };
        })
      );
      requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, []);

  const scrollToHomeContainer = () => {
    const homeContainer = document.getElementById('home-container');
    if (homeContainer) {
        const offset = 60;
        const elementPosition = homeContainer.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }
};

  return (
    <section className="hero">
      {circles.map((circle, index) => (
        <div
          key={index}
          className={`circle circle${index + 1}`}
          style={{
            top: `${circle.top}%`,
            left: `${index * 15 + 10}%`,
          }}
        ></div>
      ))}
      <div className="hero-content">
        <h1>Selamat Datang di Edudu</h1>
        <p>Platform digital sebagai pendamping untuk membuat belajarmu menjadi semakin seru!</p>
        <div className="btn-hero-content">
          <button className="hero-button" onClick={scrollToHomeContainer}>Mulai Belajar</button>
          <button className="hero-button" onClick={() => window.location.href = '/login'}>Masuk ke LMS</button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
