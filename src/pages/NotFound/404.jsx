import React from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import './404.css'

function NotFound() {
  return (
    <HelmetProvider>
    <div class="error-page">
      <Helmet>
        <title>Halaman Tidak Ditemukan - Edudu</title>
        <meta name="description" content="" />
      </Helmet>
      <h2>404</h2>
      <p class="error-message">Mohon maaf! Halaman yang Anda cari tidak ada</p>
      <a href="/" class="back-home">Kembali ke Beranda</a>
    </div>
    </HelmetProvider>
  );
}

export default NotFound;