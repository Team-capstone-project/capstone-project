import React from "react";
import { HelmetProvider, Helmet } from "react-helmet-async";
import axios from "axios";
import "./SignupPage.css";
import { useNavigate } from "react-router-dom";

const SignupPage = () => {
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    let firstname = e.target.firstname.value;
    let lastname = e.target.lastname.value;
    let profession = e.target.profession.value;
    let email = e.target.email.value;
    let password = e.target.password.value;
    let rePassword = e.target.rePassword.value;

    if (!firstname || !lastname || !email || !password || !rePassword || !profession) {
      return alert("Silahkan isi semua field dengan benar");
    }

    if (password !== rePassword) {
      return alert("PASSWORD TIDAK SAMA!");
    }

    const dataRegister = { firstname, lastname, profession, email, password };
    authRegister(dataRegister);
  };

  async function authRegister(data) {
    try {
      const result = await axios.post(
        "https://divine-purpose-production.up.railway.app/api/user/register",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      alert("Registrasi berhasil!");
      navigate("/login")
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      alert(
        error.response?.data?.message || "Registrasi gagal. Silahkan coba lagi."
      );
    }
  }
  

  return (
    <HelmetProvider>
      <Helmet>
        <title>Daftar - LMS Edudu</title>
        <meta
          name="description"
          content="Daftar ke LMS Edudu untuk pengalaman belajar yang lebih baik"
        />
      </Helmet>
      <div className="pages-container">
        <div className="signup-container">
          <div className="signup-card">
            <div className="signup-image">
              <img
                src="img/signup.svg"
                alt="Daftar LMS Edudu"
                className="image"
              />
            </div>
            <div className="signup-form">
              <h2 className="signup-title">Daftar LMS Edudu</h2>
              <form action="" onSubmit={handleRegister}>
                <div className="input-group">
                  <label htmlFor="firstname">Nama Depan</label>
                  <input type="text" id="firstname" name="firstname" required />
                </div>
                <div className="input-group">
                  <label htmlFor="lastname">Nama Belakang</label>
                  <input type="text" id="lastname" name="lastname" required />
                </div>
                <div className="input-group">
                  <label htmlFor="email">Email</label>
                  <input type="email" id="email" name="email" required />
                </div>
                <div className="input-group">
                  <label htmlFor="password">Kata Sandi</label>
                  <input type="password" id="password" name="password" required />
                </div>
                <div className="input-group">
                  <label htmlFor="confirmPassword">Konfirmasi Kata Sandi</label>
                  <input
                    type="password"
                    id="rePassword"
                    name="rePassword"
                    required
                  />
                </div>
                <div className="input-group">
                  <label htmlFor="profession">Profesi</label>
                  <input type="text" id="profession" name="profession" required />
                </div>
                <button type="submit" className="signup-btn">
                  Sign Up
                </button>
              </form>
              <p className="login-link">
                Sudah memiliki akun? <a href="/login">Masuk ke LMS</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </HelmetProvider>
  );
};

export default SignupPage;
