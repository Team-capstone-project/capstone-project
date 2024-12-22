import React, { useEffect } from "react";
import { HelmetProvider, Helmet } from "react-helmet-async";
import "./LoginPage.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginPage = ({ onLogin }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    const storedRole = localStorage.getItem("userRole");

    console.log("Stored token:", storedToken);
    console.log("Stored role:", storedRole);

    if (storedToken) {
      if (storedRole === "admin") {
        navigate("/admin");
      } else if (storedRole === "user") {
        navigate("/student");
      }
    }
  }, [navigate]);

  function handleLogin(e) {
    e.preventDefault();
    let email = e.target.email.value;
    let password = e.target.password.value;
    let dataLogin = { email, password };
    authLogin(dataLogin);
  }

  async function authLogin(data) {
    try {
      const result = await axios.post(
        "https://divine-purpose-production.up.railway.app/api/user/login",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      console.log("API Response:", result.data);

      const { token, role, username, user_image, email, profession } = result.data;

      if (!token || !role || !username || !user_image || !email || !profession) {
        throw new Error("Token, Role, User, User Image, Email atau Profession tidak ditemukan");
      }

      localStorage.setItem("authToken", token);
      localStorage.setItem("userRole", role);
      localStorage.setItem(
        "userData",
        JSON.stringify({
          username,
          user_image,
          role,
          profession,
          email,
        })
      );
      console.log("Token disimpan:", localStorage.getItem("authToken"));
      console.log("Role disimpan:", localStorage.getItem("userRole"));
      console.log("User disimpan:", localStorage.getItem("userData"));

      onLogin(role);

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
      <div className="pages-container">
        <div className="login-container">
          <div className="login-card">
            <div className="login-image">
              <img
                src="img/login.svg"
                alt="Masuk LMS Edudu"
                className="image"
              />
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
      </div>
    </HelmetProvider>
  );
};

export default LoginPage;
