import React, { useEffect } from 'react';
import './Navbar.css';
import { useNavigate } from 'react-router-dom';

function Navbar({ role, onLogout }) {
  const navigate = useNavigate();
  useEffect(() => {
    const hamburgerBtn = document.getElementById("hamburger-btn");
    const navMenu = document.querySelector(".nav-menu");
    const header = document.getElementById("my-header");

    const toggleMenu = () => {
      navMenu.classList.toggle("active");
      hamburgerBtn.classList.toggle("is-active");
    };

    const handleScroll = () => {
      const heroHeight = window.innerHeight;
      if (window.scrollY > heroHeight) {
        header.classList.add("nav-shadow");
      } else {
        header.classList.remove("nav-shadow");
      }
    };

    hamburgerBtn.addEventListener("click", toggleMenu);
    window.addEventListener("scroll", handleScroll);

    return () => {
      hamburgerBtn.removeEventListener("click", toggleMenu);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const renderMenu = () => {
    if (role === 'admin') {
      return (
        <ul>
          <li><a href="/admin">Dashboard</a></li>
          <li><a href="/admin/setting_student">Siswa</a></li>
          <li><a href="/admin/setting_content">Tambah Materi</a></li>
          <li><a href="/admin/setting_quiz">Tambah Kuis</a></li>
          <li><a href="/admin/setting_content/list">Daftar Materi </a></li>
          <li><a href="/admin/setting_quiz/list">Daftar Kuis</a></li>
          <li><a href="/" onClick={onLogout}>Keluar</a></li>
        </ul>
      );
    } else if (role === 'user') {
      return (
        <ul>
          <li><a href="/student">Dashboard</a></li>
          <li><a href="/student/content">Konten Materi</a></li>
          <li><a href="/student/quiz">Kuis</a></li>
          <li><a href="/" onClick={onLogout}>Keluar</a></li>
        </ul>
      );
    }
    return (
      <ul>
        <li><a href="/">Beranda</a></li>
        <li><a href="/tentang-kami">Tentang Kami</a></li>
        <li><a href="/hubungi-kami">Hubungi Kami</a></li>
      </ul>
    );
  };

  const getLogoDetails = () => {
    if (role === 'admin') {
      return { text: "Selamat datang admin", imgSrc: "/img/admin.png" };
    } else if (role === 'teacher') {
      return { text: "Selamat datang teacher", imgSrc: "/img/teacher.png" };
    } else if (role === 'student') {
      return { text: "Selamat datang student", imgSrc: "/img/student.png" };
    }
    return { text: "Edudu", imgSrc: "/img/logo.svg" };
  };

  const { text, imgSrc } = getLogoDetails();

  return (
    <header id="my-header">
      <div className="logo">
        <img src={imgSrc} alt="Logo" />
        {text}
      </div>
      <nav className="nav-menu">
        {renderMenu()}
      </nav>
      <button className="hamburger" id="hamburger-btn">
        <span></span>
        <span></span>
        <span></span>
      </button>
    </header>
  );
}

export default Navbar;