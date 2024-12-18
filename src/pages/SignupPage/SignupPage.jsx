import React, { useState } from 'react';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import './SignupPage.css';

const SignupPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Signup submitted', formData);
  };

  return (
    <HelmetProvider>
      <Helmet>
        <title>Daftar - LMS Edudu</title>
        <meta name="description" content="Daftar ke LMS Edudu untuk pengalaman belajar yang lebih baik" />
      </Helmet>
      <div className="signup-container">
        <div className="signup-card">
          <div className="signup-image">
            <img src="img/signup.svg" alt="Daftar LMS Edudu" className="image" />
          </div>
          <div className="signup-form">
            <h2 className="signup-title">Daftar LMS Edudu</h2>
            <form onSubmit={handleSubmit}>
              <div className="input-group">
                <label htmlFor="name">Nama Depan</label>
                <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
              </div>
              <div className="input-group">
                <label htmlFor="name">Nama Belakang</label>
                <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
              </div>
              <div className="input-group">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
              </div>
              <div className="input-group">
                <label htmlFor="password">Kata Sandi</label>
                <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required />
              </div>
              <div className="input-group">
                <label htmlFor="confirmPassword">Konfirmasi Kata Sandi</label>
                <input type="password" id="confirmPassword" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
              </div>
              <button type="submit" className="signup-btn">Sign Up</button>
            </form>
            <p className="login-link">
              Sudah memiliki akun? <a href="/login">Masuk ke LMS</a>
            </p>
          </div>
        </div>
      </div>
    </HelmetProvider>
  );
};

export default SignupPage;