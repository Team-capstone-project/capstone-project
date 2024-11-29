import React from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import './AboutPage.css';
import HomeAbout from '../../components/HomeAbout/HomeAbout';

function AboutPage() {
    return (
      <HelmetProvider>
        <div className="pages-container">
          <Helmet>
            <title>Tentang Kami - Edudu</title>
            <meta name="description" content="" />
          </Helmet>
          <div className="aboutpage-container">
            <nav className="breadcrumbs">
              <a href="/">Beranda</a> &gt; <span>Tentang Kami</span>
            </nav>
            <HomeAbout />
            <h2 className="section-title">Tim Capstone</h2>
          </div>
        </div>
      </HelmetProvider>
    );
  }
  
  export default AboutPage;