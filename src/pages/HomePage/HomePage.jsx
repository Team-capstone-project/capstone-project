import React from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import './HomePage.css';
import HeroSection from '../../components/HeroSection/HeroSection';
import CardFeature from '../../components/CardFeature/CardFeature';
import SliderPost from '../../components/SliderPost/SliderPost';
import Faq from '../../components/Faq/Faq';
import Benefits from '../../components/Benefits/Benefits';
import Materi from '../../components/Materi/Materi';
import materipopuler from '../../assets/data/materipopuler.json';
import cardfeatureData from '../../assets/data/cardfeature.json';

function Home() {
  return (
    <HelmetProvider>
      <div className="pages-container">
        <Helmet>
          <title>Beranda - Edudu</title>
          <meta name="description" content="" />
        </Helmet>
        <HeroSection />
        <div className="home-container" id="home-container">
          <h2 className="section-title">Telusuri Edudu</h2>
          <div className="cardfeature-container">
            {cardfeatureData.map((card, index) => (
              <CardFeature key={index} title={card.title} description={card.description} status={card.status} link={card.link} imageUrl={card.imageUrl}/>
            ))}
          </div>
        </div>
          <Benefits />
        <div className="home-container">
          <h2 className="section-title">Daftar Materi</h2>
          <Materi />
        </div>
        <SliderPost posts={materipopuler} />
        <div className="home-container">
          <h2 className="section-title">Informasi Penting</h2>
          <Faq />
        </div>
      </div>
    </HelmetProvider>
  );
}

export default Home;
