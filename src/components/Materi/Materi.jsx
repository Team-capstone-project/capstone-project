import React from 'react';
import './Materi.css';

const materiData = [
    {
      name: 'Fisika',
      image: 'img/fisika.png',
      description: 'Mempelajari konsep dasar tentang materi, energi, dan interaksinya dalam alam semesta.'
    },
    {
      name: 'Biologi',
      image: 'img/biologi.png',
      description: 'Mempelajari kehidupan dan organisme, termasuk struktur, fungsi, pertumbuhan, dan evolusi.'
    },
    {
      name: 'Kimia',
      image: 'img/kimia.png',
      description: 'Ilmu yang mempelajari komposisi, struktur, sifat, dan reaksi materi, serta perubahan yang terjadi.'
    },
    {
      name: 'Matematika',
      image: 'img/matematika.png',
      description: 'Mempelajari konsep dan teori tentang angka, bentuk, struktur, ruang, dan perubahan.'
    },
    {
      name: 'Ekonomi',
      image: 'img/ekonomi.png',
      description: 'Ilmu yang mempelajari produksi, distribusi, dan konsumsi barang dan jasa serta keputusan ekonomi.'
    },
    {
      name: 'Sosiologi',
      image: 'img/sosiologi.png',
      description: 'Ilmu yang mempelajari masyarakat, perilaku sosial, struktur sosial, dan interaksi antar individu dan kelompok.'
    },
    {
      name: 'Geografi',
      image: 'img/geografi.png',
      description: 'Ilmu yang mempelajari permukaan bumi, bentuk-bentuk alam, serta hubungan antara manusia dan lingkungan.'
    },
    {
      name: 'Sejarah',
      image: 'img/sejarah.png',
      description: 'Ilmu yang mempelajari peristiwa masa lalu, perkembangan peradaban, dan dampaknya pada masa kini.'
    },
    {
      name: 'PJOK',
      image: 'img/pjok.png',
      description: 'Mata pelajaran yang mempelajari tentang olahraga, kebugaran jasmani, serta pola hidup sehat.'
    }
  ];  

const Materi = () => {
  return (
    <div className="my-materi-container">
      <div className="my-materi">
        {materiData.map((materi, index) => (
          <div key={index} className="materi-item">
            <div className="materi-image-container">
              <img src={materi.image} alt={materi.name} className="materi-image" />
            </div>
            <div className="materi-text">
              <h3>{materi.name}</h3>
              <p>{materi.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Materi;
