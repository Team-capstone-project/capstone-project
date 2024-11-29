import React, { useEffect } from 'react';
import './Navbar.css';

function Navbar() {
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

  return (
    <header id="my-header">
      <div className="logo">
        <img src="/img/logo512.png" alt="Edudu" />
        Edudu
      </div>
      <nav className="nav-menu">
        <ul>
          <li><a href="/">Beranda</a></li>
          <li><a href="/tentang-kami">Tentang Kami</a></li>
          <li><a href="/hubungi-kami">Hubungi Kami</a></li>
        </ul>
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
