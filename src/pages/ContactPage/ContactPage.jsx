import React from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import './ContactPage.css'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faEnvelope, faPhoneAlt } from '@fortawesome/free-solid-svg-icons';

function ContactPage() {
  return (
    <HelmetProvider>
      <div className='pages-container'>
        <Helmet>
          <title>Hubungi Kami - Edudu</title> 
          <meta name="description" content="Hubungi kami untuk informasi lebih lanjut." />
        </Helmet>
        <div className='contact-container'>
          <nav className="breadcrumbs">
            <a href="/">Beranda</a> &gt; <span>Hubungi Kami</span>
          </nav>
          <div className="contact-info-flex">
            <div className="contact-info-item">
              <FontAwesomeIcon icon={faMapMarkerAlt} className="contact-icon" />
              <h3>Alamat</h3>
              <p>Jl. Raya No. 10, Jakarta</p>
            </div>
            <div className="contact-info-item">
              <FontAwesomeIcon icon={faEnvelope} className="contact-icon" />
              <h3>Email</h3>
              <p>info@edudu</p>
            </div>
            <div className="contact-info-item">
              <FontAwesomeIcon icon={faPhoneAlt} className="contact-icon" />
              <h3>Telepon</h3>
              <p>(021) 123456789</p>
            </div>
          </div>
          <h2 className="section-title">Hubungi Kami</h2>
          <div className="my-contact-form">
            <div className="form-content">
              <div className="form-image">
                <img src="/img/contact.svg" alt="Hubungi Kami" />
              </div>
              <div className="form-fields">
                <form>
                  <div className="form-group">
                    <label htmlFor="name">Nama Lengkap</label>
                    <input type="text" id="name" required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="message">Pesan</label>
                    <textarea id="message" required></textarea>
                  </div>
                  <button type="submit">Kirim</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </HelmetProvider>
  );
}

export default ContactPage;