import React from 'react';
import './HomeAbout.css';

function HomeAbout () {
    return (
        <div className="home-about">
            <div className="about-content">
                <img  src="img/logo_square.svg" alt="Tentang Edudu" className="about-logo" />
                <div className="about-text">
                    <h2 className="about-text-subtitle">KENALI KAMI</h2>
                    <h2 className="about-text-title">PLATFORM DIGITAL EDUDU</h2>
                    <p>
                        EDUDU adalah luaran dari program Merdeka Belajar Kampus Merdeka - MSIB Studi Independen Bersertifikat 
                        Batch 7 di Dicoding. Platform digital EDUDU dikembangkan dengan mengusung tema 
                        <strong> "Transformasi Teknologi dalam Pengembangan Kualitas Hidup"</strong>.
                    </p>
                    <p>
                        EDUDU bertujuan memfasilitasi pelajar di daerah terpencil untuk mendapatkan materi pembelajaran berkualitas dalam menyongsong Indonesia Emas 2045. Selain itu, platform digital ini juga memberikan pengalaman belajar yang sesuai dengan perkembangan zaman dan mendukung tranformasi digital di bidang pendidikan.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default HomeAbout;
