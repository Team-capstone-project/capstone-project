import React, { useState } from "react";
import { HelmetProvider, Helmet } from "react-helmet-async";
import "./LoginPage.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginPage = ({ onLogin }) => {
  const navigate = useNavigate();
  
  // Menangani form login
  function handleLogin(e) {
    e.preventDefault();
    let email = e.target.email.value;
    let password = e.target.password.value;
    let dataLogin = { email, password };
    authLogin(dataLogin);
  }

  async function authLogin(data) {
    try {
      // Mengirim data login ke API
      const result = await axios.post(
        "https://api-lms-green.vercel.app/api/user/login",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
  
      // Menampilkan response dari API
      console.log("Full API Response:", result.data);
  
      const { token, role } = result.data;
  
      if (!token) {
        throw new Error("Token tidak ditemukan");
      }
      
      // Menyimpan token dan role ke localStorage
      localStorage.setItem('authToken', token);
      localStorage.setItem('userRole', role);
      onLogin(role);
  
      // Navigasi berdasarkan role
      if (role === "admin") {
        navigate("/admin");
      } else if (role === "user") {
        navigate("/student");
      } else {
        alert("Role tidak valid");
      }
    } catch (error) {
      if (error.response) {
        alert(error.response.data.message || "Terjadi masalah saat login.");
      } else {
        console.error("Error without response:", error);
        alert("Terjadi masalah saat login. Silakan coba lagi.");
      }
    }
  }

  return (
    <HelmetProvider>
      <Helmet>
        <title>Masuk - LMS Edudu</title>
        <meta
          name="description"
          content="Masuk ke LMS Edudu untuk melanjutkan pembelajaran"
        />
      </Helmet>
      <div className="login-container">
        <div className="login-card">
          <div className="login-image">
            <img src="img/login.svg" alt="Masuk LMS Edudu" className="image" />
          </div>
          <div className="login-form">
            <h2 className="login-title">Masuk LMS Edudu</h2>
            <form onSubmit={handleLogin}>
              <div className="input-group">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" required />
              </div>
              <div className="input-group">
                <label htmlFor="password">Kata Sandi</label>
                <input type="password" id="password" required />
              </div>
              <button type="submit" className="login-btn">
                Masuk
              </button>
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
