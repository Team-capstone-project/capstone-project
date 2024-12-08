import React, { useState } from 'react';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import './LoginPage.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login submitted', { email, password });
  };

  return (
    <HelmetProvider>
      <Helmet>
        <title>Masuk - LMS Edudu</title>
        <meta name="description" content="Masuk ke LMS Edudu untuk melanjutkan pembelajaran" />
      </Helmet>
      <div className="login-container">
        <div className="login-card">
          <div className="login-image">
            <img src="img/login.svg" alt="Masuk LMS Edudu" className="image" />
          </div>
          <div className="login-form">
            <h2 className="login-title">Masuk LMS Edudu</h2>
            <form onSubmit={handleSubmit}>
              <div className="input-group">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
              <div className="input-group">
                <label htmlFor="password">Kata Sandi</label>
                <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
              </div>
              <button type="submit" className="login-btn">Masuk</button>
            </form>
            <p className="signup-link">
              Tidak memiliki akun? <a href="/signup">Daftar</a>
            </p>
          </div>
        </div>
      </div>
    </HelmetProvider>
  );
};

export default LoginPage;