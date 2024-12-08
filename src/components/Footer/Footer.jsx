import React from 'react';
import './Footer.css';

function Footer() {
    return (
        <footer id="my-footer">
            <div className="footer-container">
                <div className="footer-logo">
                    <h2>Tentang Edudu</h2>
                    <p className="footer-info">Platform pembelajaran berbasis website untuk mendukung transformasi digital serta mempermudah akses materi berkualitas ke seluruh Indonesia</p>
                </div>
                <div className="footer-menu">
                    <h2>Menu</h2>
                    <div className="menu-links">
                        <a href="/">Beranda</a>
                        <a href="/tentang-kami">Tentang Kami</a>
                        <a href="/hubungi-kami">Hubungi Kami</a>
                        <a href="/login">LMS Edudu</a>
                    </div>
                </div>
                <div className="footer-socials">
                    <h2>Ikuti Kami</h2>
                    <div className="social-links">
                        <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer"><img src="/img/facebook.svg" alt="Facebook" />Facebook</a>
                        <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer"><img src="/img/twitter.svg" alt="Twitter" />Twitter</a>
                        <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer"><img src="/img/instagram.svg" alt="Instagram" />Instagram</a>
                    </div>
                </div>
            </div>
            <div className="footer-divider"></div>
            <div className="footer-bottom">
                <p>&copy; 2024 - Edudu | All Rights Reserved</p>
            </div>
        </footer>
    );
}

export default Footer;