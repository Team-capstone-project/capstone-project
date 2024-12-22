import React from 'react';
import './FlipCard.css';

const FlipCard = () => {
  const data = [
    {
      image: '/img/author_1.png',
      name: 'Celia Maureen Chandra',
      position: 'Project Manager',
      quote: 'Kamu tidak perlu menjadi luar biasa untuk memulai, tapi kamu harus memulai untuk menjadi luar biasa',
    },
    {
      image: '/img/author_2.png',
      name: 'Agusti Mahendra',
      position: 'Front-End Developer',
      quote: 'Kegagalan hanya terjadi bila kita menyerah',
    },
    {
      image: '/img/author_3.png',
      name: 'Fikih Aldiansyah',
      position: 'Back-End Developer',
      quote: 'Hidup itu seperti bersepeda. Jika ingin menjaga keseimbanganmu, kamu harus terus bergerak maju',
    },
    {
      image: '/img/author_4.png',
      name: 'Hizbullah',
      position: 'Quality Control',
      quote: 'Setiap orang menjadi guru, setiap rumah menjadi sekolah',
    }
  ];

  return (
    <div className="flip-card-container">
      {data.map((person, index) => (
        <div className="flip-card" key={index}>
          <div className="flip-card-inner">
            <div className="flip-card-front">
              <img src={person.image} alt="Avatar" className="flip-card-img" />
              <div className="flip-card-info">
                <h3>{person.name}</h3>
                <p>{person.position}</p>
              </div>
            </div>
            <div className="flip-card-back">
              <p className="quote">"{person.quote}"</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FlipCard;
